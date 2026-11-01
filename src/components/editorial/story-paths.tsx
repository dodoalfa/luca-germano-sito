import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const chapters = [
  { number: "01", title: "Il giorno che scegliete insieme.", text: "L'attesa, la cerimonia, la festa. E quei piccoli gesti che tengono insieme il racconto del vostro matrimonio.", href: "/fotografo-matrimonio-fano", link: "Il vostro matrimonio" },
  { number: "02", title: "La famiglia, mentre cambia.", text: "Un battesimo, un anniversario, un ritratto insieme. Le occasioni passano; le immagini danno una forma ai ricordi.", href: "/fotografo-famiglia-fano", link: "I vostri legami" },
];
export function StoryPaths({ compact = false }: { compact?: boolean } = {}) {
  return (
    <section className="border-t border-border/60">
      <div className={"mx-auto max-w-[1600px] px-5 md:px-10 " + (compact ? "py-12 md:py-16" : "py-24 md:py-36")}>
        <p className="eyebrow mb-6 text-muted-foreground">Il prossimo capitolo</p>
        <h2 className="max-w-3xl text-4xl font-light leading-tight md:text-6xl">Quale momento vuoi <span className="italic">portare con te?</span></h2>
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
          {chapters.map((chapter) => (
            <Link key={chapter.href} href={chapter.href} className="group border-t border-border/60 pt-8">
              <span className="eyebrow text-muted-foreground">{chapter.number}</span>
              <h3 className="mt-6 text-3xl font-light md:text-4xl">{chapter.title}</h3>
              <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{chapter.text}</p>
              <span className="eyebrow mt-8 inline-flex items-center gap-3 border-b border-current pb-2">{chapter.link}<ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function StoryInvitation() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-8 px-5 py-24 md:flex-row md:items-end md:justify-between md:px-10 md:py-36">
        <div><p className="eyebrow mb-6 text-muted-foreground">Da Fano, cominciamo da voi</p><h2 className="max-w-3xl text-4xl font-light md:text-6xl">Il prossimo racconto <span className="italic">potrebbe essere il tuo.</span></h2><p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">Dimmi che cosa stai organizzando e che cosa vorresti ricordare. Cominciamo da lì.</p></div>
        <Button asChild size="lg"><Link href="#scrivimi">Raccontami il tuo momento</Link></Button>
      </div>
    </section>
  );
}