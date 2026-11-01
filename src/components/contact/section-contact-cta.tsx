import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SectionContactCta({ title, text, label = "Raccontami la tua idea", compact = false }: { title: string; text?: string; label?: string; compact?: boolean }) {
  return (
    <div className={cn("flex flex-col items-start gap-6 border-y border-border/60 md:flex-row md:items-center md:justify-between", compact ? "mb-0 mt-10 py-6 md:mt-12 md:py-8" : "my-12 py-10 md:my-16")}>
      <div>
        <h3 className="max-w-2xl text-2xl font-light md:text-3xl">{title}</h3>
        {text && <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{text}</p>}
      </div>
      <Button asChild variant="outline" className="max-w-full whitespace-normal text-center">
        <Link href="#scrivimi">{label}<ArrowDown aria-hidden="true" className="size-4" /></Link>
      </Button>
    </div>
  );
}
