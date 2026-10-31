import { cn } from "@/lib/utils";

const variants = {
  /** "LUCAGERMANO" + "Fotografo" */
  full: { src: "/logo/luca-germano-logo.svg", ratio: 2076 / 450 },
  /** "LUCAGERMANO" only, for small sizes such as the header */
  wordmark: { src: "/logo/luca-germano-wordmark.svg", ratio: 2076 / 198 },
} as const;

type Props = {
  variant?: keyof typeof variants;
  className?: string;
};

/**
 * Luca Germano logo, drawn as a CSS mask so it takes the current text colour
 * and follows the light/dark theme. Set the size with a width class.
 */
export function Logo({ variant = "wordmark", className }: Props) {
  const { src, ratio } = variants[variant];
  return (
    <span
      role="img"
      aria-label="Luca Germano Fotografo"
      className={cn("block bg-current", className)}
      style={{
        aspectRatio: ratio,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
