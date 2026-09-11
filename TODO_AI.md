# TODO_AI.md — Sillan backlog

Priority: P1 = do next · P2 = soon · P3 = nice to have · IDEA = unscoped

## P1 — Must do
- [ ] Create GitHub repo `brwinnov/sillan`, push this scaffold as the initial commit.
- [ ] Re-fetch https://sillan.ie/ucd/ on/after **Mon 14 Sept 2026** and update the UCD tab (currently the 7–11 Sept provisional schedule). Use Claude-in-Chrome if the content moves into an image.
- [ ] Find a source for the DCU timetable and populate the DCU tab. Check sillan.ie nav, Facebook (via browser), and DCU's own commuting pages.
- [ ] Open `src/index.html` in a real desktop browser at ~1200px and at mobile width and screenshot both views (light + dark, all three tabs). Nothing has been visually verified yet — only tag-balance checked.

## P2 — Should do
- [ ] Rename legacy chip classes `amber/teal/pink` → semantic `all/mt/fr` across the file (~150 spans). Script it; update `CONTEXT_MAP.md` table afterwards.
- [ ] Extract timetable data into an inline JSON block and render the `<table class="board">` elements from it with a small render function. Keeps single-file constraint; makes future timetable edits data-only.
- [ ] Add a print stylesheet (A4 portrait, header condensed, one tab per page).
- [ ] Resolve the Bank Holiday wording against Sillan's FAQ (Sundays **and** Mondays reduced service). Get owner's decision.
- [ ] Decide whether to show intermediate Dublin set-down stops from the NTA GTFS data (Blanchardstown, Phibsborough, Parnell Sq…). Currently omitted to match Sillan's own posters.

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

## Done
- [x] 2026-09-11 · Reconcile Mon–Thu + Fri posters into one Mon–Fri dataset.
- [x] 2026-09-11 · Build single-file departure-board infographic.
- [x] 2026-09-11 · WhatsApp badge, view toggle (Default/UCD/DCU), theme toggle.
- [x] 2026-09-11 · Sun–Sat framing, Sat/Sun placeholder, Bank Holiday note.
- [x] 2026-09-11 · Okabe–Ito colour-blind-safe palette + shape cues; narrower columns.
- [x] 2026-09-11 · UCD tab populated from sillan.ie/ucd (provisional).
- [x] 2026-09-11 · Repo scaffold + handover docs.
