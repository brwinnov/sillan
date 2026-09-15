# CONTEXT_MAP.md — Sillan (single source of truth)

Last updated: 2026-09-15 (UCD re-fetch)

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
tied to or presented as Sillan's own output, and Sillan hasn't been told about it. This
positioning is intentional (owner's explicit call, 2026-09-11), not an oversight — keep the
"unofficial" framing in the help modal accurate if this project's status ever changes.

## Route 179
Cootehill → Shercock → Kingscourt → Nobber → Wilkinstown → Navan → Garlow Cross → Ross Cross → Dunshaughlin → (M3) → Dublin → UCD, and return.

Return stops on the Default timetable: UCD → Nassau Street → Hilton Garden.
"M3" in a cell = bus uses the motorway and does not call at that stop.

Per-stop location data (for the "where is this stop" tap modal) lives in
`docs/stop-locations.md` — source of truth for what's known vs still needed.

## Timetable variants in `src/index.html`

| Tab | Status | Source | Notes |
|---|---|---|---|
| Default | **Complete** | Two Sillan posters (in `docs/source-data/`), effective 7 Sept 2026 | Mon–Thu + Friday reconciled into one Mon–Fri table with day-type tags |
| UCD | **Complete** | https://sillan.ie/ucd/, re-fetched 2026-09-15 (owner supplied an updated poster image) | Now includes the 7th "To UCD" run (09:15 Navan-starting, Mon–Thu only) and the previously-missing 13:00 "Depart UCD" run — the site's promised 14 Sept additions are live. |
| DCU | **Placeholder** | none | No source found |
| Sat / Sun | **Provisional** | NTA GTFS feed (Small Operators), published 10 Sept 2026 — see `docs/timetable-sat-sun.md` | Not published anywhere on sillan.ie; per-NTA-data only, not Sillan-confirmed. Neither day serves UCD. |

## Run categories (colour + shape, never colour alone)

| Category | Data tag (`columns[i].tag`) | CSS class | Colour (Okabe–Ito) | Shape | Header tag |
|---|---|---|---|---|---|
| Every weekday Mon–Fri | `all` | `.chip.all` | Yellow `#F0E442` | rounded rectangle | `.tag-all` |
| Mon–Thu only | `mt` | `.chip.mt` | Sky blue `#56B4E9` | pill (radius 100px) | `.tag-mt` |
| Fri only | `fr` | `.chip.fr` | Reddish purple `#CC79A7` | dashed outline | `.tag-fr` |
| Saturday only | `sat` | `.chip.sat` | Orange `#E69F00` | double border | `.tag-sat` |
| Sunday only | `sun` | `.chip.sun` | Vermillion `#D55E00` | dotted outline | `.tag-sun` |
| Placeholder / no data | `tbc` | `.chip.dash` | line grey | no fill | `.tag-tbc` |

Class names are semantic (renamed from the legacy `amber/teal/pink` on 2026-09-11, alongside
the JSON data-extraction refactor — see `PATTERNS.md` for the `TIMETABLES` data shape).

## Default timetable — reconciled Mon–Fri data
Full tables in `docs/timetable-mon-fri.md`. Summary:
- **To Dublin:** 8 runs. Six run every weekday; the 06:25 Shercock run and the 09:15 Navan-starting run are Mon–Thu only. The 05:30 Shercock run does not serve UCD on any day.
- **From Dublin:** 8 runs. Five run every weekday; 18:10 and 19:15 are Mon–Thu only; 19:00 is Fri only. Last UCD departure on Fridays is 17:30.

## UCD 2026/27 (re-fetched 2026-09-15 — complete)
- To UCD: 7 runs. Six run Mon–Fri: Shercock departures 05:45, 06:10, 06:25, 06:35, 06:45, 09:20; Cootehill starts only the 06:30 (→ Shercock 06:45) and 09:00 (→ Shercock 09:20) runs. A 7th run, Mon–Thu only, starts from Navan at 09:15 (→ Garlow Cross 09:25 → Ross Cross 09:30 → Dunshaughlin 09:35) — the same run already shown as the Default tab's 8th "To Dublin" column, now confirmed to also serve UCD.
- Depart UCD: 13:00, 15:40, 16:15, 16:50, 17:30 (all Mon–Fri), 18:10 (Mon–Thu only). Last Friday UCD departure 17:30. **Correction:** the previous version of this table was missing the 13:00 run entirely (present in the Default tab's "From Dublin" data all along, just never carried over to the UCD-specific table) — caught when the owner supplied an updated sillan.ie/ucd poster image for comparison.
- The site's earlier note ("Further services will be added on Monday 14th September 2026") has now been fulfilled — this is treated as the current, complete schedule, not provisional.

## Sat/Sun timetable (per NTA GTFS, provisional — see docs/timetable-sat-sun.md)
- One round trip each day. Saturday: 09:00 Cootehill → National Gallery (arr. 11:10); 18:00 Cumberland Street N → Cootehill (arr. 19:50). Sunday: 18:20 Cootehill → Parnell Square East (arr. 20:25); 20:30 Cumberland Street N → Cootehill (arr. 22:20). No Sunday morning service.
- Neither day serves UCD. Weekend Dublin-end stops (Blanchardstown, Connolly Hospital, Ashtown, Rosecourt, Phibsborough, Mater Hospital, then National Gallery/Parnell Sq East) are all set-down only outbound; return starts pick-up-only from Cumberland Street N, not UCD/Nassau Street/Hilton Garden.
- GTFS feed version `1CFFD1CF-FCF8-4BE8-8379-7269746D5553`, valid to 10 Sept 2027; calendars for these specific trips run to 10/11 Oct 2026 and may change after.
- **The earlier "unconfirmed recollection" (Kingscourt ~19:00 → Dublin ~20:30) is superseded** — the NTA data's Sunday To-Dublin trip has Kingscourt at 19:00 arriving Parnell Sq East 20:25, a close match. The recollection was likely accurate, but this doesn't make the NTA data any more *Sillan-confirmed* — the whole section is still provisional pending that.

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
1. Bank Holidays: owner wants "same as Sundays"; Sillan FAQ says reduced service on Bank Holiday **Sundays and Mondays**; the NTA feed has no Bank Holiday calendar exceptions registered for this route at all. Unresolved. Re-confirmed 2026-09-15 by reading the live FAQ page directly: verbatim wording is *"We have a reduced service on Bank Holiday Sundays and Mondays. These are listed on our timetable page."* — but the actual `/bus-timetables/` page (checked same day) has no Bank Holiday exceptions or notes anywhere on it, so the FAQ's own claim that they're "listed" doesn't hold up. Still nothing to add to the infographic.
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
- 2026-09-11 · Okabe–Ito palette + shape cues for accessibility.
- 2026-09-11 · Dark mode follows `prefers-color-scheme`, no persistence (no browser storage allowed).
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
- 2026-09-15 · Full data audit against the live sillan.ie site and Facebook, via Playwright (Docker-based MCP server). Findings:
  - **Bug found and fixed:** the Default tab's "To Dublin" table had columns 5↔6 and 7↔8 transposed relative to the real poster, for every single stop row — a leftover from the 2026-09-11 Mon-Thu+Friday reconciliation. Each value was still correctly present and correctly tagged (`all`/`mt`), so nothing looked obviously wrong, but two pairs of adjacent "Run" columns read in the wrong chronological order (e.g. Navan's Run 7/8 showed 10:10 then 9:15, backwards). Fixed by re-deriving the column order directly from a fresh screenshot of `sillan.ie/bus-timetables/`'s Mon–Thu poster, cross-checked stop-by-stop. `fromDublin` was checked against the same poster and found already correct — no changes needed there.
  - **sillan.ie/ucd/ itself is stale** — still shows the old "7–11 Sept, further services 14 Sept" poster, despite that promise having passed. The corrected data now on this page's UCD tab (added earlier today) came from a *newer* poster image circulating separately — confirmed genuine by finding the same image in Sillan's Facebook Photos, posted 2026-09-10 (~5 days before this check) with 37 likes. Site vs. Facebook can drift out of sync; Facebook is the more current source when they disagree.
  - Bank Holiday FAQ wording re-confirmed verbatim (see "Known discrepancies" item 1) — still an open question, nothing actionable.
  - Noted in passing: a public Facebook comment under the UCD poster post (from "Ruth Kennedy Friel") asks "Any possibility of bus schedule to DCU?" — a real demand signal for the DCU tab, not a data source. No reply from Sillan visible.
- 2026-09-15 · Re-fetched the UCD timetable (owner supplied an updated sillan.ie/ucd poster image) and moved its status from Provisional to Complete: added the promised 7th "To UCD" run (09:15 Navan-starting, Mon–Thu only — reuses the same data already in the Default tab's 8th column) and fixed a pre-existing gap where "Depart UCD" was missing its 13:00 run (it was already correctly present in the Default tab's "From Dublin" table, just never carried over). Removed the "shown for 7–11 Sept only" caveat banner and the UCD mention from the help modal's Provisional-sections list, since it's now current data like the Default tab.
- 2026-09-15 · Added a collapsible "Service announcements" bar at the top of the page using Facebook's Page Plugin (see "Service announcements" section above for the full reasoning and rejected alternatives). Styled it with `var(--board)`/`var(--board-amber)` rather than the reference POC's own standalone colour tokens, so the bar's shade genuinely tracks the light/dark toggle through the same variable the rest of the page already redefines under `body.dark` — no bespoke dark-mode override needed. Kept the POC's lazy-load pattern (iframe `src` set only on first `<details>` expand) unchanged.
