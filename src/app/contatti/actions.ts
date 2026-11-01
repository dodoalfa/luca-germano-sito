"use server";

import { site } from "@/lib/site";
import { deliverContact } from "@/lib/contact-delivery";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"nome" | "email" | "data" | "messaggio", string>>;
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    nome: get("nome"),
    email: get("email"),
    data: get("data"),
    servizio: get("servizio"),
    messaggio: get("messaggio"),
  };

  if (!site.contactForm.enabled) {
    return {
      status: "error",
      message: "Il modulo è in anteprima: la richiesta non viene inviata.",
      values,
    };
  }

  // Honeypot: real people never fill this hidden field.
  if (get("sito_web")) return { status: "success" };

  const errors: ContactState["errors"] = {};
  if (values.nome.length < 2) errors.nome = "Scrivi il tuo nome.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Inserisci un indirizzo email valido.";
  if (values.data && Number.isNaN(Date.parse(values.data))) errors.data = "Data non valida.";
  if (values.messaggio.length < 10) errors.messaggio = "Raccontami qualcosa in più (almeno 10 caratteri).";
  if (values.nome.length > 120 || values.messaggio.length > 5000) errors.messaggio = "Il messaggio è troppo lungo.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Controlla i campi evidenziati.", errors, values };
  }

  const result = await deliverContact(values);
  if (!result.ok) {
    return { status: "error", message: result.message, values };
  }
  return { status: "success" };
}
