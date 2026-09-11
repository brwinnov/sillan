# CONTEXT_MAP.md — Sillan (single source of truth)

Last updated: 2026-09-11

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
| UCD | **Provisional** | https://sillan.ie/ucd/ read 2026-09-11 | Explicitly dated 7–11 Sept 2026; more services from 14 Sept. Must be re-fetched. |
| DCU | **Placeholder** | none | No source found |
| Sat / Sun | **Placeholder** | none | Nothing published by Sillan |

## Run categories (colour + shape, never colour alone)

| Category | Data tag (`columns[i].tag`) | CSS class | Colour (Okabe–Ito) | Shape | Header tag |
|---|---|---|---|---|---|
| Every weekday Mon–Fri | `all` | `.chip.all` | Yellow `#F0E442` | rounded rectangle | `.tag-all` |
| Mon–Thu only | `mt` | `.chip.mt` | Sky blue `#56B4E9` | pill (radius 100px) | `.tag-mt` |
| Fri only | `fr` | `.chip.fr` | Reddish purple `#CC79A7` | dashed outline | `.tag-fr` |
| Placeholder / no data | `tbc` | `.chip.dash` | line grey | no fill | `.tag-tbc` |

Class names are semantic (renamed from the legacy `amber/teal/pink` on 2026-09-11, alongside
the JSON data-extraction refactor — see `PATTERNS.md` for the `TIMETABLES` data shape).

## Default timetable — reconciled Mon–Fri data
Full tables in `docs/timetable-mon-fri.md`. Summary:
- **To Dublin:** 8 runs. Six run every weekday; the 06:25 Shercock run and the 09:15 Navan-starting run are Mon–Thu only. The 05:30 Shercock run does not serve UCD on any day.
- **From Dublin:** 8 runs. Five run every weekday; 18:10 and 19:15 are Mon–Thu only; 19:00 is Fri only. Last UCD departure on Fridays is 17:30.

## UCD 2026/27 (as read 2026-09-11 — provisional)
- To UCD: 6 runs, all Mon–Fri. Shercock departures 05:45, 06:10, 06:25, 06:35, 06:45, 09:20. Cootehill starts only the 06:30 (→ Shercock 06:45) and 09:00 (→ Shercock 09:20) runs.
- Depart UCD: 15:40, 16:15, 16:50, 17:30, 18:10. Last Friday UCD departure 17:30.
- Page note verbatim: *"Further services will be added on Monday 14th September 2026."*

## Known discrepancies / open questions
1. Bank Holidays: owner wants "same as Sundays"; Sillan FAQ says reduced service on Bank Holiday **Sundays and Mondays**. Infographic currently follows the owner's wording.
2. bustimes.org (NTA GTFS) lists a 15:20 Shercock departure not on any Sillan poster. Unverified.
3. bustimes.org lists intermediate Dublin set-down stops (Blanchardstown, Phibsborough, Parnell Sq, etc.) that Sillan's own posters omit. Not shown in the infographic — decide whether to add.
4. Owner recalls a Sunday evening Kingscourt departure around 19:00, arriving Dublin ~20:30 — this is an unconfirmed personal recollection, not sourced from Sillan, so it's shown only as a caveat note in the Sat/Sun placeholder section, not as a real timetable entry. Needs verifying before promotion to real data.

## Sources — how each behaves under automation
| Source | web_fetch | curl (sandbox) | Claude-in-Chrome |
|---|---|---|---|
| sillan.ie HTML pages | ✅ | ✅ | ✅ |
| sillan.ie image files (.jpeg) | ❌ "Image content not supported" | ❌ captcha challenge page | ✅ |
| facebook.com/SillanCoaches | ❌ ROBOTS_DISALLOWED | untested | ✅ (only viable route) |
| bustimes.org | ✅ but `?date=` ignored (client-side JS) | ✅ same limitation | ✅ |
| NTA GTFS (transportforireland.ie) | untested | untested | — |

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
