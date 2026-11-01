export type ContactMessage = {
  nome: string;
  email: string;
  data: string;
  servizio: string;
  messaggio: string;
};

type DeliveryResult = { ok: true } | { ok: false; message: string };

/** Called only by the server action after validation and the preview-mode guard. */
export async function deliverContact(values: ContactMessage): Promise<DeliveryResult> {
  const formId = process.env.FORMSPREE_FORM_ID?.trim();
  if (!formId || !/^[a-z0-9]{6,64}$/i.test(formId)) {
    return { ok: false, message: "L’invio dal modulo non è disponibile. Puoi contattarmi tramite i recapiti indicati qui accanto." };
  }

  try {
    const response = await fetch("https://formspree.io/f/" + formId, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.nome,
        email: values.email,
        data: values.data,
        servizio: values.servizio,
        message: values.messaggio,
        _subject: "Richiesta dal sito Luca Germano: " + values.nome,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (response.status === 429) {
      return { ok: false, message: "In questo momento non riesco a ricevere la richiesta dal modulo. Riprova più tardi oppure scrivimi su WhatsApp o via email." };
    }
    if (!response.ok) {
      return { ok: false, message: "La richiesta non è stata inviata. Riprova oppure contattami tramite i recapiti indicati qui accanto." };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "Non sono riuscito a inviare la richiesta. I campi sono rimasti compilati: puoi riprovare o contattarmi direttamente." };
  }
}
