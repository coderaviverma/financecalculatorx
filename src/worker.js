/* Host canonicalization + HSTS in front of the static assets.
   - http:// → https:// (301)
   - www.financecalculatorx.com and *.workers.dev → https://financecalculatorx.com (301, path+query preserved)
   - adds Strict-Transport-Security on all canonical responses */
const CANONICAL_HOST = "financecalculatorx.com";

function harden(response) {
  const headers = new Headers(response.headers);
  headers.set("Strict-Transport-Security", "max-age=15552000; includeSubDomains");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname !== CANONICAL_HOST || url.protocol !== "https:") {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      url.port = "";
      return harden(Response.redirect(url.toString(), 301));
    }

    // Country detection for default-currency selection. Cloudflare resolves the
    // country at the edge (request.cf.country) — no third-party geo-IP service,
    // no IP leaves the edge, and only the 2-letter country code is returned.
    if (url.pathname === "/geo") {
      const country = (request.cf && request.cf.country) || "";
      return harden(new Response(JSON.stringify({ country }), {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
          "x-robots-tag": "noindex",
        },
      }));
    }
    const res = await env.ASSETS.fetch(request);
    return harden(res);
  },
};
