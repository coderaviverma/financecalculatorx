/* Host canonicalization + HSTS in front of the static assets.
   - http:// → https:// (301)
   - www.financecalculatorx.com and *.workers.dev → https://financecalculatorx.com (301, path+query preserved)
   - adds Strict-Transport-Security on all canonical responses */
const CANONICAL_HOST = "financecalculatorx.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname !== CANONICAL_HOST || url.protocol !== "https:") {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }
    const res = await env.ASSETS.fetch(request);
    const headers = new Headers(res.headers);
    headers.set("Strict-Transport-Security", "max-age=15552000; includeSubDomains");
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  },
};
