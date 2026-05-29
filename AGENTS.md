# ucfzem — TmpDrop (file sharing service)

## About
- Project: TmpDrop — WeTransfer-like file sharing, auto-delete after 24h
- No-code frontend: Bubble.io
- Backend: Supabase (Storage + Database + Edge Functions)
- Automation: GitHub Actions (hourly cleanup + daily backup)

## Repo & Access
- GitHub: https://github.com/ucfzem/tmpdrop
- GitHub token must have `repo` scope; remove from URL after push

## Completed Work
- Supabase SQL migration (uploads table, storage bucket, RLS policies)
- Edge Function for expired file cleanup
- GitHub Actions: hourly cleanup + daily DB backup
- README with full setup guide

## Pending
- Bubble.io frontend setup (upload page + download page)
- Connect Bubble to Supabase via API Connector
- Deploy Edge Function to Supabase
- Design UI in Bubble

## Preferences
- User from phone; no-code preferred (Bubble)
- Interface mobile-friendly required
- Monetization via ads / freemium later
