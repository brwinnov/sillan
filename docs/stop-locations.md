# Stop locations — Route 179

Source of truth for the per-stop "where is this stop" modal in `src/index.html`
(`STOP_INFO` object). Supplied by the owner (Barry) from personal knowledge —
manually gathered, not from an official Sillan/TFI stop-location dataset.

Format per stop: description, Plus Code / Google Maps link, TFI stop number
(Transport for Ireland's official bus stop reference) if known.

## Have data (clickable in the page)

| Stop | Description | Location | TFI stop # |
|---|---|---|---|
| Cootehill | White Horse Hotel | Plus Code 3WG9+2W, Cootehill, Co. Cavan | — |
| Shercock | Fair Hill House / Carrick Road junction | https://maps.app.goo.gl/L7eQxv9MyoZKQNJX9 | — |
| Kingscourt | **Gartlans Pub** (the official TFI/Sillan site reportedly lists "Blakes Pub" — owner believes this is stale) | Plus Code W54V+QX, Kingscourt, Co. Cavan | 137861 |
| Nobber | Church entrance | https://maps.app.goo.gl/fKUSvV2aA4bzqPMn7 | — |
| Wilkinstown | T-junction | Plus Code P7MQ+RF, Wilkinstown, Co. Meath | 137901 |
| Dunshaughlin | Foleys EBS | Plus Code GF56+V4, Dunshaughlin, Co. Meath | 15090 |

## Still needed

| Stop | Notes |
|---|---|
| Navan | Official stop is **Navan Shopping Centre** (owner: "I believe" — not 100% certain). Route also passes TaraGlen, Topaz Petrol Station, RoundO Pub, AIB Kennedy Road, ArdBoyne, Old Bridge — these are **not** separate timetable stops, just route colour, and were confirmed by owner not to require splitting "Navan" into multiple rows. Need a Plus Code / Maps link for the Shopping Centre itself. |
| Garlow Cross | No description or location yet. |
| Ross Cross | No description or location yet. |
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
