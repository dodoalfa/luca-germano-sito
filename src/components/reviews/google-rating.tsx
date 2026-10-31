import { Star } from "lucide-react";

import type { RatingSummary } from "@/lib/reviews";
import { cn } from "@/lib/utils";

/** Piccolo badge con il voto Google, pensato per l'header. */
export function GoogleRating({ rating, total, url, className }: RatingSummary & { className?: string }) {
  const value = rating.toLocaleString("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const label = `Voto Google ${value} su 5${total ? `, ${total} recensioni` : ""}`;
  const content = (
    <>
      <Star className="size-3 fill-current" strokeWidth={1.25} aria-hidden />
      <span className="tabular-nums">{value}</span>
      <span className="hidden opacity-60 lg:inline">Google{total ? ` · ${total}` : ""}</span>
    </>
  );
  const classes = cn("eyebrow inline-flex items-center gap-1.5 opacity-80 transition-opacity hover:opacity-100", className);

  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className={classes}>
      {content}
    </a>
  ) : (
    <span role="img" aria-label={label} className={classes}>
      {content}
    </span>
  );
}
