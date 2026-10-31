import { cacheLife } from "next/cache";

// Cached server value: prerenders statically and refreshes daily, so the
// footer year rolls over without a redeploy.
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
