# Stop locations — Route 179

Source of truth for the per-stop "where is this stop" modal in `src/index.html`
(`STOP_INFO` object). Supplied by the owner (Barry) from personal knowledge —
manually gathered, not from an official Sillan/TFI stop-location dataset.

Format per stop: description, Plus Code / Google Maps link, TFI stop number
(Transport for Ireland's official bus stop reference) if known.

**Plus Codes are reference-only, never shown on the page** — used solely to build
each stop's `mapsUrl`. The rendered modal only shows the description text and
the TFI stop number (when known); it never prints a Plus Code. (Owner
correction, 2026-09-11 — an earlier version of this feature displayed them.)

## Have data (clickable in the page)

| Stop | Description | Location (reference only, not shown on page) | TFI stop # |
|---|---|---|---|
| Cootehill | White Horse Hotel | Plus Code 3WG9+2W, Cootehill, Co. Cavan | 15094 |
| Shercock | Fair Hill House / Carrick Road junction | https://maps.app.goo.gl/L7eQxv9MyoZKQNJX9 | 110111 |
| Kingscourt | **Gartlans Pub** (the official TFI/Sillan site reportedly lists "Blakes Pub" — owner believes this is stale) | Plus Code W54V+QX, Kingscourt, Co. Cavan | 137861 |
| Nobber | Church entrance | https://maps.app.goo.gl/fKUSvV2aA4bzqPMn7 | — |
| Wilkinstown | T-junction | Plus Code P7MQ+RF, Wilkinstown, Co. Meath | 137901 |
| Dunshaughlin | Foleys EBS | Plus Code GF56+V4, Dunshaughlin, Co. Meath | 15090 |
| Navan | Navan Shopping Centre. Route also passes TaraGlen, Topaz Petrol Station, RoundO Pub, AIB Kennedy Road, ArdBoyne, Old Bridge — these are **not** separate timetable stops, just route colour, confirmed by owner not to require splitting "Navan" into multiple rows. No Plus Code/Maps link supplied — `mapsUrl` uses a plain text search ("Navan Shopping Centre, County Meath") rather than a Plus Code. Has an `extra` field (see below) listing additional TFI stops along the route through Navan, grouped by direction. | 189521 |
| Garlow Cross | Maps link supplied directly. | 101821 |
| Ross Cross | No description/venue given yet, just the TFI number. `mapsUrl` uses a plain text search ("Ross Cross, County Meath"). | 101861 |

## Navan's extra TFI stops (route detail, not separate timetable rows)

Navan's `STOP_INFO` entry has an `extra: {toDublin: [...], fromDublin: [...]}` field
that renders as two extra grouped lists at the bottom of its modal — direction-specific
landmarks along the route through Navan, each linking to its own live TFI departures
where a TFI number is known:

**To Dublin:** Simons Town (15087), Circle K (15088), N51 to Shopping Centre (189521),
"Kennedy Rd AIB → Watergate Street → Dublin Rd" (plain text, no TFI number),
Ardboyne Hotel - Dublin Road (101801), Kilcarn Bridge (101811)

**From Dublin:** FlowerHill (15091), Circle K (15092), Simons Town (15093)

This pattern (`extra` field, `renderExtraGroup()` in `src/index.html`) exists for any
stop that needs sub-location detail beyond a single description — not Navan-specific.

## Still needed

| Stop | Notes |
|---|---|
| UCD | No description or location yet (return-journey table). |
| Nassau Street | No description or location yet. |
| Hilton Garden | No description or location yet. |

## TFI live-departures link

Confirmed working 2026-09-11 by loading it directly and checking the returned
stop name/route data matched:

```
https://journeyplanner-production.transportforireland.ie/departures/liveDepartures?stopId=<TFI stop number>
```

Only stops with a known TFI number get this second link in their modal
(`tfiUrl` field in `STOP_INFO`, `src/index.html`).
