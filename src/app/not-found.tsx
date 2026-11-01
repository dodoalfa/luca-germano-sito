import type { Metadata } from "next";
import Link from "next/link";

import { ShadowCast, StudioLight } from "@/components/motion/studio-light";
import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <StudioLight rest={{ x: 50, y: 40 }} className="-z-10" />
      <div className="mx-auto w-full max-w-[1600px] px-5 pb-20 pt-32 md:px-10">
        <p className="eyebrow mb-6 text-muted-foreground">Errore 404</p>
        <h1 className="text-5xl font-light leading-[1.02] md:text-8xl">
          <ShadowCast rest={{ x: 50, y: 40 }}>
            Questa foto <span className="italic">non c&apos;è</span>.
          </ShadowCast>
        </h1>
        <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
          La pagina che cerchi è stata spostata o non esiste più. Puoi ripartire da qui:
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button asChild>
            <Link href="/">Torna alla home</Link>
          </Button>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="eyebrow opacity-70 transition-opacity hover:opacity-100">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
