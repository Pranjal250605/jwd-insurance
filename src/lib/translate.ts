/**
 * Japanese-reading support for the external *investor* websites we link out to
 * (Equiti, AIX). Those are other companies' regulated financial sites, so we do
 * NOT fetch, copy, host, or rewrite their content. Instead we route Japanese
 * visitors through Google Translate's public page-translation proxy, which
 * renders the translated page entirely on Google's own domain
 * (e.g. www-equiti-com.translate.goog). It is user-initiated — exactly as if
 * the visitor had run Google Translate by hand — and Google's own banner lets
 * them switch back to the English original at any time.
 *
 * This is intentionally scoped to the partner investor hosts; ordinary outbound
 * links (property portals, etc.) are left untouched.
 */

/** Hosts treated as the "external Investor Website" the client asked about. */
const INVESTOR_HOSTS = ['equiti.com', 'aixinvestment.com'];

/** Shown to Japanese users near a translated link (disclaimer + honesty). */
export const JA_PROXY_NOTICE =
  'Google翻訳による自動翻訳の日本語版が新しいタブで開きます。正式な内容は英語の原文をご確認ください（投資助言ではありません）。';

export function isInvestorSite(rawUrl: string): boolean {
  try {
    const host = new URL(rawUrl).hostname.toLowerCase();
    return INVESTOR_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

/**
 * Convert an external URL into its Google Translate (en→ja) proxy URL.
 * Hostname encoding (Google's rule): '-' → '--', then '.' → '-', suffixed with
 * '.translate.goog'. Path, query and hash are preserved.
 */
export function toJaProxy(rawUrl: string): string {
  try {
    const u = new URL(rawUrl);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return rawUrl;
    const encodedHost = u.hostname.replace(/-/g, '--').replace(/\./g, '-');
    const params = new URLSearchParams(u.search);
    params.set('_x_tr_sl', 'en');
    params.set('_x_tr_tl', 'ja');
    params.set('_x_tr_hl', 'ja');
    const qs = params.toString();
    return `https://${encodedHost}.translate.goog${u.pathname}${qs ? `?${qs}` : ''}${u.hash}`;
  } catch {
    return rawUrl; // malformed URL → leave untouched rather than break the link
  }
}

/**
 * Resolve the href a visitor should follow. Japanese visitors get the
 * translated view of investor sites; everyone else (and all non-investor links)
 * get the original URL unchanged.
 */
export function jaOutbound(rawUrl: string, ja: boolean): string {
  return ja && isInvestorSite(rawUrl) ? toJaProxy(rawUrl) : rawUrl;
}
