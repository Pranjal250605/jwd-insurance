<?php
/* ─────────────────────────────────────────────────────────────────────────
   Consultation form → email
   ---------------------------------------------------------------------
   The 個別相談 form on this site posts here; this file emails the enquiry
   to the address below using the rental server's own mail, so nothing
   depends on the visitor having a mail app.

   The recipient lives only in this file. The browser never chooses where
   mail goes, so the form cannot be used to send mail to anyone else.

   To change who receives enquiries, edit the settings block and re-upload.
   To check the server can run this file, open  contact.php?check=1  in a
   browser — it reports the PHP version and sends nothing.
   ───────────────────────────────────────────────────────────────────────── */

$SETTINGS = [
  // who receives the enquiries (several: 'a@x.jp, b@y.jp')
  'to'        => 'shiraishi.t@gene-sis.jp',
  // the sender shown on the email — must be an address on this domain, so
  // the domain's SPF record (include:_spf.onamae.ne.jp) vouches for it
  'from'      => 'noreply@jwdinvestment.com',
  'from_name' => 'JWD Investment',
  // named in the subject and body, so enquiries from each site can be told apart
  'site'      => 'JWD Investment（jwdinvestment.com）',
];

/* ───────────────────────── nothing to edit below ───────────────────────── */

date_default_timezone_set('Asia/Tokyo');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply($code, $data) {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

function cut($s, $max) {
  return function_exists('mb_substr') ? mb_substr($s, 0, $max, 'UTF-8') : substr($s, 0, $max * 3);
}

function field($in, $key, $max) {
  $v = (isset($in[$key]) && is_string($in[$key])) ? trim($in[$key]) : '';
  return cut($v, $max);
}

// anything that ends up in a header or the subject must stay on one line
function one_line($s) {
  return trim(preg_replace('/[\r\n\t]+/', ' ', $s));
}

function encode_header($s) {
  return '=?UTF-8?B?' . base64_encode($s) . '?=';
}

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '';

if ($method === 'GET' && isset($_GET['check'])) {
  reply(200, ['ok' => true, 'php' => PHP_VERSION, 'mail' => function_exists('mail')]);
}
if ($method !== 'POST') {
  reply(405, ['ok' => false, 'error' => 'method']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$in = json_decode($raw, true);
if (!is_array($in)) $in = $_POST;

// Hidden field real visitors never see. Bots fill it; they get a quiet
// "ok" and no email, so they learn nothing.
if (field($in, 'website', 200) !== '') {
  reply(200, ['ok' => true]);
}

$name    = one_line(field($in, 'name', 100));
$email   = one_line(field($in, 'email', 200));
$assets  = one_line(field($in, 'assets', 60));
$message = field($in, 'message', 4000);
$lang    = field($in, 'lang', 5) === 'en' ? 'en' : 'ja';

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  reply(400, ['ok' => false, 'error' => 'invalid']);
}

// At most 5 enquiries per address per 10 minutes, so a script cannot use
// the form to flood the inbox.
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown';
$store = rtrim(sys_get_temp_dir(), '/') . '/jwd-contact-' . md5(__DIR__) . '.json';
$fh = @fopen($store, 'c+');
if ($fh && flock($fh, LOCK_EX)) {
  $log = json_decode(stream_get_contents($fh), true);
  if (!is_array($log)) $log = [];
  $now = time();
  foreach ($log as $k => $times) {
    $log[$k] = array_values(array_filter((array) $times, function ($t) use ($now) { return $t > $now - 600; }));
    if (!$log[$k]) unset($log[$k]);
  }
  $mine = isset($log[$ip]) ? $log[$ip] : [];
  if (count($mine) >= 5) {
    flock($fh, LOCK_UN); fclose($fh);
    reply(429, ['ok' => false, 'error' => 'rate']);
  }
  $mine[] = $now;
  $log[$ip] = $mine;
  ftruncate($fh, 0); rewind($fh);
  fwrite($fh, json_encode($log));
  flock($fh, LOCK_UN); fclose($fh);
}

$site = $SETTINGS['site'];
$lines = [
  "{$site} から個別相談のお申し込みがありました。",
  "A consultation request arrived from {$site}.",
  '',
  "お名前 / Name:            {$name}",
  "メール / Email:           {$email}",
];
if ($assets !== '') $lines[] = "資産規模 / Asset range:   {$assets}";
$lines[] = '表示言語 / Site language: ' . ($lang === 'en' ? 'English' : '日本語');
$lines[] = '受信日時 / Received:      ' . date('Y-m-d H:i') . ' (JST)';
$lines[] = '';
$lines[] = 'ご相談内容 / Message:';
$lines[] = $message !== '' ? $message : '（記載なし / none）';
$lines[] = '';
$lines[] = '――――――――――';
$lines[] = 'このメールに返信すると、お申し込みの方へ直接届きます。';
$lines[] = 'Reply to this email to answer the sender directly.';
$body = implode("\r\n", $lines);

$subject = encode_header("【個別相談のお申し込み】{$name} 様 — {$site}");
$headers = implode("\r\n", [
  'From: ' . encode_header($SETTINGS['from_name']) . ' <' . $SETTINGS['from'] . '>',
  'Reply-To: ' . $email,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: base64',
  'X-Mailer: JWD-contact',
]);
$encoded = chunk_split(base64_encode($body));

// -f sets the envelope sender, which is what SPF checks; some hosts refuse
// the extra parameter, so try without it before giving up.
$sent = @mail($SETTINGS['to'], $subject, $encoded, $headers, '-f' . $SETTINGS['from']);
if (!$sent) $sent = @mail($SETTINGS['to'], $subject, $encoded, $headers);

if (!$sent) reply(500, ['ok' => false, 'error' => 'send']);
reply(200, ['ok' => true]);
