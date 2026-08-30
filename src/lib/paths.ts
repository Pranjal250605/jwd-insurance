/**
 * Path helpers so the same source can be served from Vercel's root and from a
 * subdirectory on someone else's host (the WordPress site serves this build
 * from /investment-llc/, where a hardcoded "/main/burj-khalifa.jpg" 404s).
 *
 * Vite rewrites asset URLs it can see — imports, and paths inside CSS — but not
 * strings we build ourselves, which is most of the imagery here. Those go
 * through asset().
 */

/** BASE_URL is '/' by default and always ends in a slash. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

/**
 * Where the serverless functions live.
 *
 * Empty by default, so on Vercel the app calls its own /api/… as before. Set
 * VITE_API_BASE to the deployment's origin when the static build is hosted
 * somewhere that cannot run them (WordPress runs PHP, not these), and the
 * browser will call across to Vercel instead. The functions answer CORS for
 * the origins listed in their ALLOWED_ORIGINS env var.
 */
export function apiUrl(path: string): string {
  const base = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, '') ?? '';
  return `${base}${path}`;
}
