# TODO_AI.md — Sillan backlog

Priority: P1 = do next · P2 = soon · P3 = nice to have · IDEA = unscoped

## P1 — Must do
- [ ] Re-fetch https://sillan.ie/ucd/ on/after **Mon 14 Sept 2026** and update the UCD tab (currently the 7–11 Sept provisional schedule). Use Claude-in-Chrome if the content moves into an image.
- [ ] Find a source for the DCU timetable and populate the DCU tab. Check sillan.ie nav, Facebook (via browser), and DCU's own commuting pages.

## P2 — Should do
- [ ] Gather remaining stop location data (description + Plus Code/Maps link + TFI stop # if known) for the return-journey stops: UCD, Nassau Street, Hilton Garden. See `docs/stop-locations.md`.
- [ ] Verify the recalled Sunday evening Kingscourt ~19:00 → Dublin ~20:30 run against a real Sillan source (site/Facebook/phone) before promoting it from the caveat note into a real timetable entry.
- [ ] Expand the "About this page" help modal content — currently a starting point (unofficial disclaimer + data-source note); owner plans to add more over time.
- [ ] Add a print stylesheet (A4 portrait, header condensed, one tab per page).
- [ ] Resolve the Bank Holiday wording against Sillan's FAQ (Sundays **and** Mondays reduced service). Get owner's decision.
- [ ] Decide whether to show intermediate Dublin set-down stops from the NTA GTFS data (Blanchardstown, Phibsborough, Parnell Sq…). Currently omitted to match Sillan's own posters.
- [ ] Add a real `favicon.ico` (or inline SVG favicon) — currently 404s in the console on every load (harmless but sloppy).

## P3 — Nice to have
- [ ] Host as a static page (GitHub Pages simplest; owner also has Vercel + Hetzner).
- [ ] Persist dark-mode choice — **only** if the owner confirms they never preview inside Claude.ai (browser storage fails there).
- [ ] PNG/PDF export button for sharing on WhatsApp.
- [ ] Sat/Sun: pull NTA GTFS feed to confirm whether any weekend service exists.

## IDEA — Unscoped
- "Next departure from your stop" live widget using device clock.
- Per-stop filtered view (pick a stop → only your times).
- Service-announcement monitoring. `web_fetch` can't read Facebook. Options to evaluate: periodic Claude-in-Chrome check by owner; Playwright scraper on owner's Hetzner/Seedhost infra (note sillan.ie captcha); any RSS/newsletter alternative.
- Multi-operator: same template for other Cavan/Meath → Dublin commuter services.
- **Monetization (Google AdSense) — deferred pending account approval.** Owner does not yet have AdSense-for-content approval (only used Google Ads "Promote" on YouTube, a different product). Plan: owner applies separately at adsense.google.com using this and other GitHub-hosted projects as properties (owner wants ads across multiple repos, not just this one — so build the eventual consent/ad pattern to be portable, not Sillan-specific). Once approved: (1) decide cookie-consent persistence — the project's "no localStorage" rule exists for Claude.ai artifact preview, but the live Cloudflare-hosted site could use a first-party cookie instead; needs a real decision then, not speculatively now: (2) build an actual accept/reject consent banner gating the AdSense script; (3) add the ad slot at the bottom of the page; (4) expand the Privacy modal (`#privacyOverlay`) to describe what AdSense actually sets. Explicitly stays an *independent, unofficial* page that promotes Sillan's service — owner (the original Sillan brand/site consultant, now restarting freelance work) deliberately does not want this tied to or presented as official Sillan output.

## Done
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
