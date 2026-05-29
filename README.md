# TmpDrop — Partage de fichiers temporaires

Service de transfert de fichiers (comme WeTransfer) avec auto-suppression après 24h.

## Architecture

- **Frontend**: Bubble.io (no-code, interface visuelle)
- **Backend**: Supabase (Storage + Database + Edge Functions)
- **Automatisation**: GitHub Actions (nettoyage horaire + backup quotidien)
- **Hébergement**: Bubble (gratuit, sous-domaine `.bubbleapps.io`)

## Structure du projet

```
├── .github/workflows/
│   ├── cleanup-expired.yml   # Nettoie les fichiers expirés chaque heure
│   └── backup.yml            # Backup quotidien de la DB Supabase
├── supabase/
│   ├── migrations/
│   │   └── 001_schema.sql    # Tables + Storage buckets + RLS
│   ├── functions/
│   │   └── cleanup-expired/
│   │       └── index.ts      # Edge Function de nettoyage
│   └── seed/
│       └── seed.sql          # Données de démo (optionnel)
└── README.md
```

## Setup

### 1. Supabase
1. Crée un compte gratuit sur [supabase.com](https://supabase.com)
2. Nouveau projet → note `URL` et `anon key` (Settings → API)
3. Dans **SQL Editor**, exécute `supabase/migrations/001_schema.sql`
4. Dans **Edge Functions**, déploie `supabase/functions/cleanup-expired/index.ts`
5. Récupère la **Function URL** (Edge Functions → cleanup-expired)

### 2. Bubble.io
1. Compte gratuit sur [bubble.io](https://bubble.io)
2. Nouveau projet → **Plugins** → ajoute API Connector
3. Configure les endpoints Supabase (upload, téléchargement, génération de lien)
4. Design : page upload + page téléchargement `/d/[share_id]`

### 3. GitHub Secrets
Configure dans Settings → Secrets and variables → Actions :

| Secret | Valeur |
|--------|--------|
| `SUPABASE_URL` | URL de ton projet Supabase |
| `SUPABASE_ANON_KEY` | Clé anon (publique) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role (privée) |
| `SUPABASE_FUNCTION_URL` | URL de l'Edge Function cleanup |

### 4. Bubble → Supabase connexion

**Upload workflow :**
1. User sélectionne fichier → plugin File Uploader
2. Workflow Bubble : POST vers Supabase Storage
3. Insère row dans table `uploads` avec `share_id` unique
4. Redirige vers `/d/[share_id]`

**Download page `/d/[share_id]` :**
1. GET depuis Supabase pour récupérer les infos fichier
2. Affiche nom, taille, bouton téléchargement
3. (Optionnel) Affiche pub avant téléchargement

## Limites Free Tier Supabase
- 1 Go stockage
- 50 Mo/fichier max
- 5 Go bande passante/mois
- 2 Edge Functions

## Stratégies de monétisation
1. **Publicités** : AdSense sur page de téléchargement
2. **Linkvertise** : lien monétisé avant accès fichier
3. **Freemium** : comptes payants → fichiers >50 Mo, durée >24h
4. **Dons** : Buy Me a Coffee / PayPal
