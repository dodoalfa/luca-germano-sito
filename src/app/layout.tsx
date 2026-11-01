import type { Metadata, Viewport } from "next";
import { Geist, Fraunces } from "next/font/google";

import { ContactSection } from "@/components/contact/contact-section";
import { StudioLight } from "@/components/motion/studio-light";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { getRatingSummary } from "@/lib/reviews";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.title} | Matrimoni, Newborn e Ritratti a Fano`,
    template: `%s | ${site.title}`,
  },
  description: site.description,
  keywords: [
    "fotografo Fano",
    "fotografo matrimonio Marche",
    "fotografo newborn Fano",
    "servizio maternità",
    "reportage matrimonio",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": site.url + "/#attivita",
  name: site.title,
  url: site.url,
  logo: `${site.url}/logo/luca-germano-logo-originale.png`,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: "61032",
    addressRegion: "PU",
    addressCountry: "IT",
  },
  areaServed: ["Fano"],
  hasMap: site.mapsUrl,
  sameAs: [site.social.instagram, site.social.facebook],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const rating = await getRatingSummary();
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${geistSans.variable} ${fraunces.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <a
            href="#contenuto"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
          >
            Vai al contenuto
          </a>
          <StudioLight viewport className="fixed inset-0 z-20 opacity-60 [mask-image:none]" />
          <SiteHeader rating={rating} />
          <main id="contenuto" className="flex flex-1 flex-col">
            {children}
            <ContactSection />
          </main>
          <SiteFooter />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
