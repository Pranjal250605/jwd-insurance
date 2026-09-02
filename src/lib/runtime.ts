/**
 * What this build can and cannot do at runtime.
 *
 * The site is deployed three ways: on Vercel, where it serves its own
 * serverless functions; and as a static upload to onamae.com (Japan) and
 * MilesWeb (India), which serve files but run none of our code.
 *
 * Rather than let four features fail one by one in front of a visitor, a
 * static build declares itself with VITE_NO_BACKEND=1 and degrades on
 * purpose: the consultation form hands off to the visitor's mail client, and
 * the AI advisor — which cannot work without a server holding the API key —
 * is not rendered at all. A chat button that errors on every message is worse
 * than no chat button.
 */

/** True when no serverless functions are reachable from this build. */
export const NO_BACKEND = import.meta.env.VITE_NO_BACKEND === '1';

/**
 * Where the consultation form sends enquiries when there is no backend.
 *
 * Read from site-config.js first — a plain text file sitting next to
 * index.html on the server, editable in cPanel without rebuilding anything.
 * That matters because the people deploying this may not have Node installed,
 * and an address baked into a bundle can only be changed by someone who does.
 * VITE_CONTACT_EMAIL remains as a build-time default behind it.
 */
declare global {
  interface Window {
    __JWD_CONFIG__?: { contactEmail?: string };
  }
}

export function contactEmail(): string {
  const fromFile = typeof window !== 'undefined' ? window.__JWD_CONFIG__?.contactEmail?.trim() : '';
  return fromFile || (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || '';
}
