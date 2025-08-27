import crypto from 'crypto'
import { getGoogleDriveConfig, TEMPLATE_FILE_MAPPING, generateDirectDownloadUrl } from './config/google-drive'

/**
 * Génère un token de téléchargement unique et sécurisé
 */
export function generateDownloadToken(): string {
  // Générer un token aléatoire de 32 caractères
  const randomBytes = crypto.randomBytes(16)
  const timestamp = Date.now().toString(36)
  const token = randomBytes.toString('hex') + timestamp
  
  return token
}

/**
 * Vérifie la validité d'un token de téléchargement
 */
export function verifyDownloadToken(token: string): boolean {
  // Vérifications basiques
  if (!token || token.length < 32) {
    return false
  }
  
  // Vérifier le format (hex + timestamp)
  const hexPart = token.slice(0, 32)
  const timestampPart = token.slice(32)
  
  // Vérifier que la partie hex est valide
  if (!/^[0-9a-f]{32}$/.test(hexPart)) {
    return false
  }
  
  // Vérifier que la partie timestamp est valide
  if (!/^[0-9a-z]+$/.test(timestampPart)) {
    return false
  }
  
  return true
}

/**
 * Récupère l'URL de téléchargement d'un template depuis Google Drive
 */
export async function getGoogleDriveDownloadUrl(templateSlug: string): Promise<string | null> {
  try {
    // Vérifier la configuration Google Drive
    const config = getGoogleDriveConfig()
    if (!config) {
      console.warn('Configuration Google Drive manquante')
      return null
    }

    // Récupérer l'ID du fichier depuis le mapping
    const fileId = TEMPLATE_FILE_MAPPING[templateSlug]
    if (!fileId) {
      console.warn(`Aucun fichier Google Drive trouvé pour le template: ${templateSlug}`)
      return null
    }

    // Générer l'URL de téléchargement direct
    const downloadUrl = generateDirectDownloadUrl(fileId)
    
    return downloadUrl

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'URL Google Drive:', error)
    return null
  }
}

/**
 * Crée un lien de partage Google Drive temporaire
 */
export async function createTemporaryShareLink(fileId: string, expiresIn: number = 24): Promise<string | null> {
  try {
    const config = getGoogleDriveConfig()
    if (!config) {
      return null
    }

    // TODO: Implémenter la création de lien de partage via Google Drive API
    // Pour l'instant, retourner un lien direct
    
    const shareUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
    return shareUrl

  } catch (error) {
    console.error('Erreur lors de la création du lien de partage:', error)
    return null
  }
}

/**
 * Vérifie si un fichier Google Drive existe et est accessible
 */
export async function checkFileAccess(fileId: string): Promise<boolean> {
  try {
    // TODO: Implémenter la vérification d'accès via Google Drive API
    // Pour l'instant, retourner true
    
    return true

  } catch (error) {
    console.error('Erreur lors de la vérification d\'accès au fichier:', error)
    return false
  }
}

/**
 * Récupère les métadonnées d'un fichier Google Drive
 */
export async function getFileMetadata(fileId: string): Promise<{
  name: string
  size: number
  mimeType: string
  modifiedTime: string
} | null> {
  try {
    // TODO: Implémenter la récupération des métadonnées via Google Drive API
    // Pour l'instant, retourner des métadonnées fictives
    
    return {
      name: `template-${fileId}.zip`,
      size: 1024 * 1024 * 5, // 5MB
      mimeType: 'application/zip',
      modifiedTime: new Date().toISOString()
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des métadonnées:', error)
    return null
  }
}
