import type { Faq } from "@/data/editorial";

export function FaqSection({ items, title = "Prima di incontrarci.", id = "domande" }: { items: Faq[]; title?: string; id?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question", name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <section aria-labelledby={id} className="border-t border-border/60">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6 text-muted-foreground">Le vostre domande</p>
          <h2 id={id} className="text-4xl font-light leading-tight md:text-6xl">{title}</h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">Qualche risposta per immaginare il prossimo passo, con calma.</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-border/60 py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg focus-visible:outline-2 focus-visible:outline-offset-4">
                <span>{item.question}</span><span aria-hidden className="text-muted-foreground group-open:rotate-45">+</span>
              </summary>
              <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }} />
    </section>
  );
}