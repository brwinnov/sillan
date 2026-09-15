# TODO_AI.md — Sillan backlog

Priority: P1 = do next · P2 = soon · P3 = nice to have · IDEA = unscoped

## P1 — Must do
- [ ] Find a source for the DCU timetable and populate the DCU tab. Check sillan.ie nav, Facebook (via browser), and DCU's own commuting pages. (A rider publicly asked Sillan the same question on Facebook under the UCD poster post, 2026-09-15 — no reply visible yet, so still no source, but real demand exists.)

## P2 — Should do
- [ ] Gather remaining stop location data (description + Plus Code/Maps link + TFI stop # if known) for the return-journey stops: UCD, Nassau Street, Hilton Garden. See `docs/stop-locations.md`.
- [ ] Re-check the Sat/Sun NTA GTFS calendars after **10/11 October 2026** — the feed's service calendars for these specific trips only run to that date and may be extended, changed, or dropped.
- [ ] Try to get Sillan to confirm (or deny) the Sat/Sun NTA data directly — it's provisional until they do, regardless of how accurate it looks.
- [ ] Expand the "About this page" help modal content — currently a starting point (unofficial disclaimer + data-source note); owner plans to add more over time.
- [ ] Add a print stylesheet (A4 portrait, header condensed, one tab per page).
- [ ] Resolve the Bank Holiday wording against Sillan's FAQ (Sundays **and** Mondays reduced service). Get owner's decision.
- [ ] Decide whether to show intermediate Dublin set-down stops from the NTA GTFS data (Blanchardstown, Phibsborough, Parnell Sq…). Currently omitted to match Sillan's own posters.
- [ ] Add a real `favicon.ico` (or inline SVG favicon) — currently 404s in the console on every load (harmless but sloppy).

## P3 — Nice to have
- [ ] Host as a static page (GitHub Pages simplest; owner also has Vercel + Hetzner).
- [ ] Persist dark-mode choice — **only** if the owner confirms they never preview inside Claude.ai (browser storage fails there).
- [ ] PNG/PDF export button for sharing on WhatsApp.
- [ ] Consider showing the Dublin-end set-down stops (Blanchardstown, Connolly Hospital, etc.) and Navan sub-stops for Sat/Sun directly in the infographic, not just linked out to `docs/timetable-sat-sun.md` — same open question as item 3 in CONTEXT_MAP for the weekday table.
- [ ] Native announcement alert with new-post detection — **only if** Graph API access is obtained (needs Sillan's consent/app registration, which this project deliberately doesn't have). The current Facebook Page Plugin iframe can't be read from the host page, so there's no way to badge "new post" without it. See CONTEXT_MAP's "Service announcements" section for the other fetch options already tried and rejected.

## IDEA — Unscoped
- "Next departure from your stop" live widget using device clock.
- Per-stop filtered view (pick a stop → only your times).
- Service-announcement monitoring. `web_fetch` can't read Facebook. Options to evaluate: periodic Claude-in-Chrome check by owner; Playwright scraper on owner's Hetzner/Seedhost infra (note sillan.ie captcha); any RSS/newsletter alternative.
- Multi-operator: same template for other Cavan/Meath → Dublin commuter services.
- **Monetization (Google AdSense) — deferred pending account approval.** Owner does not yet have AdSense-for-content approval (only used Google Ads "Promote" on YouTube, a different product). Plan: owner applies separately at adsense.google.com using this and other GitHub-hosted projects as properties (owner wants ads across multiple repos, not just this one — so build the eventual consent/ad pattern to be portable, not Sillan-specific). Once approved: (1) decide cookie-consent persistence — the project's "no localStorage" rule exists for Claude.ai artifact preview, but the live Cloudflare-hosted site could use a first-party cookie instead; needs a real decision then, not speculatively now: (2) build an actual accept/reject consent banner gating the AdSense script; (3) add the ad slot at the bottom of the page; (4) expand the Privacy modal (`#privacyOverlay`) to describe what AdSense actually sets. Explicitly stays an *independent, unofficial* page that promotes Sillan's service — owner (the original Sillan brand/site consultant, now restarting freelance work) deliberately does not want this tied to or presented as official Sillan output.

## Done
- [x] 2026-09-15 · Added a footer version number (`vNN`) linking to a new `CHANGELOG.md`, backfilled with v1–v21 from git history. Bumping it is now a required manual step on every deploy (documented in `CLAUDE.md`/`PATTERNS.md`) since there's no build step to automate it.
- [x] 2026-09-15 · Full data audit against live sillan.ie and Facebook (Playwright). Found and fixed a real bug: the Default tab's "To Dublin" table had columns 5↔6 and 7↔8 out of chronological order (values/tags were all correct, just mis-ordered) — a leftover from the 2026-09-11 data-extraction refactor. Confirmed "From Dublin" table already correct. Confirmed sillan.ie/ucd/ itself is stale (still shows the old pre-14-Sept poster) but the newer UCD data already on this page is genuine, verified against a matching photo on Sillan's Facebook page. Re-confirmed the Bank Holiday FAQ wording (still unresolved, no change). See CONTEXT_MAP.md for full detail.
- [x] 2026-09-15 · Re-fetched the UCD timetable from an updated sillan.ie/ucd poster image (owner-supplied) — moved status from Provisional to Complete. Added the 7th "To UCD" run (09:15 Navan-starting, Mon–Thu only) and fixed a gap where "Depart UCD" was missing its 13:00 run.
- [x] 2026-09-15 · Added a collapsible "Service announcements" bar (dark strip, pulsing dot) at the top of the page, expanding to Facebook's official Page Plugin embed for facebook.com/SillanCoaches, a fallback link, and the WhatsApp join button. Iframe is lazy-loaded on first open only. See CONTEXT_MAP.md's "Service announcements" section for the reasoning and rejected fetch alternatives (Graph API, rss.app, RSS-Bridge, Playwright scraping, WhatsApp Web bridge).
- [x] 2026-09-11 · Populated Saturday/Sunday with real provisional data from the NTA GTFS feed — two real To-Dublin/From-Dublin tables replacing the single TBC placeholder row, plus new `sat`/`sun` run categories (orange/vermillion, double-border/dotted shapes). Source: `docs/timetable-sat-sun.md` + `docs/source-data/179-sat-sun-gtfs.json`. This also resolved the earlier "unconfirmed recollection" note — real data closely matches it.
- [x] 2026-09-11 · Added tap-to-open "where is this stop" modal (description, Google Maps link, live-TFI-departures link where known) for 6 stops so far (Cootehill, Shercock, Kingscourt, Nobber, Wilkinstown, Dunshaughlin). Data in `STOP_INFO` (`src/index.html`) and `docs/stop-locations.md`.
- [x] 2026-09-11 · Added a "Privacy" link in the footer opening a `#privacyOverlay` modal (reused the help modal's open/close JS via a shared `initModal()` helper). States plainly that the page sets no cookies/collects no data today, names Google Fonts as the only external resource, and says a cookie-consent control will appear if/when advertising is added.
- [x] 2026-09-11 · Disabled the week-strip day-pill row (owner request; see prior entry).
- [x] 2026-09-11 · Added "?" help/info modal to header (unofficial-page disclaimer, data-source note, room to expand).
- [x] 2026-09-11 · Added unconfirmed-recollection caveat note for a possible Sunday evening Kingscourt→Dublin run (not promoted to real data — see CONTEXT_MAP open questions).
- [x] 2026-09-11 · Extracted all 6 timetables into inline JS data (`TIMETABLES` object) rendered by a small `renderBoard()` function — no more hand-written `<table>` markup per view. File shrank 1107→922 lines despite adding the render engine.
- [x] 2026-09-11 · Renamed chip classes `amber/teal/pink` → semantic `all/mt/fr` (folded into the JSON-extraction rewrite rather than done as a separate pass, since the render function generates the class names directly).
- [x] 2026-09-11 · Added mobile scroll affordance: a fade + chevron on `.board-wrap`'s right edge that hides once scrolled to the end or when the table already fits (`no-overflow`/`at-end` classes, `refreshBoardScrollStates()` re-checks on tab switch since hidden tabs report 0 width). Verified in local `wrangler dev` before deploying.
- [x] 2026-09-11 · Deployed to Cloudflare Workers at https://sillan.brwinnov.app.
- [x] 2026-09-11 · Real-browser visual QA pass (desktop+mobile, light+dark, all tabs); screenshots in `docs/screenshots/`.
- [x] 2026-09-11 · Created public GitHub repo `brwinnov/sillan`, pushed initial commit.
- [x] 2026-09-11 · Reconcile Mon–Thu + Fri posters into one Mon–Fri dataset.
- [x] 2026-09-11 · Build single-file departure-board infographic.
- [x] 2026-09-11 · WhatsApp badge, view toggle (Default/UCD/DCU), theme toggle.
- [x] 2026-09-11 · Sun–Sat framing, Sat/Sun placeholder, Bank Holiday note.
- [x] 2026-09-11 · Okabe–Ito colour-blind-safe palette + shape cues; narrower columns.
- [x] 2026-09-11 · UCD tab populated from sillan.ie/ucd (provisional).
- [x] 2026-09-11 · Repo scaffold + handover docs.
