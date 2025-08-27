# TemplateStore - Marketplace de Templates Web

Une marketplace moderne et professionnelle pour la vente de templates de sites web, construite avec Next.js 14, TypeScript et Tailwind CSS.

## 🚀 Fonctionnalités

### Pour les Utilisateurs
- **Catalogue de Templates** : Parcourir des centaines de templates web professionnels
- **Système de Recherche Avancé** : Filtres par catégorie, prix, technologie, note
- **Détails Complets** : Galeries d'images, spécifications techniques, démos live
- **Système d'Authentification** : Inscription, connexion, gestion de profil
- **Panier d'Achat** : Gestion des commandes et processus de paiement sécurisé
- **Tableau de Bord** : Suivi des achats, téléchargements, favoris
- **Système de Commentaires** : Évaluations et avis sur chaque template

### Pour les Administrateurs
- **Gestion des Templates** : Ajout, modification, suppression de templates
- **Gestion des Utilisateurs** : Administration des comptes et rôles
- **Gestion des Commandes** : Suivi des ventes et statuts
- **Analytics** : Statistiques de vente et performance
- **Gestion des Catégories** : Organisation du catalogue

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique pour la robustesse du code
- **Tailwind CSS** : Framework CSS utilitaire pour un design moderne
- **Framer Motion** : Animations fluides et transitions
- **Lucide React** : Icônes modernes et cohérentes

### Backend
- **Next.js API Routes** : API RESTful intégrée
- **Prisma ORM** : Gestion de base de données type-safe
- **PostgreSQL** : Base de données relationnelle robuste
- **NextAuth.js** : Authentification et gestion des sessions

### Paiements & Services
- **Stripe** : Processus de paiement sécurisé
- **Cloudinary** : Gestion des images et médias
- **Email** : Notifications et communications

## 📁 Structure du Projet

```
template-store/
├── src/
│   ├── app/                    # App Router Next.js
│   │   ├── api/               # API Routes
│   │   ├── auth/              # Pages d'authentification
│   │   ├── dashboard/         # Tableau de bord utilisateur
│   │   ├── admin/             # Interface d'administration
│   │   ├── templates/         # Pages des templates
│   │   ├── checkout/          # Processus de commande
│   │   └── blog/              # Blog et ressources
│   ├── components/            # Composants React réutilisables
│   │   ├── ui/               # Composants d'interface
│   │   ├── layout/           # Composants de mise en page
│   │   ├── forms/            # Formulaires
│   │   ├── templates/        # Composants spécifiques aux templates
│   │   └── common/           # Composants communs
│   ├── lib/                  # Utilitaires et configurations
│   │   ├── auth/             # Configuration NextAuth
│   │   ├── db/               # Configuration Prisma
│   │   ├── utils/            # Fonctions utilitaires
│   │   └── validations/      # Schémas de validation
│   ├── types/                # Types TypeScript
│   ├── hooks/                # Hooks React personnalisés
│   └── contexts/             # Contextes React
├── prisma/                   # Schéma et migrations de base de données
├── public/                   # Assets statiques
└── env.example              # Variables d'environnement
```

## 🚀 Installation et Configuration

### Prérequis
- Node.js 18+ 
- PostgreSQL
- Compte Stripe (pour les paiements)
- Compte Cloudinary (optionnel, pour les images)

### 1. Cloner le projet
```bash
git clone <repository-url>
cd template-store
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
cp env.example .env.local
```

Remplir les variables dans `.env.local` :
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/template_store"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

### 4. Configuration de la base de données
```bash
# Générer le client Prisma
npx prisma generate

# Créer et appliquer les migrations
npx prisma migrate dev

# (Optionnel) Remplir avec des données de test
npx prisma db seed
```

### 5. Lancer le serveur de développement
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🗄️ Base de Données

### Modèles Principaux

#### User
- Informations de profil (nom, email, image)
- Rôle (USER/ADMIN)
- Relations avec les commandes, avis et favoris

#### Template
- Métadonnées (titre, description, prix)
- Images et liens de démo
- Technologies utilisées
- Statistiques (téléchargements, notes)
- Relations avec catégorie, commandes et avis

#### Category
- Nom et description de catégorie
- Couleurs et icônes pour l'interface
- Relations avec les templates

#### Order
- Détails de commande et paiement
- Statut et tokens de téléchargement
- Relations avec utilisateur et template

#### Review
- Évaluations et commentaires
- Relations avec utilisateur et template

## 🔐 Authentification

Le système utilise NextAuth.js avec :
- **Credentials Provider** : Connexion par email/mot de passe
- **Session Management** : Gestion sécurisée des sessions
- **Role-based Access Control** : Différenciation utilisateur/admin
- **Protected Routes** : Protection des pages sensibles

## 💳 Système de Paiement

Intégration Stripe complète :
- **Checkout Sessions** : Processus de commande sécurisé
- **Webhooks** : Gestion des événements de paiement
- **Download Tokens** : Accès sécurisé aux templates achetés
- **Gestion des Erreurs** : Traitement robuste des échecs

## 🎨 Design System

### Palette de Couleurs
- **Primaire** : Bleu (#2563eb)
- **Secondaire** : Violet (#7c3aed)
- **Accent** : Orange (#f97316)
- **Neutre** : Gris (#6b7280)

### Composants
- **Responsive Design** : Mobile-first approach
- **Accessibilité** : Conformité WCAG 2.1
- **Animations** : Transitions fluides avec Framer Motion
- **Dark Mode** : Support du thème sombre (à implémenter)

## 📱 Responsive Design

- **Mobile First** : Design optimisé pour mobile
- **Breakpoints** : sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System** : Layouts adaptatifs avec CSS Grid et Flexbox
- **Touch Friendly** : Interactions optimisées pour tactile

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
vercel --prod
```

### Variables d'environnement de production
- Configurer les URLs de production
- Utiliser des clés Stripe de production
- Configurer la base de données de production

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests E2E
npm run test:e2e

# Couverture de code
npm run test:coverage
```

## 📊 Performance

- **Lazy Loading** : Chargement différé des composants
- **Image Optimization** : Optimisation automatique des images Next.js
- **Code Splitting** : Division automatique du bundle
- **Caching** : Stratégies de cache optimisées

## 🔒 Sécurité

- **CSRF Protection** : Protection contre les attaques CSRF
- **XSS Prevention** : Sanitisation des entrées utilisateur
- **Rate Limiting** : Limitation des requêtes API
- **Input Validation** : Validation côté client et serveur
- **HTTPS** : Chiffrement des communications

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- **Documentation** : [docs.templatestore.com](https://docs.templatestore.com)
- **Email** : support@templatestore.com
- **Discord** : [Rejoindre notre communauté](https://discord.gg/templatestore)

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour le design
- [Prisma](https://www.prisma.io/) pour l'ORM
- [Stripe](https://stripe.com/) pour les paiements
- [Framer Motion](https://www.framer.com/motion/) pour les animations

---

**TemplateStore** - Créez des sites web exceptionnels en quelques clics 🚀

## 🔧 **Problèmes identifiés et solutions :**

### 1. **Turbopack incompatible avec Netlify**
Le flag `--turbopack` dans le script de build peut causer des problèmes. Modifions le `package.json` :

```json:template-store/package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### 2. **Créer un fichier `netlify.toml`**
Créez ce fichier à la racine de votre projet :

```toml:template-store/netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. **Installer le plugin Netlify Next.js**
```bash
<code_block_to_apply_changes_from>
```

### 4. **Créer un fichier `.nvmrc` pour la version Node.js**
```bash
echo "18" > .nvmrc
```

### 5. **Vérifier les variables d'environnement sur Netlify**
Sur Netlify, ajoutez ces variables d'environnement :

```env
NEXTAUTH_SECRET=votre-secret-ici
NEXTAUTH_URL=https://votre-site.netlify.app
DATABASE_URL=votre-url-postgresql
STRIPE_SECRET_KEY=votre-cle-stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=votre-cle-publique-stripe
```

## 🚀 **Étapes pour corriger le déploiement :**

### **Étape 1 : Corriger package.json**
```bash
# Supprimer --turbopack des scripts
sed -i '' 's/--turbopack//g' package.json
```

### **Étape 2 : Installer le plugin Netlify**
```bash
npm install -D @netlify/plugin-nextjs
```

### **Étape 3 : Tester le build localement**
```bash
npm run build
```

### **Étape 4 : Pousser les corrections sur GitHub**
```bash
git add .
git commit -m "🔧 Fix Netlify deployment - Remove Turbopack, add Netlify config"
git push origin main
```

## 📋 **Vérifications sur Netlify :**

1. **Build logs** : Regardez les logs de build pour identifier les erreurs exactes
2. **Node.js version** : Assurez-vous que Netlify utilise Node.js 18+
3. **Variables d'environnement** : Vérifiez que toutes les variables sont configurées
4. **Base de données** : Assurez-vous que votre base PostgreSQL est accessible depuis Netlify

Voulez-vous que je vous aide à appliquer ces corrections étape par étape ?
