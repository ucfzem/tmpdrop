# ucfzem — TmpDrop (file sharing service)

## About
- Project: TmpDrop — WeTransfer-like file sharing, auto-delete after 24h
- Frontend: Single-page HTML/JS app (GitHub Pages)
- Backend: Supabase (Storage + Database + REST API)
- Automation: GitHub Actions (hourly cleanup via REST API + daily backup)

## Repo & Access
- GitHub: https://github.com/ucfzem/tmpdrop
- Live: https://ucfzem.github.io/tmpdrop/
- GitHub token must have `repo` + `workflow` scopes; remove from URL after push

## Supabase
- URL: https://raopfvfwsuooynsqaeaz.supabase.co
- Anon key in frontend (safe for public RLS)
- Bucket: `tmp-files` (public)
- Table: `uploads`
- RLS: INSERT and SELECT allowed for anon users; DELETE restricted to service_role

## Completed Work
- [x] Supabase SQL migration (uploads table, storage bucket, RLS policies — fixed SELECT policy)
- [x] Edge Function for expired file cleanup (deployed but BOOT_ERROR — env vars not injected)
- [x] GitHub Actions: hourly cleanup via REST API (working), daily DB backup
- [x] Frontend: single-page HTML/JS — upload + download + progress bar + share link + copy button
- [x] SEO: meta tags, OG/Twitter cards, JSON-LD structured data, sitemap.xml, robots.txt, favicon
- [x] Social share buttons: WhatsApp, Telegram, X/Twitter, Facebook
- [x] Web Share API (native mobile share)

## Pending
- Get GA4 Measurement ID from https://analytics.google.com and replace `G-XXXXXXXXXX` in index.html
- Consider Netlify for better HTTPS and auto-deploy
- Monetization / ads later

## Preferences
- User from phone; responsive design with `clamp()` font sizes
- Dark theme (gold/black)
- French language
- No emojis in code unless user asks
