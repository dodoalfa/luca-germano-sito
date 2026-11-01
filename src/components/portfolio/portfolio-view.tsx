import { SectionContactCta } from "@/components/contact/section-contact-cta";
import { CategoryNav } from "./category-nav";
import { MasonryGrid } from "./masonry-grid";
import type { Photo } from "@/lib/portfolio";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  photos: Photo[];
  showCategory?: boolean;
};

export function PortfolioView({ eyebrow, title, intro, photos, showCategory }: Props) {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-44">
      <header className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow mb-6 text-muted-foreground">{eyebrow}</p>
          <h1 className="text-5xl font-light leading-[1.02] md:text-7xl">{title}</h1>
        </div>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">
          {intro}
        </p>
      </header>

      <div className="mb-10 border-b border-border/60 md:mb-14">
        <CategoryNav />
      </div>

      {photos.length > 0 ? (
        <>
          <SectionContactCta title="Quale storia vorresti raccontare?" label="Parlami del tuo servizio" />
          <MasonryGrid photos={photos} showCategory={showCategory} />
          <SectionContactCta title="Il prossimo ricordo potrebbe essere il tuo." text="Raccontami la tua occasione, la data e il luogo." label="Scrivimi per un preventivo" />
        </>
      ) : (
        <SectionContactCta title="Partiamo dalla tua idea." text="Parlami dell’occasione, delle persone e di ciò che desideri ricordare: definiamo insieme il tuo servizio fotografico." label="Parliamone insieme" />
      )}
    </div>
  );
}
