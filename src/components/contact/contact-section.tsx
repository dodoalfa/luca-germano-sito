"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { ContactForm } from "./contact-form";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { categories } from "@/lib/portfolio";

export function ContactSection() {
  const pathname = usePathname();
  // The contact page already has its own form and direct contact channels.
  if (pathname === "/contatti") return null;

  const category = categories.find((item) => pathname === "/portfolio/" + item.slug);
  const service = pathname === "/fotografo-matrimonio-fano" ? "Matrimoni"
    : pathname === "/fotografo-famiglia-fano" ? "Ritratti" : category?.label;
  const title = pathname === "/fotografo-matrimonio-fano" ? "Raccontami il vostro giorno."
    : pathname === "/fotografo-famiglia-fano" ? "Parlami della vostra famiglia."
    : "Raccontami il tuo momento.";
  const whatsapp = "https://wa.me/393386492379?text=" + encodeURIComponent(
    "Ciao Luca, vorrei informazioni" + (service ? " per un servizio " + service.toLowerCase() : "") + ". "
  );

  return (
    <section id="scrivimi" aria-labelledby="scrivimi-titolo" className="scroll-mt-24 border-t border-border/60 bg-muted/20">
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6 text-muted-foreground">Cominciamo da qui</p>
          <h2 id="scrivimi-titolo" className="text-4xl font-light leading-tight md:text-5xl">{title}</h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Dimmi che cosa hai in mente, la data o il periodo e il luogo. Ti rispondo per parlare
            di disponibilità e costruire una proposta adatta a te.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="max-w-full whitespace-normal text-center">
              <a href="#modulo-email"><Mail aria-hidden="true" />Scrivimi via email con il modulo</a>
            </Button>
            <Button asChild variant="outline" className="border-emerald-700 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-200">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />Scrivimi su WhatsApp</a>
            </Button>
            <Button asChild variant="outline"><a href={site.phoneHref}><Phone aria-hidden="true" />Chiamami</a></Button>
          </div>
          <a href={"mailto:" + site.email} className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4"><Mail aria-hidden="true" className="size-4" />{site.email}</a>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{site.title}<br />{site.address.full}</p>
        </div>
        <div className="lg:col-span-7">
          <ContactForm key={pathname} defaultService={service} />
        </div>
      </div>
    </section>
  );
}
