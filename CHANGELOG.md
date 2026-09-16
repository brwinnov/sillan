# Changelog

Every deploy to the live site bumps the version number shown in the page footer.
Newest first. Full detail for any entry is in the linked commit.

## v36 — 2026-09-16
Rebuilt the header as a real two-cell flex layout instead of a background-image wash — text lives in `.header-content`, the photo lives in its own `.header-photo` box on the right, so they structurally can't overlap regardless of viewport width or text length. Photo now shows at full clarity (no red overlay needed since it no longer sits behind text) with rounded corners, `cover`-fit within its own box. Stacks to full-width-on-top on mobile. Supersedes the `cover`/`auto height`/downscaled-opacity background-image experiments in v30/v34/v35.

## v35 — 2026-09-16
Attempted fix for header text overlapping the background photo by downscaling the image further (`auto 74%` height). Superseded within the hour by v36's proper two-cell layout, which fixes it structurally instead of by percentage-tuning.

## v34 — 2026-09-16
Header background photo no longer crops top/bottom — sized to the header's full height instead of `cover`, so the whole image is visible (at a smaller scale, anchored to the right) rather than a wide horizontal slice of it.

## v33 — 2026-09-16
Extended the same poster-style card to both Saturday & Sunday tables — each of "To Dublin" and "From Dublin" under Saturday & Sunday now gets its own dark-strip heading tagged "Saturday & Sunday" (previously small plain text labels). Moved the "weekend return trips start from Cumberland Street N" detail into the notes block below the tables so it wasn't lost when its old subtitle line was removed.

## v32 — 2026-09-16
Extended the poster-style card (dark title strip + red header + alternating rows) to "From Dublin", matching "To Dublin". Removed its "8 departures a day, calling at UCD, Nassau Street, then Hilton Garden" subtitle in the process.

## v31 — 2026-09-16
Removed the white pill background behind each run-header's day-range tag ("MON-FRI"/"MON-THU"/etc.) — now bold white text directly on the red band, no box. Since every category already shared the same white-on-red text, the per-category tag colours were retired too (only the placeholder "TBC" tag keeps a distinguishing dashed underline).

## v30 — 2026-09-16
Added a header background photo (owner-supplied Sillan Coaches bus photo, `src/IMAGES/hdr-background-01.jpg`) behind the existing red gradient, gradient opacity reduced (82%/88%) so the photo shows through while keeping white header text legible. Changed the route line to "Cootehill/Shercock ⇄ Dublin" and removed the "SILLAN COACHES"/"Travel in comfort" wordmark text from the header (the photo now carries the branding).

## v29 — 2026-09-16
Removed the "Colour-blind" toggle added in v27/v28 entirely, per owner request — the poster style is now the only style, not a default-plus-opt-in-toggle.

## v28 — 2026-09-16
Matched the timetable card itself to Sillan's own posters: dark title strip merged onto the "To Dublin" heading line (with "Monday – Friday service" alongside it), red "DEPARTS FROM"/run-number header band, alternating white/light-grey row shading. Removed the Legend section entirely (no longer needed once chips lost their per-category colour/shape).

## v27 — 2026-09-16
Default light theme now matches Sillan's own posters — plain black/white chips, no per-category colour or shape. Added a "Colour-blind" slide toggle next to the theme switch (off by default) that restored the previous Okabe-Ito colour+shape coding on both the chips and the Legend's swatches. (Superseded in v29 — see above.)

## v26 — 2026-09-16
Legend is now collapsed by default behind a "Legend" toggle, matching the same `<details>`/`<summary>` pattern as the service-announcements bar — no new JS.

## v25 — 2026-09-16
Legend now wraps after the third item, so Saturday/Sunday drop to their own line. Removed the redundant horizontal rule directly under the legend (the "Monday – Friday service" divider's own top border, right below the legend's own bottom border). Run headers now show a plain number instead of "Run N".

## v24 — 2026-09-16
Centred the "Stop" column header across all timetables. Removed the "8 departures a day · journey time roughly 2 hours from Cootehill" subtitle from the To Dublin section (From Dublin's own subtitle is unaffected).

## v23 — 2026-09-16
Moved "M3 = does not call at this stop" from the footer to just under the To Dublin timetable, where the M3 cells actually appear. Site now always loads in light mode instead of following the device's light/dark setting.

## v22 — 2026-09-15
Add a version number + this changelog, linked from the footer.

## v21 — 2026-09-15
[Fix column order bug in Default tab's To Dublin table](https://github.com/brwinnov/sillan/commit/5289cb8) — a data audit against the live site and Facebook found columns 5/6 and 7/8 were out of chronological order for every stop (values were correct, just mis-ordered). Fixed and verified against the real poster.

## v20 — 2026-09-15
[Update UCD timetable from owner-supplied refreshed poster image](https://github.com/brwinnov/sillan/commit/867fd88) — added the 7th "To UCD" run (09:15 Navan-starting, Mon–Thu only) and fixed a gap where "Depart UCD" was missing its 13:00 run. UCD tab moved from Provisional to Complete.

## v19 — 2026-09-15
[Add service announcements bar](https://github.com/brwinnov/sillan/commit/76aa1c5) — collapsible strip at the top of the page with Facebook's official Page Plugin (lazy-loaded on first open), a fallback link, and the WhatsApp join button.

## v18 — 2026-09-11
[Remove blank UCD row from Sat/Sun tables](https://github.com/brwinnov/sillan/commit/84a5e30) — neither weekend trip serves UCD, so the row was always a dash in both columns.

## v17 — 2026-09-11
[Add real Saturday/Sunday timetable from NTA GTFS data](https://github.com/brwinnov/sillan/commit/162b14d) — replaced the single TBC placeholder row with real (provisional) data, plus new Sat/Sun run categories (orange/vermillion, double-border/dotted shapes).

## v16 — 2026-09-11
[Add extra route-detail TFI stops to Navan's modal](https://github.com/brwinnov/sillan/commit/9f38392) — grouped "To Dublin"/"From Dublin" sub-stop lists for the several landmarks the route covers around Navan.

## v15 — 2026-09-11
[Remove 'nearby' hedge from Garlow Cross](https://github.com/brwinnov/sillan/commit/2b81467) — it's an official Route 179 stop, not an approximation.

## v14 — 2026-09-11
[Add Garlow Cross TFI stop 101821](https://github.com/brwinnov/sillan/commit/cca1da5).

## v13 — 2026-09-11
[Correct Shercock TFI stop number to 110111](https://github.com/brwinnov/sillan/commit/5608a8e).

## v12 — 2026-09-11
[Mention nearby TFI stop in Cootehill's description text](https://github.com/brwinnov/sillan/commit/b16a8e5).

## v11 — 2026-09-11
[Add stop-location accuracy disclaimer to About modal](https://github.com/brwinnov/sillan/commit/ce4018a).

## v10 — 2026-09-11
[Add Navan, Garlow Cross, and Ross Cross stop locations](https://github.com/brwinnov/sillan/commit/2087196).

## v9 — 2026-09-11
[Stop showing Plus Codes in stop modals; add Cootehill/Shercock TFI stops](https://github.com/brwinnov/sillan/commit/971da1e) — Plus Codes are reference-only, never shown on the page.

## v8 — 2026-09-11
[Add tap-to-open stop location modals with Maps and TFI live links](https://github.com/brwinnov/sillan/commit/1c8a6d3).

## v7 — 2026-09-11
[Tighten horizontal padding around timetable chips](https://github.com/brwinnov/sillan/commit/6d2ad5d).

## v6 — 2026-09-11
[Add Privacy footer link/modal; scope down AdSense plan to what's needed now](https://github.com/brwinnov/sillan/commit/c78759c) — no cookies exist yet, so no consent banner needed yet either.

## v5 — 2026-09-11
[Disable the week-strip day-pill row](https://github.com/brwinnov/sillan/commit/b29a8fb) — owner request; it was never interactive despite looking like buttons.

## v4 — 2026-09-11
[Add help/info modal and Sunday recollection caveat note](https://github.com/brwinnov/sillan/commit/cdf6645).

## v3 — 2026-09-11
[Extract timetable data to JSON, rename chip classes, add mobile scroll hint](https://github.com/brwinnov/sillan/commit/896b362) — timetables moved from hand-written `<table>` markup to a data-driven `TIMETABLES` object + `renderBoard()`.

## v2 — 2026-09-11
[Add first real-browser visual QA pass with screenshots](https://github.com/brwinnov/sillan/commit/4f9a2ba).

## v1 — 2026-09-11
[Deploy to Cloudflare Workers](https://github.com/brwinnov/sillan/commit/018e02d) at sillan.brwinnov.app, from the [initial commit](https://github.com/brwinnov/sillan/commit/b40c4f8).
