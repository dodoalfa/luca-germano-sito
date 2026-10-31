"use server";

import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"nome" | "email" | "data" | "messaggio", string>>;
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    nome: get("nome"),
    email: get("email"),
    data: get("data"),
    servizio: get("servizio"),
    messaggio: get("messaggio"),
  };

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contatti] RESEND_API_KEY non configurata: messaggio non inviato");
    return {
      status: "error",
      message: `Il modulo non è ancora attivo. Scrivimi direttamente a ${site.email}.`,
      values,
    };
  }

  const dataLabel = values.data
    ? new Date(values.data).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })
    : "non indicata";

  const rows = [
    ["Nome", values.nome],
    ["Email", values.email],
    ["Data dell'evento", dataLabel],
    ["Servizio", values.servizio || "non indicato"],
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Sito Luca Germano <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: values.email,
      subject: `Nuova richiesta dal sito: ${values.nome}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${values.messaggio}`,
      html: `${rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v)}</p>`).join("")}<p>${escapeHtml(values.messaggio).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[contatti] invio fallito", res.status, await res.text().catch(() => ""));
    return {
      status: "error",
      message: `Qualcosa è andato storto. Riprova tra poco o scrivimi a ${site.email}.`,
      values,
    };
  }

  return { status: "success" };
}
