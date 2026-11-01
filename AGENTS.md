<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cartella di lavoro e collaborazione

- Unica cartella attiva: D:\Progetti\luca-germano-portfolio.
- D:\luca-germano-sito non è più una copia di lavoro: contiene residui bloccati da Windows, con un avviso di trasferimento. Non modificarli e non copiarli sopra il progetto attivo.
- Le copie precedenti sono conservate in D:\Progetti\_archivio. Non usarle per nuove modifiche.
- Rileggere ogni file prima di modificarlo; fare interventi mirati e aggiornare il registro qui sotto.

## Decisioni dell’utente

- Il sito deve restare in anteprima finché Luca non lo ha visionato.
- Servizio scelto per i moduli: Formspree. Non creare account, non chiedere riscontri al cliente e non attivare invii reali in questa fase.
- site.contactForm.enabled in src/lib/site.ts resta false. Il blocco è applicato sia al pulsante sia all’azione server.
- FORMSPREE_FORM_ID resta vuoto; sarà configurato dopo la revisione e su istruzione dell’utente.
- Nessuna email di prova a destinatari reali: i test usano risposte simulate.
- Usare soltanto fotografie reali. I 28 segnaposto iniziali sono archiviati fuori da public; le categorie senza foto non appaiono nei filtri del portfolio.
- L’anteprima usa wrangler.preview.jsonc e scripts/preview-worker.mjs; mantenere noindex e robots Disallow. Non sostituire il sito sul dominio lucagermano.it senza istruzioni.
- Tenere generico il riferimento alla formazione, senza citare scuole o incarichi attuali non confermati.

## Registro modifiche

| Data | Agente | File | Cosa |
|---|---|---|---|
| 2026-11-01 | Codex | Progetto consolidato; catalogo foto, portfolio, moduli, configurazione anteprima | Recuperate le foto uniche dalle due copie, archiviati i segnaposto, predisposto Formspree con invio disattivato e percorso unico di lavoro. |
| 2026-11-01 | Codex | tests/contact.test.mjs; scripts/preview-worker.mjs; wrangler.preview.jsonc; documentazione | Passati 11 test simulati e controlli online sulle 12 pagine. Pubblicata la stessa anteprima con 29 foto reali e modulo esplicitamente inattivo; nessun invio reale. Residui della vecchia posizione conservati con avviso perché bloccati da Windows. |
