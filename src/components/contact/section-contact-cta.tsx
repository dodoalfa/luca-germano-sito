import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SectionContactCta({ title, text, label = "Raccontami la tua idea" }: { title: string; text?: string; label?: string }) {
  return (
    <div className="my-12 flex flex-col items-start gap-6 border-y border-border/60 py-10 md:my-16 md:flex-row md:items-center md:justify-between">
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
