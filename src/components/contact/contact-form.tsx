"use client";

import { useActionState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { sendContact, type ContactState } from "@/app/contatti/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/portfolio";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

export function ContactForm({ defaultService }: { defaultService?: string } = {}) {
  const [state, action, pending] = useActionState(sendContact, initial);
  const id = useId();
  const enabled = site.contactForm.enabled;
  const v = state.values ?? {};
  const err = state.errors ?? {};

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        className="border-t border-border/60 pt-10"
      >
        <span className="mb-6 inline-flex size-12 items-center justify-center rounded-full border border-border">
          <Check className="size-5" strokeWidth={1.25} />
        </span>
        <h2 className="text-4xl font-light md:text-5xl">
          Grazie, <span className="italic">a presto.</span>
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          Ho ricevuto il tuo messaggio e ti risponderò appena possibile. Se è urgente, chiamami o scrivimi su WhatsApp.
        </p>
      </motion.div>
    );
  }

  const field = (name: keyof NonNullable<ContactState["errors"]>) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": err[name] ? `${id}-${name}-err` : undefined,
  });

  const errorText = (name: keyof NonNullable<ContactState["errors"]>) =>
    err[name] ? (
      <p id={`${id}-${name}-err`} className="mt-2 text-sm text-red-500">
        {err[name]}
      </p>
    ) : null;

  return (
    <form id="modulo-email" aria-labelledby="modulo-email-titolo" tabIndex={-1} action={action} onSubmit={(event) => { if (!enabled) event.preventDefault(); }} noValidate className="scroll-mt-28 space-y-10 focus:outline-none">
      <div className="border-b border-border/60 pb-6">
        <h2 id="modulo-email-titolo" className="text-3xl font-light md:text-4xl">Scrivimi via email.</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">Compila il modulo con i tuoi recapiti e raccontami che cosa hai in mente. Userò la tua email per risponderti.</p>
      </div>
      {!enabled && (
        <p id="modulo-anteprima" role="note" className="border border-border/70 bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
          Il modulo è in anteprima: puoi provare i campi, ma la richiesta non viene inviata.
        </p>
      )}
      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Sito web
          <input type="text" name="sito_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <Label htmlFor={`${id}-nome`}>Nome *</Label>
          <Input {...field("nome")} autoComplete="name" required defaultValue={v.nome} placeholder="Come ti chiami?" />
          {errorText("nome")}
        </div>
        <div>
          <Label htmlFor={`${id}-email`}>Email *</Label>
          <Input {...field("email")} type="email" autoComplete="email" inputMode="email" required defaultValue={v.email} placeholder="nome@esempio.it" />
          {errorText("email")}
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <Label htmlFor={`${id}-data`}>Data dell&apos;evento</Label>
          <Input {...field("data")} type="date" defaultValue={v.data} />
          {errorText("data")}
        </div>
        <fieldset>
          <legend className="eyebrow mb-3 text-muted-foreground">Servizio</legend>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <label key={c.slug} className="cursor-pointer">
                <input
                  type="radio"
                  name="servizio"
                  value={c.label}
                  defaultChecked={(v.servizio ?? defaultService) === c.label}
                  className="peer sr-only"
                />
                <span className="inline-block border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-2 peer-focus-visible:ring-ring hover:border-foreground/60">
                  {c.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <Label htmlFor={`${id}-messaggio`}>Raccontami *</Label>
        <Textarea
          {...field("messaggio")}
          required
          rows={4}
          defaultValue={v.messaggio}
          placeholder="Il luogo, il numero di ospiti, cosa immagini per le tue foto..."
        />
        {errorText("messaggio")}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
          Inviando il modulo accetti che i tuoi dati vengano usati solo per rispondere alla tua richiesta.
        </p>
        <Button type="submit" size="lg" disabled={pending || !enabled} aria-describedby={!enabled ? "modulo-anteprima" : undefined} className="group max-w-full whitespace-normal text-center">
          {!enabled ? "Invio non attivo in anteprima" : pending ? "Invio in corso..." : "Invia richiesta via email"}
          <ArrowRight className={cn("transition-transform", !pending && "group-hover:translate-x-1")} strokeWidth={1.5} />
        </Button>
      </div>

      <AnimatePresence>
        {state.status === "error" && state.message && (
          <motion.p
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-l-2 border-red-500 pl-4 text-sm"
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
