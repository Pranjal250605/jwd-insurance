# JWD Investment — static build for the WordPress host

This folder is the whole site, pre-built. It is plain HTML/CSS/JS/images: no
PHP, no database, no WordPress plugin. Upload it and it runs.

Built for **`https://groupjwd.com/investment-llc/`**.

---

## Uploading

Put the **contents of this folder** (not the folder itself) into
`investment-llc/` at the web root, so that:

```
public_html/investment-llc/index.html      ← this file must land here
public_html/investment-llc/assets/…
public_html/investment-llc/media/…
```

Visiting `https://groupjwd.com/investment-llc/` then serves the site. Any
FTP/SFTP client or cPanel's File Manager will do; there is nothing to install.

**If WordPress swallows the URL** (some setups route every path through
`index.php`), add this to `.htaccess` *inside* `investment-llc/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /investment-llc/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /investment-llc/index.html [L]
</IfModule>
```

---

## The path is baked in

Asset URLs are absolute — `/investment-llc/assets/…`. Moving this folder to a
different path breaks every image and script. To serve it somewhere else,
rebuild with the new path rather than moving files:

```bash
VITE_BASE=/some-other-path/ \
VITE_API_BASE=https://jwd-insurance.vercel.app \
npm run build:wp
```

For the domain root, use `VITE_BASE=/`.

---

## The forms need one setting on Vercel

Four things need a server, which WordPress hosting does not run for them: the
consultation form, the consent record, the AED/JPY rate, and the AI advisor.
This build calls the Vercel deployment for those instead
(`https://jwd-insurance.vercel.app/api/…`).

The browser will refuse those calls until Vercel is told to accept them from
this domain. **In the Vercel project → Settings → Environment Variables, add:**

| Name | Value |
| --- | --- |
| `ALLOWED_ORIGINS` | `https://groupjwd.com,https://www.groupjwd.com` |

Then **redeploy** — environment changes do not apply to existing deployments.

Until that is set: the page and all its content work normally, but the
consultation form shows its error message, consents are not recorded, the rate
shows its fallback, and the advisor does not answer.

Include every origin the site is reached on. `http://` and `https://`, and
`www.` and bare, count as different origins.

---

## Checking it worked

1. Open `https://groupjwd.com/investment-llc/` — photos, videos and the logo
   should all appear. Anything missing means the folder is at the wrong path.
2. Scroll to the bottom, submit the consultation form. 「ありがとうございます」
   means the Vercel connection is good; the red error line means
   `ALLOWED_ORIGINS` is not set, or not set to this exact origin.
3. The AED rate near the top of the hero should show today's number rather
   than the ¥43.5 fallback.
