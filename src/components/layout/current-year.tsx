// Year of the last build: the site is redeployed far more often than once a
// year, and this avoids a runtime cache entry just for the footer.
export function CurrentYear() {
  return <>{process.env.NEXT_PUBLIC_BUILD_YEAR}</>;
}
