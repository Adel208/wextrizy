#!/bin/bash

# Script de configuration de la base de données TemplateStore
# Usage: ./scripts/setup-db.sh [command]

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ] || [ ! -f "prisma/schema.prisma" ]; then
    print_error "Ce script doit être exécuté depuis la racine du projet TemplateStore"
    exit 1
fi

# Charger les variables d'environnement
if [ -f ".env.local" ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
    print_message "Variables d'environnement chargées depuis .env.local"
else
    print_warning "Fichier .env.local non trouvé. Création d'un fichier d'exemple..."
    cp env.example .env.local
    print_warning "Veuillez configurer .env.local avec vos informations de base de données"
    exit 1
fi

# Fonction pour vérifier PostgreSQL
check_postgres() {
    if ! command -v psql &> /dev/null; then
        print_error "PostgreSQL n'est pas installé ou n'est pas dans le PATH"
        print_message "Installation de PostgreSQL..."
        brew install postgresql@15
        echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc
        source ~/.zshrc
        brew services start postgresql@15
    fi
    
    if ! pg_isready -h localhost -p 5432 &> /dev/null; then
        print_warning "PostgreSQL n'est pas démarré. Démarrage du service..."
        brew services start postgresql@15
        sleep 3
    fi
    
    print_message "PostgreSQL est prêt"
}

# Fonction pour créer la base de données
create_database() {
    print_step "Création de la base de données..."
    
    if createdb template_store 2>/dev/null; then
        print_message "Base de données 'template_store' créée avec succès"
    else
        print_warning "La base de données 'template_store' existe déjà"
    fi
}

# Fonction pour générer le client Prisma
generate_prisma() {
    print_step "Génération du client Prisma..."
    npx prisma generate
    print_message "Client Prisma généré avec succès"
}

# Fonction pour appliquer le schéma
push_schema() {
    print_step "Application du schéma à la base de données..."
    npx prisma db push
    print_message "Schéma appliqué avec succès"
}

# Fonction pour exécuter le seed
run_seed() {
    print_step "Exécution du script de seed..."
    npm run db:seed
    print_message "Seed terminé avec succès"
}

# Fonction pour ouvrir Prisma Studio
open_studio() {
    print_step "Ouverture de Prisma Studio..."
    npx prisma studio --browser none &
    print_message "Prisma Studio ouvert sur http://localhost:5555"
}

# Fonction pour afficher l'aide
show_help() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commandes disponibles:"
    echo "  setup     - Configuration complète de la base de données"
    echo "  create    - Créer la base de données"
    echo "  generate  - Générer le client Prisma"
    echo "  push      - Appliquer le schéma"
    echo "  seed      - Exécuter le script de seed"
    echo "  studio    - Ouvrir Prisma Studio"
    echo "  reset     - Réinitialiser complètement la base de données"
    echo "  help      - Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  $0 setup     # Configuration complète"
    echo "  $0 seed      # Seulement le seed"
    echo "  $0 studio    # Ouvrir Prisma Studio"
}

# Fonction pour réinitialiser la base de données
reset_database() {
    print_warning "Cette action va supprimer et recréer la base de données 'template_store'"
    read -p "Êtes-vous sûr ? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_step "Suppression de la base de données..."
        dropdb template_store 2>/dev/null || true
        
        print_step "Recréation de la base de données..."
        create_database
        
        print_step "Application du schéma..."
        push_schema
        
        print_step "Exécution du seed..."
        run_seed
        
        print_message "Base de données réinitialisée avec succès"
    else
        print_message "Opération annulée"
    fi
}

# Fonction de configuration complète
setup_complete() {
    print_step "Configuration complète de la base de données TemplateStore..."
    
    check_postgres
    create_database
    generate_prisma
    push_schema
    run_seed
    
    print_message "Configuration terminée avec succès !"
    print_message "Vous pouvez maintenant lancer l'application avec: npm run dev"
    print_message "Ou ouvrir Prisma Studio avec: $0 studio"
}

# Gestion des commandes
case "${1:-setup}" in
    "setup")
        setup_complete
        ;;
    "create")
        check_postgres
        create_database
        ;;
    "generate")
        generate_prisma
        ;;
    "push")
        push_schema
        ;;
    "seed")
        run_seed
        ;;
    "studio")
        open_studio
        ;;
    "reset")
        check_postgres
        reset_database
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        print_error "Commande inconnue: $1"
        show_help
        exit 1
        ;;
esac
