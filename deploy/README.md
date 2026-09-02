# Deploying JWD Investment to shared hosting

Three deployments, one codebase:

| Target | Host | Command |
| --- | --- | --- |
| Japan | onamae.com | `CONTACT_EMAIL=… npm run build:onamae` |
| India | MilesWeb | `CONTACT_EMAIL=… npm run build:milesweb` |
| WordPress | groupjwd.com/investment-llc/ | `npm run build:wp` |

Each produces a folder that is the complete upload — `.htaccess` included.
Upload the **contents** of that folder to the host's web root (`public_html/`
on both onamae and MilesWeb).

```
CONTACT_EMAIL=someone@jwd.example npm run build:onamae
#   → build-onamae/   ready to upload
```

There is nothing to install on the server. No PHP, no database, no Node.

---

## What works without a backend, and what does not

onamae and MilesWeb serve files; they do not run this project's serverless
functions. Four features depend on a server, so the static builds are made with
`VITE_NO_BACKEND=1` and behave differently on purpose — degraded deliberately
rather than failing in front of a visitor.

| Feature | On Vercel | On onamae / MilesWeb |
| --- | --- | --- |
| Site, pages, photos, videos, navigation | works | **works, identically** |
| Consultation form | emails the enquiry | **opens the visitor's mail client**, fields pre-filled |
| Consent gate | records who consented | **gates and proceeds, but records nothing** |
| AED/JPY rate | today's rate | **fixed fallback (¥43.5)** |
| AI advisor | answers | **not shown at all** |

Two of these deserve a decision rather than a shrug:

**The consent record.** The 08.25 revision asked for this specifically — "it is
necessary to have a system that can identify who has given consent". On a
static host that does not happen. The reader still registers, reads the notice
and ticks the box, but nothing is stored anywhere. If the record matters
legally, the static build is not sufficient on its own.

**The AI advisor** is omitted rather than shown broken. It needs a server to
hold the API key; a chat button that errors on every message is worse than no
chat button.

Both come back the moment there is a backend — see the last section.

---

## Uploading

### onamae.com (お名前.com レンタルサーバー)

1. Control panel → **FTPアカウント** for the credentials, or use **ファイルマネージャー**.
2. Upload the contents of `build-onamae/` into `public_html/`.
3. Confirm `.htaccess` arrived. **FTP clients hide dotfiles by default** —
   in FileZilla: Server → Force showing hidden files.
4. Enable the free SSL certificate in the control panel, then uncomment the
   HTTPS block at the bottom of `.htaccess`.

### MilesWeb

1. cPanel → **File Manager** → `public_html`.
2. Upload the contents of `build-milesweb/`. For 33MB, zip it, upload the zip,
   and use cPanel's **Extract** — far faster and less error-prone than FTP.
3. In File Manager, **Settings → Show Hidden Files** to confirm `.htaccess`.
4. cPanel → **SSL/TLS Status** → AutoSSL, then uncomment the HTTPS block.

MilesWeb runs LiteSpeed, which reads `.htaccess` the same way Apache does.

---

## About that `.htaccess`

It is not boilerplate; two of its directives were wrong on the first attempt
and only surfaced under a real Apache:

- **Compression** is guarded by `<IfModule mod_filter.c>` *and*
  `mod_deflate.c`. `AddOutputFilterByType` comes from mod_filter, so guarding
  on mod_deflate alone lets it through on a host without filter — and every
  request 500s.
- It lists **both** `text/javascript` and `application/javascript`. Apache 2.4
  serves `.js` as the former; listing only the latter ships the bundle
  uncompressed at 467KB instead of 150KB, silently.

It also sets `AddDefaultCharset UTF-8`, which matters most on the Japanese
host: shared hosting there has historically defaulted to Shift_JIS or EUC-JP,
and under the wrong charset every kanji on the page becomes mojibake.

No rewrite rules are needed for routing. The site routes on the URL hash
(`#/consent`, `#/properties`), which never reaches the server.

---

## Checking a deployment

1. Open the domain. Photos, videos and the logo should all appear; anything
   missing usually means the folder went one level too deep.
2. View source → the `<html lang>` and Japanese text should render correctly.
   Mojibake means `.htaccess` did not upload.
3. DevTools → Network → reload → the main `.js` should show **Content-Encoding:
   gzip** and roughly 150KB, not 467KB.
4. Submit the consultation form: the mail client should open with the fields
   filled in.
5. Console should be free of 404s for `/api/…` — the static build makes no
   API calls at all.

---

## Turning the four features back on later

They need a server; that is the whole of it. The Vercel deployment already is
one and already holds the keys, so the shortest path is to point these builds
at it instead of disabling them:

```bash
VITE_BASE=/ VITE_API_BASE=https://jwd-insurance.vercel.app npm run build
```

and set `ALLOWED_ORIGINS` in the Vercel project to the two new domains, so the
browser is permitted to call across. That restores the consent record, the live
rate, the advisor, and server-side email — with the static hosts still serving
every byte of the actual site.
