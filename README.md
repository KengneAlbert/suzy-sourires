# Suzy Sourires

Application web pour **Suzy Sourires** — Soins dentaires esthétiques à domicile en Île-de-France.

## Stack technique

- **Framework** : [Next.js 14](https://nextjs.org/) (App Router)
- **UI** : React 18, Tailwind CSS 3.4, Lucide Icons
- **Backend** : [Supabase](https://supabase.com/) (Auth, PostgreSQL, Storage)
- **Langage** : TypeScript 5.5

## Démarrage rapide

### Prérequis

- Node.js 18+ et npm
- Un projet [Supabase](https://supabase.com/) configuré

### Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd suzy-sourires

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
```

Remplissez `.env.local` avec vos identifiants Supabase :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_publique
```

### Base de données

Exécutez les migrations SQL dans l'ordre depuis le SQL Editor de Supabase :

```
supabase/migrations/20251029140935_create_products_table.sql
supabase/migrations/20251030215823_add_product_images_array.sql
supabase/migrations/20251210000000_secure_admin_policies.sql
supabase/migrations/20260103000000_init_admin_users.sql
supabase/migrations/20260104_create_allowed_signup_emails.sql
supabase/migrations/20260104000000_create_product_images_bucket.sql
supabase/migrations/20260105000000_fix_admin_rls_policies.sql
```

Puis ajoutez votre premier administrateur :

```sql
INSERT INTO admin_users (email) VALUES ('votre-email@example.com');
```

### Lancement

```bash
npm run dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande            | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Serveur de développement |
| `npm run build`     | Build de production      |
| `npm start`         | Serveur de production    |
| `npm run lint`      | Vérification ESLint      |
| `npm run typecheck` | Vérification TypeScript  |

## Architecture

```
src/
├── app/                    # Pages et layouts (App Router)
│   ├── layout.tsx          # Layout racine (Auth, SEO, fonts)
│   ├── page.tsx            # Page d'accueil
│   ├── not-found.tsx       # Page 404
│   ├── error.tsx           # Gestion d'erreurs
│   ├── globals.css         # Styles globaux
│   ├── produit/[id]/       # Page produit (SSR + SEO)
│   │   ├── page.tsx        # Données serveur + metadata
│   │   └── ProductDetailClient.tsx
│   ├── admin/              # Espace d'administration
│   │   ├── layout.tsx      # Layout admin (auth check, session timeout)
│   │   ├── page.tsx        # Dashboard admin
│   │   └── login/page.tsx  # Page de connexion
├── components/             # Composants réutilisables
├── hooks/                  # Hooks personnalisés
│   ├── useAuth.tsx         # Context d'authentification (AuthProvider)
│   ├── useSessionTimeout.ts
│   ├── useProductsAdmin.ts # CRUD produits
│   ├── useImageUpload.ts   # Upload d'images Supabase Storage
│   └── useAnalytics.ts
├── lib/                    # Utilitaires
│   ├── constants.ts        # Constantes centralisées
│   ├── supabase-browser.ts # Client Supabase (navigateur)
│   ├── supabase-server.ts  # Client Supabase (serveur/SSR)
│   └── whatsapp.ts         # Liens WhatsApp
├── types/                  # Types TypeScript
│   └── product.ts
└── middleware.ts            # Middleware auth pour /admin
```

## Fonctionnalités

### Site public

- Page d'accueil avec sections : services, processus, produits, galerie avant/après, philosophie, à propos, zone de couverture, FAQ, contact
- Pages produits individuelles avec SSR et SEO optimisé (OpenGraph, données structurées)
- Design responsive (mobile-first)
- Contact via WhatsApp

### Administration

- Authentification par email/mot de passe via Supabase Auth
- Gestion des produits (CRUD complet avec upload d'images)
- Gestion des administrateurs (whitelist)
- Gestion des emails autorisés à s'inscrire
- Timeout de session avec avertissement (15 minutes d'inactivité)
- Protection des routes via middleware

### Sécurité

- Row Level Security (RLS) sur toutes les tables Supabase
- Headers de sécurité (X-Frame-Options, HSTS, X-Content-Type-Options)
- Middleware de vérification d'authentification
- Validation des emails autorisés à l'inscription

## Déploiement

Le projet est optimisé pour un déploiement sur [Vercel](https://vercel.com/) :

1. Connectez votre repo GitHub à Vercel
2. Ajoutez les variables d'environnement (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. Déployez

## Licence

Projet privé — Tous droits réservés.
