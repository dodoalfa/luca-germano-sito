This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Pubblicazione su Cloudflare

Il sito gira su Cloudflare Workers tramite [OpenNext](https://opennext.js.org/cloudflare).

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | sviluppo locale con Next.js |
| `npm run preview` | build Cloudflare e anteprima locale sul runtime Workers |
| `npm run deploy` | build e pubblicazione in produzione |
| `npm run upload` | build e caricamento di una versione di anteprima |

Collegamento automatico (Workers Builds) dal pannello Cloudflare:

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`
- Non-production branch deploy command: `npx opennextjs-cloudflare upload`

Modulo contatti: predisposto per Formspree con FORMSPREE_FORM_ID, ma disattivato fino alla revisione di Luca. Vedi .env.example e le istruzioni qui sotto.

Foto: metti i file in `public/foto/<categoria>/` e lancia `npm run photos`.

## Progetto attivo e anteprima cliente

Cartella di lavoro: D:\Progetti\luca-germano-portfolio. Le copie precedenti sono conservate in D:\Progetti\_archivio; non vanno usate per nuove modifiche.

Il catalogo contiene solo fotografie reali. Aggiungere immagini in public/foto/<categoria>/ e rigenerare con npm run photos. Le categorie senza immagini non compaiono nei filtri.

Il modulo è una demo: i campi si possono provare, ma l’invio è disattivato nell’interfaccia e sul server. Non attivarlo prima che l’utente confermi la revisione di Luca.
Dopo la revisione:
1. Creare il modulo Formspree dedicato al cliente e configurarne il destinatario.
2. Impostare FORMSPREE_FORM_ID nell’ambiente Cloudflare (e in .env.local/.dev.vars per i test locali).
3. Verificare le impostazioni antispam del modulo; completare l’eventuale CAPTCHA prima dell’attivazione.
4. Portare site.contactForm.enabled a true, ricompilare e pubblicare solo su istruzione dell’utente.
5. Effettuare un invio reale solo con autorizzazione e verificare la ricezione.

Verifiche senza email reali: npm run test:contact.
Build anteprima: npm run build:preview.
Pubblicazione anteprima: npm run deploy:preview.
L’anteprima resta separata dal sito definitivo e non indicizzabile.
