# Site visit stats — exported log

**This is a manual, on-request snapshot — not auto-updated.** The real, permanent record
lives in Cloudflare KV (namespace `SILLAN_STATS`), written to daily by `worker/index.js`'s
`scheduled()` handler. Ask for this file to be refreshed whenever you want an up-to-date
git-versioned copy; nothing writes here automatically (see `CONTEXT_MAP.md`'s "Site visit
stats" section for why — the trade-off between this and an autonomous daily commit was
discussed explicitly and this was the choice made, 2026-09-16).

Source: Cloudflare's GraphQL Analytics API (`httpRequestsAdaptiveGroups`, filtered to
`sillan.brwinnov.app` only), not the whole `brwinnov.app` zone.

## Daily visits

| Date | Visits |
|---|---|
| 2026-09-11 | 60 |
| 2026-09-12 | 25 |
| 2026-09-13 | 9 |
| 2026-09-14 | 4 |
| 2026-09-15 | 63 |
| 2026-09-16 | 55 *(partial day — exported before day end)* |

**Total so far: 216** (11–16 Sept 2026, partial)

Exported 2026-09-16, as part of building the stats feature — the first 5 rows came from a
one-time backfill (Cloudflare's live API still covered them at the time, being within its
~31-day retention window); everything from 2026-09-16 onward is written by the daily cron.
