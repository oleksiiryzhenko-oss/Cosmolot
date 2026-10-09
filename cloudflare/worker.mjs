export const CONFIG_PATH = "/config";
export const RECORD_KEY = "site_config";
export const ENABLED_FIELD = "enabled";
export const URL_FIELD = "site_url";
export const COUNTRIES_FIELD = "countries";

function validHttps(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !!url.hostname && !url.username && !url.password;
  } catch { return false; }
}

function reply(body, status = 200, extra = {}) {
  return Response.json(body, { status, headers: {
    "Cache-Control": "no-store, max-age=0",
    "CDN-Cache-Control": "no-store",
    "Cloudflare-CDN-Cache-Control": "no-store",
    ...extra,
  } });
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== CONFIG_PATH) return reply({ error: "Not found" }, 404);
    if (request.method !== "GET") return reply({ error: "Method not allowed" }, 405, { Allow: "GET" });
    try {
      const config = await env.SITE_CONFIG.get(RECORD_KEY, { type: "json", cacheTtl: 60 });
      if (!config || typeof config[ENABLED_FIELD] !== "boolean" || !validHttps(config[URL_FIELD])
          || !Array.isArray(config[COUNTRIES_FIELD])
          || !config[COUNTRIES_FIELD].every(country => typeof country === "string" && /^[A-Z]{2}$/.test(country))) {
        return reply({ error: "Configuration unavailable" }, 503);
      }
      // Only trust Cloudflare metadata, never a country header/query supplied by a client.
      const country = request.cf?.country;
      const enabled = config[ENABLED_FIELD] && typeof country === "string"
        && config[COUNTRIES_FIELD].includes(country);
      return reply({ [ENABLED_FIELD]: enabled, [URL_FIELD]: config[URL_FIELD].trim() });
    } catch {
      return reply({ error: "Configuration unavailable" }, 503);
    }
  },
};
