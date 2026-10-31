import { localReviews } from "@/data/recensioni";
import { site } from "@/lib/site";

export type Review = {
  author: string;
  text: string;
  /** Avatar o foto dell'autore (URL assoluto). */
  photo?: string;
  /** 1–5, presente solo per le recensioni Google. */
  rating?: number;
  /** Es. "Matrimonio" oppure "3 mesi fa". */
  context?: string;
  /** Profilo Google dell'autore. */
  authorUrl?: string;
};

export type ReviewsData = {
  source: "google" | "sito";
  reviews: Review[];
  rating?: number;
  total?: number;
  /** Scheda Google di Luca, per "Leggi tutte le recensioni". */
  url?: string;
};

type PlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

/**
 * Recensioni Google tramite Places API (New): restituisce fino a 5 recensioni
 * pubbliche della scheda, senza bisogno di accedere al profilo dell'attività.
 * Vengono lette al momento della build, quindi si aggiornano a ogni deploy.
 */
async function getGoogleReviews(): Promise<ReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=it`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      cache: "force-cache",
    });
    if (!res.ok) {
      console.error(`Places API: ${res.status} ${await res.text()}`);
      return null;
    }
    const place = (await res.json()) as PlaceResponse;
    const reviews: Review[] = (place.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Cliente Google",
        authorUrl: r.authorAttribution?.uri,
        photo: r.authorAttribution?.photoUri,
        rating: r.rating,
        context: r.relativePublishTimeDescription,
        text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
      }))
      .filter((r) => r.text);
    if (!reviews.length) return null;
    return {
      source: "google",
      reviews,
      rating: place.rating,
      total: place.userRatingCount,
      url: place.googleMapsUri,
    };
  } catch (error) {
    console.error("Places API non raggiungibile", error);
    return null;
  }
}

export async function getReviews(): Promise<ReviewsData> {
  return (
    (await getGoogleReviews()) ?? {
      source: "sito",
      reviews: localReviews,
      rating: site.google.rating ?? undefined,
      total: site.google.reviews ?? undefined,
      url: site.google.url ?? (process.env.GOOGLE_REVIEWS_URL || undefined),
    }
  );
}

export type RatingSummary = { rating: number; total?: number; url?: string };

/** Voto medio Google per l'header, se disponibile. */
export async function getRatingSummary(): Promise<RatingSummary | null> {
  const { rating, total, url } = await getReviews();
  return rating ? { rating, total, url } : null;
}
