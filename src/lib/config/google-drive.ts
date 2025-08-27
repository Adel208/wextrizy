/**
 * Configuration Google Drive pour EXTRiZY
 * 
 * INSTRUCTIONS D'INSTALLATION :
 * 
 * 1. Aller sur Google Cloud Console : https://console.cloud.google.com/
 * 2. Créer un nouveau projet ou sélectionner un projet existant
 * 3. Activer l'API Google Drive
 * 4. Créer des identifiants OAuth 2.0
 * 5. Télécharger le fichier JSON des identifiants
 * 6. Configurer les variables d'environnement
 */

export interface GoogleDriveConfig {
  clientId: string
  clientSecret: string
  refreshToken: string
  folderId: string
}

/**
 * Récupère la configuration Google Drive depuis les variables d'environnement
 */
export function getGoogleDriveConfig(): GoogleDriveConfig | null {
  const config = {
    clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID
  }

  // Vérifier que toutes les variables sont définies
  if (!config.clientId || !config.clientSecret || !config.refreshToken || !config.folderId) {
    console.warn(`
⚠️  Configuration Google Drive manquante !

Pour activer les téléchargements, ajoutez ces variables à votre fichier .env :

GOOGLE_DRIVE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_DRIVE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_DRIVE_REFRESH_TOKEN="your-google-refresh-token"
GOOGLE_DRIVE_FOLDER_ID="your-google-drive-folder-id"

📖 Voir la documentation : https://developers.google.com/drive/api/quickstart/nodejs
    `)
    return null
  }

  return config
}

/**
 * Vérifie si la configuration Google Drive est complète
 */
export function isGoogleDriveConfigured(): boolean {
  return getGoogleDriveConfig() !== null
}

/**
 * Structure des dossiers Google Drive recommandée
 */
export const RECOMMENDED_FOLDER_STRUCTURE = {
  root: 'EXTRiZY Templates',
  categories: {
    'e-commerce': 'E-commerce Templates',
    'portfolio': 'Portfolio Templates',
    'blog': 'Blog Templates',
    'landing-page': 'Landing Page Templates',
    'dashboard': 'Dashboard Templates',
    'application': 'Application Templates'
  }
}

/**
 * Mapping des templates vers les IDs de fichiers Google Drive
 * À configurer selon votre structure de dossiers
 */
export const TEMPLATE_FILE_MAPPING: { [key: string]: string } = {
  // E-commerce
  'modern-ecommerce': '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  
  // Portfolio
  'creative-portfolio': '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  
  // Blog
  'tech-blog': '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  
  // Dashboard
  'admin-dashboard': '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  
  // Landing Page
  'startup-landing': '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
}

/**
 * Génère l'URL de téléchargement direct pour un fichier Google Drive
 */
export function generateDirectDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

/**
 * Génère l'URL de visualisation pour un fichier Google Drive
 */
export function generateViewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view`
}

/**
 * Génère l'URL de partage pour un fichier Google Drive
 */
export function generateShareUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
}
