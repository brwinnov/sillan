// Backend for /api/stats plus a daily scheduled job. Everything else is
// served as a plain static file by the assets layer without ever reaching
// this script — see wrangler.jsonc's assets.run_worker_first, scoped to
// just "/api/*".
//
// Visit counts come from Cloudflare's GraphQL Analytics API
// (httpRequestsAdaptiveGroups), the only dataset that can filter by
// hostname — filtered to sillan.brwinnov.app specifically, never the whole
// brwinnov.app zone, even though the API token's own permission is
// necessarily zone-wide (Cloudflare has no subdomain-scoped token).
//
// That dataset only accepts a single day's span per query, and this
// account's plan can't look back further than ~31 days. Rather than stay
// bounded by that retention window, a daily cron (scheduled() below) writes
// each day's total into KV permanently, once, the morning after — so
// "all-time" keeps growing past 31 days instead of quietly losing history.
// KV is the source of truth for anything older than today; the live
// GraphQL API is only ever asked for TODAY's still-in-progress count.
const HOSTNAME = 'sillan.brwinnov.app';
const LAUNCH_DATE = '2026-09-11';

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function todayUTC() {
  var now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

async function fetchDayVisits(token, zoneId, dateStr) {
  var start = new Date(dateStr + 'T00:00:00Z');
  var end = new Date(start.getTime() + 86400000);
  var query = 'query { viewer { zones(filter: {zoneTag: "' + zoneId + '"}) { ' +
    'httpRequestsAdaptiveGroups(limit: 1, filter: {' +
    'datetime_geq: "' + start.toISOString() + '", ' +
    'datetime_lt: "' + end.toISOString() + '", ' +
    'clientRequestHTTPHost: "' + HOSTNAME + '", ' +
    'requestSource: "eyeball"' +
    '}) { sum { visits } } } } }';

  var resp = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: query })
  });
  var body = await resp.json();
  if (!resp.ok || body.errors) {
    throw new Error('Cloudflare GraphQL API error: ' + JSON.stringify(body.errors || body));
  }
  var group = body.data.viewer.zones[0].httpRequestsAdaptiveGroups[0];
  return group ? group.sum.visits : 0;
}

// Writes one day's total into KV permanently. Used by the daily cron for
// "yesterday", and reused directly (not via HTTP) for the one-time backfill
// that seeded history from LAUNCH_DATE up to the day before this feature
// shipped — see docs/stats-log.md for that backfill record.
async function writeDayToKV(env, dateStr) {
  var visits = await fetchDayVisits(env.CF_ANALYTICS_TOKEN, env.CF_ZONE_ID, dateStr);
  await env.SILLAN_STATS.put(dateStr, String(visits), { metadata: { visits: visits } });
  return visits;
}

async function readKVTotals(env) {
  var all = [];
  var cursor;
  do {
    var page = await env.SILLAN_STATS.list({ cursor: cursor, limit: 1000 });
    all = all.concat(page.keys);
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);
  return all
    .map(function (k) { return { date: k.name, visits: (k.metadata && k.metadata.visits) || 0 }; })
    .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
}

async function handleStats(env, ctx) {
  var cache = caches.default;
  var cacheKey = new Request('https://sillan.brwinnov.app/__stats_cache__');
  var cached = await cache.match(cacheKey);
  if (cached) return cached;

  var today = isoDate(todayUTC());
  var todayVisits = await fetchDayVisits(env.CF_ANALYTICS_TOKEN, env.CF_ZONE_ID, today);
  var history = await readKVTotals(env); // every day strictly before today, permanently

  var sevenDaysAgo = isoDate(new Date(todayUTC().getTime() - 6 * 86400000));
  var last7 = history.filter(function (d) { return d.date >= sevenDaysAgo; })
    .reduce(function (sum, d) { return sum + d.visits; }, 0) + todayVisits;
  var allTime = history.reduce(function (sum, d) { return sum + d.visits; }, 0) + todayVisits;

  var result = {
    today: todayVisits,
    last7Days: last7,
    allTime: allTime,
    since: LAUNCH_DATE,
    daysRecorded: history.length + 1,
    generatedAt: new Date().toISOString()
  };

  var response = new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json',
      // Short server-side cache so a burst of visitors doesn't hammer the
      // GraphQL API — stats don't need to be second-by-second fresh.
      'Cache-Control': 'public, max-age=600'
    }
  });
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

export default {
  async fetch(request, env, ctx) {
    var url = new URL(request.url);
    if (url.pathname === '/api/stats') {
      try {
        return await handleStats(env, ctx);
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Not found', { status: 404 });
  },

  async scheduled(event, env, ctx) {
    var yesterday = isoDate(new Date(todayUTC().getTime() - 86400000));
    ctx.waitUntil(writeDayToKV(env, yesterday));
  }
};
