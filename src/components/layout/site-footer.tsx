import Link from "next/link";

import { navigation, site } from "@/lib/site";
import { CurrentYear } from "./current-year";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-14 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
            Raccontiamo insieme
            <br />
            <span className="italic text-muted-foreground">il vostro momento.</span>
          </p>
          <Link
            href="/contatti"
            className="eyebrow mt-6 inline-block border-b border-current pb-1 transition-opacity hover:opacity-60"
          >
            Scrivimi
          </Link>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="eyebrow mb-4 text-muted-foreground">Menu</p>
          <ul className="space-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-opacity hover:opacity-60">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-3">
          <p className="eyebrow mb-4 text-muted-foreground">Contatti</p>
          <ul className="space-y-2 text-sm">
            <li><a href={`mailto:${site.email}`} className="transition-opacity hover:opacity-60">{site.email}</a></li>
            <li><a href={site.phoneHref} className="transition-opacity hover:opacity-60">{site.phone}</a></li>
            <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">Instagram</a></li>
            <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">Facebook</a></li>
            <li className="text-muted-foreground">{site.location}</li>
          </ul>
        </address>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-5 pb-8 text-xs text-muted-foreground md:flex-row md:justify-between md:px-10">
        <p>© <CurrentYear /> {site.title}. Tutti i diritti riservati.</p>
        <p>Fotografia di matrimonio, newborn e ritratto a Fano e nelle Marche</p>
      </div>
    </footer>
  );
}
