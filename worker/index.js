// Backend for /api/stats only. Everything else is served as a plain static
// file by the assets layer without ever reaching this script — see
// wrangler.jsonc's assets.run_worker_first, scoped to just "/api/*".
//
// Visit counts come from Cloudflare's GraphQL Analytics API
// (httpRequestsAdaptiveGroups), the only dataset that can filter by hostname
// — filtered to sillan.brwinnov.app specifically, never the whole
// brwinnov.app zone, even though the API token's own permission is
// necessarily zone-wide (Cloudflare has no subdomain-scoped token).
//
// That dataset only accepts a single day's span per query, so "today" /
// "this week" / "all-time" are built from one GraphQL request per day,
// combined via aliases into a single HTTP call, summed here. Retention on
// this account's plan tops out at ~31 days back — currently that's the
// site's whole lifetime (launched 2026-09-11), so "all-time" is genuinely
// all-time for now. Once the site is older than the retention window,
// "all-time" will silently become "oldest available day" instead — not a
// bug, just this dataset's limit.
const HOSTNAME = 'sillan.brwinnov.app';
const LAUNCH_DATE = '2026-09-11';
const MAX_DAYS_BACK = 30; // stay under the ~31-day retention ceiling

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function daysSinceLaunch() {
  var launch = new Date(LAUNCH_DATE + 'T00:00:00Z');
  var today = new Date();
  var todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  var diff = Math.floor((todayUTC - launch) / 86400000);
  return Math.min(Math.max(diff, 0), MAX_DAYS_BACK - 1);
}

async function fetchDailyVisits(token, zoneId, dayCount) {
  var today = new Date();
  var todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  var aliases = [];
  var days = [];
  for (var i = 0; i <= dayCount; i++) {
    var start = new Date(todayUTC.getTime() - i * 86400000);
    var end = new Date(start.getTime() + 86400000);
    var alias = 'd' + i;
    days.push({ alias: alias, date: isoDate(start) });
    aliases.push(
      alias + ': httpRequestsAdaptiveGroups(limit: 1, filter: {' +
      'datetime_geq: "' + start.toISOString() + '", ' +
      'datetime_lt: "' + end.toISOString() + '", ' +
      'clientRequestHTTPHost: "' + HOSTNAME + '", ' +
      'requestSource: "eyeball"' +
      '}) { sum { visits } }'
    );
  }
  var query = 'query { viewer { zones(filter: {zoneTag: "' + zoneId + '"}) { ' +
    aliases.join(' ') + ' } } }';

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
  var zone = body.data.viewer.zones[0];
  return days.map(function (d) {
    var group = zone[d.alias] && zone[d.alias][0];
    return { date: d.date, visits: group ? group.sum.visits : 0 };
  });
}

async function handleStats(env, ctx) {
  var cache = caches.default;
  var cacheKey = new Request('https://sillan.brwinnov.app/__stats_cache__');
  var cached = await cache.match(cacheKey);
  if (cached) return cached;

  var dayCount = daysSinceLaunch();
  var daily = await fetchDailyVisits(env.CF_ANALYTICS_TOKEN, env.CF_ZONE_ID, dayCount);

  var today = daily[0] ? daily[0].visits : 0;
  var week = daily.slice(0, 7).reduce(function (sum, d) { return sum + d.visits; }, 0);
  var allTime = daily.reduce(function (sum, d) { return sum + d.visits; }, 0);

  var result = {
    today: today,
    last7Days: week,
    allTime: allTime,
    since: LAUNCH_DATE,
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
  }
};
