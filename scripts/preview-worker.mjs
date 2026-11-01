import worker from "../.open-next/worker.js";
export * from "../.open-next/worker.js";

export default {
  ...worker,
  async fetch(request, env, ctx) {
    if (new URL(request.url).pathname === "/robots.txt") {
      return new Response(["User-agent: *", "Disallow: /", ""].join(String.fromCharCode(10)), {
        headers: { "Content-Type": "text/plain", "X-Robots-Tag": "noindex, nofollow" },
      });
    }
    const response = await worker.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
