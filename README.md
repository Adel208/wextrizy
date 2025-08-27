# 🚀 EXTRiZY - Plateforme de Templates Web Premium

Une plateforme moderne et élégante pour la vente et le téléchargement de templates web professionnels, construite avec Next.js 15, Prisma, Stripe et Google Drive.

## ✨ Fonctionnalités

### 🎨 Design & Interface
- **Design moderne** avec glassmorphism et animations Framer Motion
- **Interface responsive** optimisée pour tous les appareils
- **Thème sombre élégant** avec gradients dynamiques
- **Animations fluides** et transitions sophistiquées

### 🛒 Système de Vente
- **Intégration Stripe** pour les paiements sécurisés
- **Panier d'achat** avec Zustand pour la gestion d'état
- **Processus de checkout** optimisé et sécurisé
- **Gestion des commandes** complète

### 📥 Système de Téléchargement
- **Intégration Google Drive** pour le stockage des fichiers
- **Licences numériques** avec gestion des droits
- **Système de téléchargement** sécurisé après achat
- **Gestion des versions** et mises à jour

### 🔐 Authentification
- **NextAuth.js v5** pour l'authentification
- **Sessions sécurisées** avec JWT
- **Profils utilisateurs** personnalisables
- **Gestion des rôles** et permissions

### 🗄️ Base de Données
- **Prisma ORM** avec PostgreSQL
- **Schéma optimisé** pour les performances
- **Migrations automatiques** et gestion des versions
- **Relations complexes** entre entités

## 🛠️ Technologies Utilisées

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Animations**: Framer Motion
- **État**: Zustand
- **Base de données**: PostgreSQL avec Prisma
- **Paiements**: Stripe
- **Stockage**: Google Drive API
- **Authentification**: NextAuth.js
- **Déploiement**: Vercel (recommandé)

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- PostgreSQL
- Compte Stripe
- Compte Google Cloud (pour Drive API)

### Étapes d'installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/Adel208/wextrizy.git
cd wextrizy/template-store
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.example .env.local
```

4. **Variables d'environnement requises**
```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/wextrizy"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Google Drive
GOOGLE_DRIVE_CLIENT_ID="your-client-id"
GOOGLE_DRIVE_CLIENT_SECRET="your-client-secret"
GOOGLE_DRIVE_REFRESH_TOKEN="your-refresh-token"
```

5. **Configuration de la base de données**
```bash
npx prisma generate
npx prisma db push
```

6. **Lancer le serveur de développement**
```bash
npm run dev
```

## 📁 Structure du Projet

```
template-store/
├── src/
│   ├── app/                    # App Router Next.js 15
│   │   ├── api/               # Routes API
│   │   ├── auth/              # Pages d'authentification
│   │   ├── dashboard/         # Tableau de bord utilisateur
│   │   ├── templates/         # Pages des templates
│   │   ├── checkout/          # Processus de paiement
│   │   ├── downloads/         # Téléchargements
│   │   └── profile/           # Profil utilisateur
│   ├── components/            # Composants React
│   │   ├── auth/             # Composants d'authentification
│   │   ├── cart/             # Composants du panier
│   │   ├── layout/           # Composants de mise en page
│   │   └── templates/        # Composants des templates
│   ├── lib/                  # Utilitaires et configurations
│   │   ├── auth/            # Configuration NextAuth
│   │   ├── stripe/          # Configuration Stripe
│   │   ├── downloads/       # Utilitaires de téléchargement
│   │   └── stores/          # Stores Zustand
│   └── styles/              # Styles globaux
├── prisma/                   # Schéma et migrations Prisma
├── public/                   # Assets statiques
└── scripts/                  # Scripts utilitaires
```

## 🔧 Configuration

### Base de Données
Le projet utilise Prisma avec PostgreSQL. Le schéma inclut :
- **Users**: Utilisateurs et profils
- **Templates**: Templates disponibles à la vente
- **Categories**: Catégories de templates
- **Orders**: Commandes et paiements
- **Licenses**: Licences numériques
- **Downloads**: Historique des téléchargements

### Stripe
Configuration complète pour :
- Création de sessions de paiement
- Webhooks pour la confirmation
- Gestion des commandes
- Support des devises multiples

### Google Drive
Intégration pour :
- Stockage sécurisé des fichiers
- Génération de liens de téléchargement
- Gestion des permissions
- Synchronisation automatique

## 🎯 Fonctionnalités Principales

### 🏠 Page d'Accueil
- Hero section animée avec particules
- Présentation des fonctionnalités
- Statistiques du site
- Appels à l'action

### 📚 Catalogue de Templates
- Grille responsive des templates
- Filtres par catégorie et technologie
- Recherche avancée
- Tri par popularité, prix, date

### 🛒 Système de Panier
- Ajout/suppression d'articles
- Calcul automatique des totaux
- Persistance des données
- Intégration avec le checkout

### 💳 Processus de Paiement
- Intégration Stripe Checkout
- Gestion des erreurs
- Confirmation de commande
- Redirection vers les téléchargements

### 📥 Gestion des Téléchargements
- Tableau de bord des licences
- Historique des téléchargements
- Accès aux fichiers Google Drive
- Gestion des versions

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connecter le dépôt GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres Plateformes
- **Netlify**: Support complet de Next.js
- **Railway**: Déploiement avec base de données
- **DigitalOcean**: VPS personnalisé

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- **Issues GitHub**: [Créer une issue](https://github.com/Adel208/wextrizy/issues)
- **Documentation**: Consultez le code source et les commentaires
- **Email**: [Votre email]

## 🙏 Remerciements

- **Next.js Team** pour l'excellent framework
- **Vercel** pour l'infrastructure de déploiement
- **Stripe** pour les solutions de paiement
- **Google** pour l'API Drive
- **Communauté open source** pour les packages utilisés

---

**EXTRiZY** - Créez des sites web extraordinaires ! 🚀✨
