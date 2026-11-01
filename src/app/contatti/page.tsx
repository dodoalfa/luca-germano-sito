import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Luca Germano, fotografo a Fano, per un preventivo per matrimonio, servizio newborn, ritratti o eventi nelle Marche.",
  alternates: { canonical: "/contatti" },
};

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Telefono", value: site.phone, href: site.phoneHref },
  { label: "WhatsApp", value: "Scrivimi", href: `https://wa.me/${site.phoneHref.replace(/\D/g, "")}`, external: true },
  { label: "Instagram", value: "@lucagermanofotografo", href: site.social.instagram, external: true },
];

export default function ContattiPage() {
  return (
    <div id="scrivimi" className="mx-auto w-full max-w-[1600px] scroll-mt-24 px-5 pb-24 pt-32 md:px-10 md:pb-36 md:pt-44">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-8 text-muted-foreground">Contatti</p>
            <h1 className="text-5xl font-light leading-[1.02] md:text-7xl">
              Raccontami
              <br />
              <span className="italic">la tua storia.</span>
            </h1>
            <p className="mt-8 max-w-sm text-lg leading-relaxed text-muted-foreground">
              Che sia un matrimonio, l&apos;arrivo di un bambino o un evento speciale, scrivimi: ti
              risponderò per parlare di disponibilità e proposta.
            </p>
          </Reveal>

          <Reveal delay={0.1} as="section" className="mt-16">
            <h2 className="sr-only">Altri modi per contattarmi</h2>
            <ul className="border-t border-border/60">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-border/60">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-5 transition-opacity hover:opacity-70"
                  >
                    <span className="eyebrow text-muted-foreground">{c.label}</span>
                    <span className="flex items-center gap-2 text-right">
                      {c.value}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.25} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <address className="mt-8 not-italic text-sm leading-relaxed text-muted-foreground">
              <p>{site.title}</p><p>{site.address.full}</p>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block border-b border-current pb-1">Indicazioni su Google Maps</a>
            </address>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7 lg:pt-28">
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
