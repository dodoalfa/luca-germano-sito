import type { Review } from "@/lib/reviews";

/**
 * Testimonianze provvisorie, riprese dal sito attuale (lucagermano.it).
 * Sono estratti: sostituire con il testo completo quando disponibile.
 * Quando GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID sono impostati, il sito
 * mostra al loro posto le recensioni pubbliche di Google.
 */
const uploads = "https://www.lucagermano.it/wp-content/uploads/2021/12";

export const localReviews: Review[] = [
  {
    author: "Andrea e Salma",
    context: "Matrimonio",
    text: "Fotografo molto professionale ma nello stesso tempo informale, simpatico e accogliente.",
    photo: `${uploads}/ERL3299-150x150.jpg`,
  },
  {
    author: "Carmine e Adriana",
    context: "Matrimonio",
    text: "Giornata semplicemente fantastica, Luca ci ha messo subito a nostro agio.",
    photo: `${uploads}/ERL7285-150x150.jpg`,
  },
  {
    author: "Luigi e Loredana",
    context: "Matrimonio",
    text: "Grazie a te ci resterà un ricordo unico di quei giorni fantastici.",
    photo: `${uploads}/IMG_7193-150x150.jpg`,
  },
  {
    author: "Adria B.",
    text: "Disponibile in tutto e per tutto e cerca di assecondarti e accontentarti ad ogni richiesta.",
    photo: `${uploads}/250868187_10221875299291372_1542253709189675780_n-150x150.jpg`,
  },
  {
    author: "Alberto e Carmela",
    context: "Matrimonio",
    text: "Un fotografo formidabile… bravissimo e passionale nel suo lavoro.",
    photo: `${uploads}/L_0702-Modifica-150x150.jpg`,
  },
];
