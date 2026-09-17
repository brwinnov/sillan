# CONTEXT_MAP.md — Sillan (single source of truth)

Last updated: 2026-09-17 (official Sat/Sun timetable)

## Operator
- **Sillan Tours Ltd** (trading as Sillan Coaches), Kingscourt Road, Shercock, Co. Cavan
- Tel +353 42 9669130 · info@sillan.ie · https://sillan.ie
- WhatsApp announcements group: +353 86 777 9296
- Facebook: facebook.com/SillanCoaches (not fetchable by automation)

## Owner's relationship to Sillan (context, not for the page itself)
The owner (Barry) was the original consultant who created Sillan's brand and website, then
stepped back from that concierge work for five years. He's now restarting freelance
design/hosting services and may re-approach Sillan professionally. This project is
deliberately kept **independent and unofficial** — it promotes Sillan's service but isn't
tied to or presented as Sillan's own output. This positioning is intentional (owner's
explicit call, 2026-09-11), not an oversight — keep the "unofficial" framing in the help
modal accurate if this project's status ever changes.

**Update 2026-09-15:** Sillan Tours Ltd is now aware this project exists — a reply linking/
mentioning it appeared on both the owner's personal Facebook and as a reply under one of
Sillan's own Facebook posts. The "undisclosed" part of the above is no longer accurate; the
"independent/unofficial" framing itself hasn't been revoked and stays as-is unless the owner
says otherwise. The owner also personally knows the operator of the Sillan business — not
acted on yet, but noted as a real option for anything that would otherwise need Sillan's
formal cooperation (e.g. Facebook Page admin access — see the deferred "Ask AI" feature note
in `TODO_AI.md`'s IDEA section).

## Route 179
Cootehill → Shercock → Kingscourt → Nobber → Wilkinstown → Navan → Garlow Cross → Ross Cross → Dunshaughlin → (M3) → Dublin → UCD, and return.

Return stops on the Default timetable: UCD → Nassau Street → Hilton Garden.
"M3" in a cell = bus uses the motorway and does not call at that stop.

Per-stop location data (for the "where is this stop" tap modal) lives in
`docs/stop-locations.md` — source of truth for what's known vs still needed.

## Header (as of 2026-09-16, settled after several iterations same day)
The header's `background-image` has two layers: a semi-transparent red gradient
(`rgba(194,46,46,0.82)` → `rgba(142,31,31,0.88)`) over the owner-supplied Sillan Coaches bus
photo (`src/IMAGES/hdr-background-01.jpg`). The photo is sized `auto 100%` (full height always
visible, no vertical cropping) and centred horizontally. Everything else — route number, route
text, days badge, help/theme toggle, view toggle, WhatsApp badge — sits on top of this as a
plain background, via ordinary stacking; nothing competes for box space with it.

This took a few iterations the same day to land on, worth knowing if touching it again:
1. (v30) Background wash, right-anchored, `cover`-sized — cropped top/bottom and the
   days-badge text overlapped it at the site's normal 960px desktop width.
2. (v34–35) Switched to `auto 100%` height (no cropping), tried right-anchored then a further
   downscale — still a percentage-tuning band-aid, overlap persisted.
3. (v36) Split into a real two-cell flex layout (text cell + separate opaque photo cell) —
   solved the text overlap structurally, but then the photo (now its own box positioned via
   flex, not a background) visually competed with the absolutely-positioned header buttons and
   WhatsApp badge, which sit at fixed offsets from the header's own edges independent of the
   flex cells.
4. (v37–38) Reverted to a background-image approach (not a separate box) so buttons/WhatsApp/
   text all sit above it via normal stacking again, kept the `auto 100%` no-crop sizing and the
   red gradient tint, landed on centred positioning. This is the current, working state.

`src/IMAGES/` is genuinely uppercase on disk; Cloudflare's asset serving is case-sensitive even
though Windows isn't, so the CSS `url()` reference must match exactly or it 404s (caught once
already, worth remembering). The "SILLAN COACHES"/"Travel in comfort" wordmark text was removed
from the header (the photo carries the branding now), and the route line reads
"Cootehill/Shercock ⇄ Dublin" (was "Cootehill / Kingscourt ⇄ Dublin").

## Timetable variants in `src/index.html`

| Tab | Status | Source | Notes |
|---|---|---|---|
| Default | **Complete** | Two Sillan posters (in `docs/source-data/`), effective 7 Sept 2026 | Mon–Thu + Friday reconciled into one Mon–Fri table with day-type tags |
| UCD | **Complete** | https://sillan.ie/ucd/, re-fetched 2026-09-15 (owner supplied an updated poster image) | Now includes the 7th "To UCD" run (09:15 Navan-starting, Mon–Thu only) and the previously-missing 13:00 "Depart UCD" run — the site's promised 14 Sept additions are live. |
| DCU | **Placeholder** | none | No source found |
| Sat / Sun | **Complete** | Sillan's own official Facebook poster, posted 2026-09-17 — see `docs/timetable-sat-sun.md` | Supersedes the earlier NTA-GTFS-provisional data entirely (different times, different Dublin return point). Sunday serves UCD; Saturday's Dublin-end routing isn't detailed. |

## Run categories and visual style (as of 2026-09-16)
The whole page now matches Sillan's own posters (owner supplied the actual poster images —
`docs/source-data/` — as the target look), replacing the earlier Okabe-Ito colour+shape chip
system entirely (that system, and a "Colour-blind" toggle that briefly existed alongside it,
were both tried on 2026-09-16 and then removed the same day — see Decisions log):
- **Board card:** each main table (`.section-head.board-head` + the `.board-wrap-attached` right
  after it) forms one seamless rounded card — a dark title strip (table name + day-range, e.g.
  "To Dublin" / "Monday – Friday service"), a solid red "DEPARTS FROM" + run-number header band,
  and a body of alternating white/light-grey rows (`tr:nth-child(even) .time-cell` gets
  `--panel-alt`). All four Default-tab tables use this (To Dublin, From Dublin, and both
  Saturday & Sunday tables, each tagged "Saturday & Sunday" instead of a day-range) — UCD and
  DCU still keep a plain heading, not yet converted.
- **Chips:** plain bold text (`var(--ink)`), no background box, no border — literally just the
  number, matching the posters exactly. `columns[i].tag` (`all`/`mt`/`fr`/`sat`/`sun`/`tbc`)
  still exists in the data and still drives the header's small "Mon–Fri"/"Sat"/etc. label —
  bold white text directly on the red band (no pill background, simplified 2026-09-16 — see
  Decisions log) — the *only* thing distinguishing categories now. `.chip.dash` (empty/no-service
  cells) shows a muted grey dash.
- **Colour is theme-independent** for the red header and dark title strip — same red/near-black
  regardless of the light/dark toggle, matching how the page's own top `<header>` already
  behaved. Row backgrounds and text still follow `--panel`/`--ink`/`--line` as normal, so they
  do adapt with dark mode.

## Default timetable — reconciled Mon–Fri data
Full tables in `docs/timetable-mon-fri.md`. Summary:
- **To Dublin:** 8 runs. Six run every weekday; the 06:25 Shercock run and the 09:15 Navan-starting run are Mon–Thu only. The 05:30 Shercock run does not serve UCD on any day.
- **From Dublin:** 8 runs. Five run every weekday; 18:10 and 19:15 are Mon–Thu only; 19:00 is Fri only. Last UCD departure on Fridays is 17:30.

## UCD 2026/27 (re-fetched 2026-09-15 — complete)
- To UCD: 7 runs. Six run Mon–Fri: Shercock departures 05:45, 06:10, 06:25, 06:35, 06:45, 09:20; Cootehill starts only the 06:30 (→ Shercock 06:45) and 09:00 (→ Shercock 09:20) runs. A 7th run, Mon–Thu only, starts from Navan at 09:15 (→ Garlow Cross 09:25 → Ross Cross 09:30 → Dunshaughlin 09:35) — the same run already shown as the Default tab's 8th "To Dublin" column, now confirmed to also serve UCD.
- Depart UCD: 13:00, 15:40, 16:15, 16:50, 17:30 (all Mon–Fri), 18:10 (Mon–Thu only). Last Friday UCD departure 17:30. **Correction:** the previous version of this table was missing the 13:00 run entirely (present in the Default tab's "From Dublin" data all along, just never carried over to the UCD-specific table) — caught when the owner supplied an updated sillan.ie/ucd poster image for comparison.
- The site's earlier note ("Further services will be added on Monday 14th September 2026") has now been fulfilled — this is treated as the current, complete schedule, not provisional.

## Sat/Sun timetable (official, since 2026-09-17 — see docs/timetable-sat-sun.md)
- **Source changed 2026-09-17**: Sillan posted an official Saturday & Sunday poster to
  Facebook, replacing the NTA-GTFS-provisional data used since 2026-09-11. Several figures
  differ materially, not just formatting — this is a real schedule difference, not a
  transcription correction. The old NTA data is kept in `docs/timetable-sat-sun.md`, clearly
  marked superseded, for reference (mainly useful for the Navan sub-stops / Dublin set-down
  detail the new poster doesn't itemise).
- One round trip each day. **To Dublin:** Cootehill through Dunshaughlin, Sat 09:00–10:30, Sun
  17:30–18:45 (all times ~35–50 min earlier than the old NTA-sourced Sunday data — a genuine
  change, not the same trip restated). **Sunday only** continues past Dunshaughlin into Dublin
  city — O'Connell Street → Nassau Street → St Stephen's Green → **UCD** (no times published)
  — so Sunday *does* serve UCD, contradicting the old data's "neither day serves UCD".
  Saturday's onward Dublin-end routing isn't detailed on the new poster at all.
- **From Dublin:** departure point changed entirely — **Nassau Street** (18.00 Sat / 20.30
  Sun) and **Hilton Garden, IFSC** (18.05 Sat / 20.35 Sun), not Cumberland Street N. Sillan's
  poster doesn't publish individual times for the remaining stops back to Cootehill — shown as
  a **"Set Down"** chip (dark grey, `.chip.set-down`) rather than a generic TBC, since we do
  know something concrete about them (drop-off only), just not the exact time.
- **Sunday's Dublin-end drop-off stops** (O'Connell Street, Nassau Street, St Stephen's Green,
  UCD) are shown as their own rows in the "To Dublin" table — Saturday shows a dash (doesn't
  serve them at all), Sunday shows "Set Down" (serves them, no published time).
- **Bank Holidays — resolved, and shown directly in both tables**: the poster states plainly
  "Bank holiday Sunday no service. Bank holiday Monday, Sunday timetable." Both Sat/Sun tables
  have two extra columns for this: **"Bank Holiday Sunday"** (every row "No Service") and
  **"Bank Holiday Monday"** (every row a straight copy of that row's Sunday value) — makes the
  rule visible at a glance rather than only in a footnote. Neither column shows a run-number
  above its header (`renderBoard()` special-cases `col.tag === 'banksun'`/`'bankmon'` to omit
  it — they're a status/reused-schedule column, not a numbered departure). This was the item
  open since project start (Sillan's FAQ said "reduced service" without specifics; the NTA feed
  had no Bank Holiday exceptions registered at all).
- The pre-2026-09-17 "unconfirmed recollection" note (Kingscourt ~19:00 → Dublin ~20:30) and
  its "close match to NTA data" resolution are both now moot — the official Sunday Kingscourt
  time is 18:00, about an hour earlier than either. See `docs/timetable-sat-sun.md` for the
  full history if this ever needs untangling again.

## Site visit stats (since 2026-09-16)
The site is no longer strictly assets-only — `wrangler.jsonc` now has a `main` Worker script
(`worker/index.js`), scoped so it only runs for `/api/*` (`assets.run_worker_first: ["/api/*"]`);
every other request is still served directly as a static file, untouched, same as before.

- **Data source:** Cloudflare's GraphQL Analytics API, `httpRequestsAdaptiveGroups` dataset —
  the only one that can filter by hostname (`clientRequestHTTPHost`). Filtered to
  `sillan.brwinnov.app` specifically, never the rest of the `brwinnov.app` zone.
- **Why not Web Analytics (RUM)?** Not needed — Cloudflare already logs this for any proxied
  zone, no separate beacon/script/dashboard setup required.
- **Auth:** a Cloudflare API token scoped to **Zone → Analytics → Read** for the whole
  `brwinnov.app` zone (Cloudflare has no subdomain-scoped token — the zone-wide permission is
  unavoidable, but the query itself only ever asks for and returns `sillan.brwinnov.app` data).
  Stored via `wrangler secret put CF_ANALYTICS_TOKEN` — never in any file, never in git. The
  Zone ID (`84028d2cf15122b1385abdb9f2a064f2`) is a plain `vars` entry in `wrangler.jsonc` since
  it's an identifier, not a credential.
- **Real constraints hit while building this** (worth knowing before touching it again):
  `httpRequestsAdaptiveGroups` only accepts a single day's span per query on this account's
  plan. The coarser `httpRequests1dGroups` dataset allows a wider date range but has **no
  hostname filter at all** (zone-wide only), so it can't be used here. Retention on this plan
  tops out at ~31 days back — checked directly against the account's own GraphQL `settings`
  node (`notOlderThan: 2678400` seconds = 31 days exactly), not guessed. Cloudflare's docs say
  paid plans get "broader historical intervals" for this but publish no exact numbers, and even
  paid tiers likely don't offer literal unlimited retention for a granular dataset like this —
  so upgrading the plan was considered and explicitly **not** taken; permanent storage (below)
  was chosen instead, and it's free regardless of plan.
- **Permanent storage — the actual fix for the 31-day ceiling:** a daily Cron Trigger
  (`worker/index.js`'s `scheduled()` handler, `15 1 * * *` UTC) fetches *yesterday's* total (a
  single-day query, well within the span limit) and writes it permanently into Workers KV
  (namespace `SILLAN_STATS`) — one key per date, the visit count stored as metadata so
  `/api/stats` can sum the whole history with a single `list()` call rather than one read per
  day. `/api/stats` only ever asks the live GraphQL API for **today** (still in progress, not
  in KV yet); everything before today comes from KV, so "all-time" keeps growing past the
  31-day window instead of losing history to it. KV's free-tier limits (1,000 writes/day,
  100,000 reads/day, 1GB storage) are wildly more than this needs (1 write/day, a handful of
  reads). A one-time backfill (11–15 Sept, the days before this feature existed but still
  within the live API's retention at the time) seeded KV via `wrangler kv key put`.
- **Considered and explicitly rejected: auto-committing a stats log to this git repo.** Would
  fit the project's existing docs-as-source-of-truth convention, but means an unattended
  process pushing to the public GitHub repo daily forever — a bigger authorization than
  anything else in this project, and ~365+ bot commits/year of noise. Landed on: KV is the
  real store; `docs/stats-log.md` is a **manual, on-request export** (ask, and it gets
  regenerated from KV and committed like any other doc change) — not automated.
- **UI:** a small bar-chart icon, fixed bottom-left of the viewport (`.stats-toggle`), opens a
  modal (`#statsOverlay`) showing today/last-7-days/all-time as three stat tiles. Numbers are
  fetched fresh each time the modal opens (not preloaded on page load), and cached both
  server-side and (via the same `Cache-Control` header) in the visitor's own browser for 10
  minutes, so a burst of visitors doesn't hammer the GraphQL API or KV on every single request.

## Service announcements
- Added 2026-09-15 as a collapsible dark strip (`<details class="announce">`) at the very top of `.sheet`, above `<header>` — dark pulsing-dot summary "Service announcements · tap to expand", expanding to reveal Facebook's official **Page Plugin** iframe for facebook.com/SillanCoaches (timeline tab), a fallback link, and the WhatsApp join button (+353 86 777 9296).
- **Why the Page Plugin:** it's what sillan.ie itself uses, needs no API key or Sillan consent, and is zero-maintenance — no scraper to keep working.
- **Limitation:** an iframe's contents can't be read from the host page (cross-origin), so a native "new post" badge/count is **not possible** with this approach — the dot only signals "there's an announcements area", not "there's something new in it".
- **Fetch options considered and rejected for now** (would be needed for a real new-post badge):
  - Facebook Graph API — needs Sillan's own consent/app registration; not available since Sillan isn't aware of this project.
  - rss.app — paid, and third-party RSS bridges for Facebook are fragile.
  - RSS-Bridge's Facebook bridge — unreliable in practice.
  - Playwright scraping — froze repeatedly in testing and breaches Facebook's ToS.
  - A WhatsApp Web bridge — risks getting the announcements number banned.
- The iframe's `src` is only set on first expand (`toggle` event listener), so the page makes zero Facebook requests until a visitor opens the bar.
- First recorded service notice (logged here for reference, not shown on the page): **15 Sept 2026** — roadworks notice, no pick-up between Russels/Kingscourt and The Cross Guns/Nobber on the 09:45 service. Sillan's usual pattern: post to WhatsApp first, then mirror to Facebook as an image the afternoon before.
- Reference POC: `docs/source-data/announcements-bar-poc.html` (owner-supplied; integrated into `src/index.html` with project CSS variables/fonts instead of its standalone tokens).

## Known discrepancies / open questions
1. ~~Bank Holidays~~ — **resolved 2026-09-17**: Sillan's official Sat/Sun poster states directly "Bank holiday Sunday no service. Bank holiday Monday, Sunday timetable." This supersedes both the FAQ's vaguer "reduced service" wording and the NTA feed's total silence on the matter. Added to the infographic's Sat/Sun notes. (History: FAQ verbatim wording re-confirmed 2026-09-15 as *"We have a reduced service on Bank Holiday Sundays and Mondays. These are listed on our timetable page"* — but `/bus-timetables/` had nothing listed, so the FAQ's own claim didn't hold up. The poster is the real answer.)
2. bustimes.org (NTA GTFS) lists a 15:20 Shercock departure not on any Sillan poster. Unverified.
3. bustimes.org lists intermediate Dublin set-down stops (Blanchardstown, Phibsborough, Parnell Sq, etc.) that Sillan's own posters omit. Not shown in the infographic — decide whether to add.
4. ~~Owner recalls a Sunday evening Kingscourt departure~~ — **resolved 2026-09-11**: superseded by real NTA GTFS data showing a near-identical Sunday Kingscourt 19:00 departure. See "Sat/Sun timetable" section above.

## Sources — how each behaves under automation
| Source | web_fetch | curl (sandbox) | Claude-in-Chrome |
|---|---|---|---|
| sillan.ie HTML pages | ✅ | ✅ | ✅ |
| sillan.ie image files (.jpeg) | ❌ "Image content not supported" | ❌ captcha challenge page | ✅ |
| facebook.com/SillanCoaches | ❌ ROBOTS_DISALLOWED | untested | ✅ (Claude-in-Chrome or Playwright via the local Docker MCP server both work; cookie-consent dialog needs dismissing first, and full post metadata like exact post date needs a logged-out "see more" click) |
| bustimes.org | ✅ but `?date=` ignored (client-side JS) | ✅ same limitation | ✅ |
| NTA GTFS (transportforireland.ie) | untested by Claude — owner extracted Sat/Sun data via their own `docs/source-data/extract-gtfs-179.py` script, 2026-09-11 | untested | — |
| TFI live-departures (journeyplanner-production.transportforireland.ie) | ✅ confirmed working by loading `?stopId=` URLs directly, 2026-09-11 | untested | — |

## Decisions log
- 2026-09-11 · Column headers labelled "Run N" rather than origin clock time — the latter duplicated the first stop's cell and confused the owner.
- 2026-09-11 · Single Mon–Fri table with day-type tags instead of two separate tables — most runs are identical across days.
- 2026-09-11 · Sat/Sun shown as TBC placeholder, not "no service" — owner's call; nothing official either way.
- 2026-09-11 · Okabe–Ito palette + shape cues for accessibility. **Superseded 2026-09-16** — replaced by the poster-matching plain-chip style; see the entry below.
- 2026-09-11 · Dark mode follows `prefers-color-scheme`, no persistence (no browser storage allowed). **Superseded 2026-09-16** — now always starts in light mode regardless of device setting (owner's call); still no persistence, the toggle still works, it just no longer auto-detects on load.
- 2026-09-16 · Moved "M3 = does not call at this stop" from the footer to directly under the To Dublin table, next to where M3 cells actually appear — the footer was a long way from the thing it was explaining.
- 2026-09-16 · Centred the "Stop" column header (was left-aligned) across all timetables, and removed the "8 departures a day · journey time roughly 2 hours from Cootehill" subtitle from the To Dublin section only (From Dublin keeps its own).
- 2026-09-16 · Legend section (colour-swatch key, initially made collapsible behind a "Legend" toggle earlier the same day) **removed entirely** — no longer needed once chips stopped carrying per-category colour/shape at all.
- 2026-09-16 · Reworked the whole page to match Sillan's own posters (owner supplied the actual poster images as the target): dark title strip + red header band + alternating light rows + plain-text chips (see "Run categories and visual style" above for the full breakdown). A "Colour-blind" toggle restoring the old Okabe-Ito colour+shape system was built, tested working, then **removed the same day** at the owner's request — the poster style is now the only style, not a default with an opt-in alternative. Updated the "colour is never the only signal" constraint in `CLAUDE.md` accordingly: every category is identifiable by its column header's text label alone, permanently.
- 2026-09-16 · Run headers show a plain number (`1`, `2`…) instead of `Run N` — shorter, same 1-indexed-from-column-position meaning as before (see `PATTERNS.md`).
- 2026-09-16 · Moved "Monday – Friday service" from its own standalone divider line above the To Dublin/From Dublin sections onto the same line as the "To Dublin" heading itself, same size, right-aligned — matches the poster's "TO DUBLIN / MONDAY TO THURSDAY ONLY" banner layout. Only applied to "To Dublin" (not "From Dublin", which wasn't part of what was shown) — flagged as a scope choice, not confirmed symmetric treatment.
- 2026-09-11 · Single-file HTML, no build step — keeps it trivially shareable and previewable.
- 2026-09-11 · Deployed to Cloudflare Workers (assets-only, `wrangler.jsonc` at repo root, `assets.directory: ./src`) with a Custom Domain binding, live at https://sillan.brwinnov.app on the owner's existing `brwinnov.app` zone. Repo is public on GitHub (`brwinnov/sillan`) but Cloudflare deploy is a separate step — pushing to GitHub does not auto-deploy; re-run `npx wrangler deploy` after edits to `src/index.html`.
- 2026-09-11 · First real-browser visual QA pass done (Playwright, against the live Cloudflare URL) — desktop (1280px) and mobile (390px) × light/dark × all three tabs. Screenshots saved to `docs/screenshots/`. Confirmed: Okabe–Ito palette + shape cues (rounded rect / pill / dashed outline) render as visually distinct in both themes; dark mode has good contrast throughout; UCD/DCU placeholder banners display correctly. Found: mobile tables scroll horizontally correctly (`.board-wrap`, `overflow-x:auto`) but have no visible scroll affordance — added to `TODO_AI.md` P2. Also found `favicon.ico` 404s (harmless, added to backlog).
- 2026-09-11 · Extracted all 6 timetables from hand-written `<table>` markup into an inline `TIMETABLES` JS data object rendered by `renderBoard()` (see `PATTERNS.md`). Folded the planned chip-class semantic rename (`amber/teal/pink` → `all/mt/fr`) into this same rewrite rather than doing it as a separate mechanical pass, since the render function generates class names directly from the column's `tag`. Also added the mobile scroll-fade affordance as part of `renderBoard()`, wired to re-check on tab switch (`refreshBoardScrollStates()`) since a hidden tab's tables report 0 width at initial render. Verified pixel-identical output against the pre-refactor screenshots via local `wrangler dev` before deploying to production.
- 2026-09-11 · Added a "?" help/info button to the header (next to the theme toggle) opening a modal that states the page is unofficial, not affiliated with Sillan Coaches, and tells users to confirm times on sillan.ie or by phone before travelling. Deliberately left generic/expandable — "more information will be added here over time" — since the owner plans to add more content later rather than finalising scope now.
- 2026-09-11 · Disabled (commented out, not deleted) the Sun–Sat `.week-strip` day-pill row below the legend — owner found it purpose-unclear and it was redundant with the "Monday – Friday service" heading immediately below it. It was never interactive (plain `<div>`s, no click handlers) despite reading like buttons. Re-enable by uncommenting in `src/index.html` if wanted back.
- 2026-09-11 · Explored monetizing via Google AdSense, deferred: owner doesn't yet have AdSense-for-content approval (only Google Ads "Promote" for YouTube). Decided to build only what's useful now — a "Privacy" footer link opening a modal stating the page currently sets no cookies/collects no data — rather than a full cookie-consent banner for cookies that don't exist yet (YAGNI). The real consent flow, ad slot, and the localStorage-vs-cookie persistence question (relevant now the file is live on Cloudflare, not just previewed in Claude.ai) are deferred until AdSense approval actually comes through. Owner wants this pattern portable across other GitHub projects too, not Sillan-specific. See TODO_AI.md IDEA section.
- 2026-09-11 · Added a per-stop "where is this stop" modal (tap the stop name → description + Google Maps link, plus a live-TFI-departures link where a TFI stop number is known). Data lives in `STOP_INFO` (see `PATTERNS.md`) and `docs/stop-locations.md`. The TFI live-departures URL pattern (`journeyplanner-production.transportforireland.ie/departures/liveDepartures?stopId=`) was verified by loading it directly (not from docs) — confirmed stop 137861 correctly shows Kingscourt's live buses.
- 2026-09-11 · Stop-location descriptions never show Plus Codes on the page — they're reference-only for building `mapsUrl` (owner correction; an earlier version displayed them). Description text is minimal (venue name + TFI stop # if known) rather than technical location metadata.
- 2026-09-11 · All 9 "To Dublin" / "To UCD" stops now have location data: Navan is confirmed as Navan Shopping Centre (TFI 189521; earlier uncertainty resolved); Garlow Cross has a Maps link and TFI stop 101821 (official Route 179 stop — no "nearby" hedge in its description); Ross Cross has TFI stop 101861 but no venue description yet. Shercock's TFI stop was corrected to 110111. Only UCD, Nassau Street, Hilton Garden (the "From Dublin" return stops) still need data — see `docs/stop-locations.md`.
- 2026-09-11 · Populated the Saturday/Sunday section with real (provisional) data from the NTA GTFS feed, replacing the single-row TBC placeholder with two real To-Dublin/From-Dublin tables — same layout pattern as the weekday section. Added two new run categories (`sat`/`sun`, orange/vermillion, double-border/dotted shapes) since these are single specific days, not day-ranges. Added a `note` field to the stop-row data model (e.g. "set down only", "pick up only", "R147") that displays without breaking the `STOP_INFO`/`data-stop` linkage. Full per-stop trip detail (Navan sub-stops, Dublin set-down stops) lives in `docs/timetable-sat-sun.md` and `docs/source-data/179-sat-sun-gtfs.json` — only stops shared with the weekday table are shown in the infographic itself.
- 2026-09-15 · Added a version number (`vNN`) to the footer, linking to a new `CHANGELOG.md` (rendered on GitHub). Since this is a single-file, no-build site, nothing stamps this automatically — bumping the footer number and adding a `CHANGELOG.md` entry is now a required manual step on every deploy that changes `src/index.html` (documented in `CLAUDE.md` and `PATTERNS.md`). Backfilled `CHANGELOG.md` v1–v21 from the existing git history so the log isn't starting from a gap.
- 2026-09-15 · Full data audit against the live sillan.ie site and Facebook, via Playwright (Docker-based MCP server). Findings:
  - **Bug found and fixed:** the Default tab's "To Dublin" table had columns 5↔6 and 7↔8 transposed relative to the real poster, for every single stop row — a leftover from the 2026-09-11 Mon-Thu+Friday reconciliation. Each value was still correctly present and correctly tagged (`all`/`mt`), so nothing looked obviously wrong, but two pairs of adjacent "Run" columns read in the wrong chronological order (e.g. Navan's Run 7/8 showed 10:10 then 9:15, backwards). Fixed by re-deriving the column order directly from a fresh screenshot of `sillan.ie/bus-timetables/`'s Mon–Thu poster, cross-checked stop-by-stop. `fromDublin` was checked against the same poster and found already correct — no changes needed there.
  - **sillan.ie/ucd/ itself is stale** — still shows the old "7–11 Sept, further services 14 Sept" poster, despite that promise having passed. The corrected data now on this page's UCD tab (added earlier today) came from a *newer* poster image circulating separately — confirmed genuine by finding the same image in Sillan's Facebook Photos, posted 2026-09-10 (~5 days before this check) with 37 likes. Site vs. Facebook can drift out of sync; Facebook is the more current source when they disagree.
  - Bank Holiday FAQ wording re-confirmed verbatim (see "Known discrepancies" item 1) — still an open question, nothing actionable.
  - Noted in passing: a public Facebook comment under the UCD poster post (from "Ruth Kennedy Friel") asks "Any possibility of bus schedule to DCU?" — a real demand signal for the DCU tab, not a data source. No reply from Sillan visible.
- 2026-09-15 · Re-fetched the UCD timetable (owner supplied an updated sillan.ie/ucd poster image) and moved its status from Provisional to Complete: added the promised 7th "To UCD" run (09:15 Navan-starting, Mon–Thu only — reuses the same data already in the Default tab's 8th column) and fixed a pre-existing gap where "Depart UCD" was missing its 13:00 run (it was already correctly present in the Default tab's "From Dublin" table, just never carried over). Removed the "shown for 7–11 Sept only" caveat banner and the UCD mention from the help modal's Provisional-sections list, since it's now current data like the Default tab.
- 2026-09-15 · Added a collapsible "Service announcements" bar at the top of the page using Facebook's Page Plugin (see "Service announcements" section above for the full reasoning and rejected alternatives). Styled it with `var(--board)`/`var(--board-amber)` rather than the reference POC's own standalone colour tokens, so the bar's shade genuinely tracks the light/dark toggle through the same variable the rest of the page already redefines under `body.dark` — no bespoke dark-mode override needed. Kept the POC's lazy-load pattern (iframe `src` set only on first `<details>` expand) unchanged.
- 2026-09-16 · Added the header background photo, removed the header wordmark text, and simplified the route line (see "Header" section above). Also removed the white pill background behind each run-header's day-range tag — plain bold white text directly on the red band instead — and retired the per-category tag text colours (`#6E5A00` etc.) since every tag now shares the same white-on-red treatment; only `.tag-tbc` keeps a distinguishing dashed underline. Caught and fixed a Cloudflare asset-path case-sensitivity gotcha along the way: the `src/IMAGES/` folder is genuinely uppercase on disk (Windows doesn't care, Cloudflare's asset server does) — the CSS `url()` had to match exactly.
- 2026-09-16 · Header photo changed from `background-size:cover` (which cropped its top/bottom to fill the fixed header height across the full width) to `background-size:auto 100%` (full image height always visible, no vertical cropping), anchored to the right via `background-position:right center`. Trade-off: the photo no longer spans the header's full width — at header height it's narrower than the header, so it now shows the whole photo (including its own baked-in "Sillan Coaches" logo text) at a smaller scale in a right-anchored band, with the gradient/plain red showing on the left where the image doesn't reach.
- 2026-09-16 · Extended the poster-style board card to "From Dublin" (removing its "8 departures a day, calling at UCD..." subtitle) and to both Saturday & Sunday tables (each of "To Dublin"/"From Dublin" there now gets its own card heading tagged "Saturday & Sunday" instead of a small plain-text label). The "weekend return trips start from Cumberland Street N, not UCD/Nassau Street/Hilton Garden" detail that used to be the Sat/Sun From-Dublin subtitle was moved into the notes block below the tables rather than dropped, since — unlike the generic subtitles removed from the Default tab — it's specific, non-obvious information. UCD and DCU tabs weren't touched; still plain headings.
- 2026-09-16 · **Header rebuilt as a two-cell flex layout** (`.header-row` → `.header-content` + `.header-photo`), replacing the background-image-behind-text approach — fixed the earlier text/photo overlap structurally, but introduced a new problem: the photo, now its own positioned box rather than a background, visually competed with the absolutely-positioned header buttons and WhatsApp badge. **Reverted the same day** back to a background-image approach (see next entry) — the two-cell idea traded one overlap problem for another rather than eliminating overlap entirely.
- 2026-09-16 · Reverted to a `background-image` header (two layers: semi-transparent red gradient over the bus photo, `auto 100%` height, centred) — see "Header" section above for the full iteration history. This is the settled state: buttons/WhatsApp/text all sit above the photo via normal stacking (nothing competes for box space with a background), the photo shows at full height with no cropping, and legibility holds because the white header text has enough weight/contrast against the tinted photo (confirmed visually at each step).
- 2026-09-16 · Added a site-visit stats dashboard (footer bar-chart icon → modal) — see "Site visit stats" section above for the full architecture, data source, and the real API constraints hit while building it (1-day query span limit, no-hostname-filter on the wider-range dataset, ~31-day retention). This is the project's first move away from strictly-static assets-only hosting — a single `/api/*`-scoped Worker route, everything else unchanged. Verified the endpoint returns real numbers and the rest of the site still serves normally, both via curl and Playwright.
- 2026-09-16 · Owner asked to stay on the free Cloudflare plan and instead store stats data permanently going forward, to sidestep the 31-day retention ceiling. Checked Cloudflare's own account settings directly (GraphQL `settings` node) rather than guessing at plan-tier numbers, then checked Free-tier limits for Workers KV and Cron Triggers before building anything (both comfortably sufficient at this volume — see "Site visit stats" section above). Explicitly considered and rejected auto-committing a stats log to this git repo (an unattended daily push is a much bigger authorization than anything else done in this project) in favour of KV as the real store, with `docs/stats-log.md` as a manual on-request export instead.
- 2026-09-16 · Fixed the Sat/Sun notes referencing a bare `docs/timetable-sat-sun.md` repo path as if a visitor could open it — this is a static site, `docs/` isn't served, and even if it were, a plain filesystem path isn't a link. Owner caught this by asking "why does this exist on the page, since visitors won't be able to see that file". Now a proper link to the file's GitHub-hosted view, same pattern already used for the footer's changelog link. Worth checking for elsewhere if more `docs/*.md` mentions get added to visitor-facing text in future — a JS *comment* referencing a doc path is fine (developers read those), a rendered `<div>`/`<p>` is not.
- 2026-09-17 · Replaced the provisional NTA-GTFS Sat/Sun data with Sillan's own official Facebook poster — see "Sat/Sun timetable" section above for the full breakdown of what changed (times, Dublin return point, Sunday now serving UCD, Bank Holiday rule resolved). Moved Sat/Sun status from Provisional to Complete; removed the rose "Provisional" warning banner from the page entirely. Kept the old NTA per-stop/set-down detail in `docs/timetable-sat-sun.md`, clearly marked superseded, rather than deleting it — it's still the only source for the Navan sub-stops and Dublin set-down stops the new poster doesn't itemise. Return-leg stops beyond the two published Dublin departure points are shown as literal `TBC` cells (not omitted, not guessed) since the bus is confirmed to call at them, just without a published time — reusing the existing `renderCell()` behaviour for a `'TBC'` string value, no code change needed.
- 2026-09-17 · Follow-up refinements to the Sat/Sun tables, same day: added Sunday-only Dublin-end drop-off rows (O'Connell Street, Nassau Street, St Stephen's Green, UCD) to "To Dublin"; replaced the "From Dublin" table's `TBC` cells with a new `'Set Down'` cell value (dark grey `.chip.set-down`, added to `renderCell()`) since it conveys more than a generic placeholder; added a third "Bank Holiday Sunday" column to both tables showing "No Service" on every row, so the Bank Holiday rule is visible in the table itself, not just a footnote — `renderBoard()` special-cases this column's tag (`banksun`) to omit the usual run-number header, and its label uses an embedded `<br>` to read "Bank Holiday" / "Sunday" on two lines (label strings are inserted via `innerHTML`, so this works without new rendering logic). Added a fourth "Bank Holiday Monday" column right after it, each row a straight copy of that row's Sunday cell value — matches the poster's "Bank holiday Monday, Sunday timetable" rule directly rather than requiring a reader to cross-reference two columns.
