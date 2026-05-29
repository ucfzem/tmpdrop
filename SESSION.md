# Session — 29 mai 2026

## TmpDrop (ucfzem/tmpdrop)

### Grille de partage sociale (Share Grid)
- Ajout tuiles WhatsApp, Telegram, X, Facebook, LinkedIn, Reddit, TikTok, Autres
- Copie-row avec link box + bouton copier
- Résultat visible dès l'ouverture de la page (class `result show`)
- Succès message "✅ Fichier partagé !" caché initialement, affiché après upload
- Initialisation du lien avec l'URL de l'app (au lieu d'être vide)
- Bouton "Nouvel upload" + upload btn hidden après upload

### SEO
- Ajout `author` (Person schema) dans le JSON-LD WebApplication
- Backlink vers `/liens/` dans le footer (déjà présent)

### CSS
- `justify-content: center` → `flex-start` sur body
- `padding: 2rem 1rem 1rem` sur body

## Liens (ucfzem/liens)

### Grille de partage sociale
- Même grille de partage que TmpDrop (WhatsApp, Telegram, X, Facebook, LinkedIn, Reddit, TikTok, Autres)
- Copy-row avec input + bouton copier
- Native share button (Web Share API)
- Partage l'URL `https://ucfzem.github.io/liens/`

### SEO
- Title : `ucfzem — Coran en ligne, Quran Majeed, Apprendre l'arabe | Islam`
- Meta description enrichie
- Schema `Person` JSON-LD ajouté
- Paragraphe textuel visible sous le bio (contenu indexable)
- `twitter:card` : `summary` → `summary_large_image`
- `sitemap.xml` créé
- Backlink vers Conversations supprimé

### CSS
- `justify-content: center` → `flex-start` sur body
- `padding: 60px 20px 40px` sur body

## Quran Majeed (ucfzem/quran-majeed-v3)
- Backlink vers `/liens/` ajouté dans le footer ("Mes projets")

## Google Search Console
- Sitemap `/liens/sitemap.xml` soumis
- En attente d'indexation (24-48h)
