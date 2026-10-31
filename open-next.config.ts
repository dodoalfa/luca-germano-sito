import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The site is fully prerendered at build time, so pages are served straight
// from Workers static assets. No R2 bucket or KV namespace is needed: content
// changes go live with each deploy.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
