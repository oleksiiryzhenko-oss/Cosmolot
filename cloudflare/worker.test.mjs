import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { CONFIG_PATH, RECORD_KEY, ENABLED_FIELD, URL_FIELD, COUNTRIES_FIELD } from './worker.mjs';
const settings = { [ENABLED_FIELD]: true, [URL_FIELD]: 'https://site.example/entry', [COUNTRIES_FIELD]: ['UA', 'PT'] };
async function request(country, config = settings, options = {}) {
  const req = new Request('https://edge.example' + CONFIG_PATH + (options.query || ''), { method: options.method || 'GET', headers: options.headers });
  if (country !== undefined) Object.defineProperty(req, 'cf', { value: { country } });
  const env = { SITE_CONFIG: { async get(key) { assert.equal(key, RECORD_KEY); return config; } } };
  const response = await worker.fetch(req, env);
  return { response, body: await response.json() };
}
test('country decision is evaluated for each request without caching responses', async () => {
  for (const [country, enabled] of [['UA', true], ['PT', true], ['US', false], [undefined, false]]) {
    const {response, body} = await request(country);
    assert.equal(response.status, 200);
    assert.equal(body[ENABLED_FIELD], enabled);
    assert.equal(body[URL_FIELD], settings[URL_FIELD]);
    assert.match(response.headers.get('Cache-Control'), /no-store/);
    assert.equal(response.headers.get('Cloudflare-CDN-Cache-Control'), 'no-store');
  }
});
test('off blocks eligible countries', async () => {
  assert.equal((await request('UA', {...settings, [ENABLED_FIELD]: false})).body[ENABLED_FIELD], false);
});
test('country cannot be spoofed using a header or query', async () => {
  const result = await request('US', settings, { query: '?country=UA', headers: {'CF-IPCountry':'UA'} });
  assert.equal(result.body[ENABLED_FIELD], false);
});
test('missing or invalid config is unavailable', async () => {
  for (const config of [null, {}, {...settings, [URL_FIELD]:'http://site.example'}, {...settings,[URL_FIELD]:'https://user:pass@site.example'}, {...settings,[ENABLED_FIELD]:'true'}, {...settings,[COUNTRIES_FIELD]:['Ukraine']}]) {
    assert.equal((await request('UA', config)).response.status, 503);
  }
});
test('KV failure is unavailable', async () => {
  const result = await worker.fetch(new Request('https://edge.example'+CONFIG_PATH), {SITE_CONFIG: { get() {throw new Error('offline');} }});
  assert.equal(result.status, 503);
});
test('unknown routes and methods do not expose configuration', async () => {
  assert.equal((await request('UA', settings, {method:'POST'})).response.status, 405);
  assert.equal((await worker.fetch(new Request('https://edge.example/other'), {})).status, 404);
});
