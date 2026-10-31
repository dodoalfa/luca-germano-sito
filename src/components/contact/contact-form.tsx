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
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const id = useId();
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
          Ho ricevuto il tuo messaggio e ti risponderò entro 48 ore. Se è urgente, chiamami o scrivimi su WhatsApp.
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
    <form action={action} noValidate className="space-y-10">
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
                  defaultChecked={v.servizio === c.label}
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
        <Button type="submit" size="lg" disabled={pending} className="group">
          {pending ? "Invio in corso..." : "Invia richiesta"}
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
