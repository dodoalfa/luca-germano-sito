import Link from "next/link";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

// Temporary home: shows the type scale and layout until the Hero slider (step 4) lands.
export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 pb-24 pt-36 md:px-10 md:pt-48">
      <p className="eyebrow mb-8 text-muted-foreground">Fotografo · {site.location}</p>
      <h1 className="max-w-5xl text-5xl leading-[1.02] font-light md:text-7xl lg:text-8xl">
        Catturare l&apos;essenza
        <br />
        <span className="italic">di un momento.</span>
      </h1>
      <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12">
        <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:col-start-7 md:text-lg">
          Reportage di matrimonio, newborn e maternità, ritratti ed eventi. Immagini sincere,
          luce naturale, nessuna posa forzata: solo le vostre storie, raccontate con cura.
        </p>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:col-start-7">
          <Button asChild>
            <Link href="/portfolio">Guarda il portfolio</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contatti">Richiedi informazioni</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
