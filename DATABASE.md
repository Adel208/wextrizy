# 🗄️ Guide de la Base de Données TemplateStore

Ce document explique comment configurer et gérer la base de données PostgreSQL pour TemplateStore.

## 📋 Prérequis

- **macOS** avec Homebrew installé
- **Node.js** 18+ et npm
- **PostgreSQL** 15+ (sera installé automatiquement)

## 🚀 Configuration Rapide

### 1. Configuration Automatique (Recommandé)

```bash
# Depuis la racine du projet
./scripts/setup-db.sh setup
```

Cette commande va :
- ✅ Installer PostgreSQL si nécessaire
- ✅ Créer la base de données `template_store`
- ✅ Générer le client Prisma
- ✅ Appliquer le schéma de base de données
- ✅ Remplir avec des données d'exemple

### 2. Configuration Manuelle

Si vous préférez configurer étape par étape :

```bash
# 1. Installer PostgreSQL
brew install postgresql@15

# 2. Démarrer le service
brew services start postgresql@15

# 3. Ajouter au PATH
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 4. Créer la base de données
createdb template_store

# 5. Configurer l'environnement
cp env.example .env.local
# Éditer .env.local avec vos paramètres

# 6. Générer le client Prisma
npx prisma generate

# 7. Appliquer le schéma
npx prisma db push

# 8. Remplir avec des données d'exemple
npm run db:seed
```

## 🔧 Commandes Utiles

### Script de Configuration

```bash
# Configuration complète
./scripts/setup-db.sh setup

# Créer seulement la base de données
./scripts/setup-db.sh create

# Générer le client Prisma
./scripts/setup-db.sh generate

# Appliquer le schéma
./scripts/setup-db.sh push

# Exécuter le seed
./scripts/setup-db.sh seed

# Ouvrir Prisma Studio
./scripts/setup-db.sh studio

# Réinitialiser complètement
./scripts/setup-db.sh reset

# Afficher l'aide
./scripts/setup-db.sh help
```

### Commandes NPM

```bash
# Générer le client Prisma
npm run db:generate

# Appliquer le schéma
npm run db:push

# Créer une migration
npm run db:migrate

# Exécuter le seed
npm run db:seed

# Ouvrir Prisma Studio
npm run db:studio
```

### Commandes Prisma Directes

```bash
# Générer le client
npx prisma generate

# Appliquer le schéma
npx prisma db push

# Créer une migration
npx prisma migrate dev

# Ouvrir Prisma Studio
npx prisma studio

# Réinitialiser la base de données
npx prisma migrate reset
```

## 🗃️ Structure de la Base de Données

### Modèles Principaux

#### User
- `id`: Identifiant unique
- `name`: Nom de l'utilisateur
- `email`: Email unique
- `role`: Rôle (USER/ADMIN)
- `createdAt`, `updatedAt`: Timestamps

#### Template
- `id`: Identifiant unique
- `title`: Titre du template
- `slug`: URL unique
- `description`: Description complète
- `price`: Prix en euros
- `technologies`: Array des technologies
- `categoryId`: Référence vers la catégorie
- `downloads`, `rating`, `reviewCount`: Statistiques

#### Category
- `id`: Identifiant unique
- `name`: Nom de la catégorie
- `slug`: URL unique
- `description`: Description de la catégorie
- `color`: Couleur pour l'interface

#### Order
- `id`: Identifiant unique
- `userId`: Référence vers l'utilisateur
- `templateId`: Référence vers le template
- `amount`: Montant de la commande
- `status`: Statut de la commande
- `downloadToken`: Token de téléchargement

#### Review
- `id`: Identifiant unique
- `userId`: Référence vers l'utilisateur
- `templateId`: Référence vers le template
- `rating`: Note (1-5)
- `comment`: Commentaire optionnel

## 🔐 Variables d'Environnement

### Fichier `.env.local`

```env
# Base de données
DATABASE_URL="postgresql://admin@localhost:5432/template_store"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe (optionnel pour le développement)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## 📊 Données d'Exemple

Le script de seed crée automatiquement :

- **6 catégories** : E-commerce, Portfolio, Blog, Landing Page, Dashboard, Application
- **5 templates** : Modern E-commerce, Creative Portfolio, Tech Blog, Startup Landing, Admin Dashboard
- **2 utilisateurs** : Admin et utilisateur test
- **3 avis** : Exemples de commentaires

### Utilisateurs de Test

```bash
# Admin
Email: admin@templatestore.com
Mot de passe: admin123

# Utilisateur
Email: user@templatestore.com
Mot de passe: user123
```

## 🛠️ Dépannage

### Problèmes Courants

#### 1. PostgreSQL non accessible
```bash
# Vérifier le statut
brew services list | grep postgresql

# Redémarrer le service
brew services restart postgresql@15

# Vérifier la connexion
pg_isready -h localhost -p 5432
```

#### 2. Erreur de variables d'environnement
```bash
# Vérifier que .env.local existe
ls -la .env.local

# Charger manuellement les variables
export $(cat .env.local | grep -v '^#' | xargs)
```

#### 3. Erreur de schéma Prisma
```bash
# Régénérer le client
npx prisma generate

# Vérifier la syntaxe du schéma
npx prisma validate
```

#### 4. Base de données verrouillée
```bash
# Arrêter tous les processus
brew services stop postgresql@15

# Redémarrer
brew services start postgresql@15
```

### Logs et Debug

```bash
# Voir les logs PostgreSQL
tail -f /opt/homebrew/var/log/postgresql@15.log

# Voir les logs de l'application
npm run dev 2>&1 | tee app.log

# Tester la connexion à la base
psql -h localhost -U admin -d template_store -c "SELECT version();"
```

## 🔄 Migrations

### Créer une Migration

```bash
# Après modification du schéma
npx prisma migrate dev --name "add_new_field"

# Appliquer en production
npx prisma migrate deploy
```

### Gérer les Migrations

```bash
# Voir l'historique
npx prisma migrate status

# Réinitialiser (⚠️ Supprime toutes les données)
npx prisma migrate reset

# Résoudre les conflits
npx prisma migrate resolve
```

## 📈 Monitoring

### Prisma Studio

Interface graphique pour explorer et modifier les données :

```bash
npx prisma studio
# Ouverture sur http://localhost:5555
```

### Requêtes Utiles

```sql
-- Voir tous les templates
SELECT title, price, downloads FROM templates;

-- Templates les plus populaires
SELECT title, downloads FROM templates ORDER BY downloads DESC LIMIT 10;

-- Statistiques par catégorie
SELECT c.name, COUNT(t.id) as template_count 
FROM categories c 
LEFT JOIN templates t ON c.id = t.categoryId 
GROUP BY c.id, c.name;
```

## 🚀 Production

### Variables d'Environnement de Production

```env
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="very-long-secret-key"
```

### Sécurité

- ✅ Utiliser des mots de passe forts
- ✅ Limiter l'accès réseau à la base
- ✅ Configurer SSL/TLS
- ✅ Faire des sauvegardes régulières
- ✅ Monitorer les performances

---

**💡 Conseil** : Utilisez le script `./scripts/setup-db.sh` pour la plupart des opérations. Il automatise les tâches courantes et évite les erreurs de configuration.
