import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyDownloadToken } from '@/lib/downloads'

// GET /api/downloads/[token] - Télécharger un fichier avec un token
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params

    if (!token) {
      return NextResponse.json(
        { error: 'Token de téléchargement manquant' },
        { status: 400 }
      )
    }

    // Vérifier et récupérer le téléchargement
    const download = await prisma.download.findUnique({
      where: { downloadToken: token },
      include: {
        template: {
          select: {
            title: true,
            slug: true,
            fileSize: true
          }
        },
        license: {
          select: {
            status: true,
            validUntil: true,
            downloadsCount: true,
            maxDownloads: true
          }
        }
      }
    })

    if (!download) {
      return NextResponse.json(
        { error: 'Token de téléchargement invalide' },
        { status: 404 }
      )
    }

    // Vérifier que le téléchargement n'a pas expiré
    if (download.isExpired || download.expiresAt < new Date()) {
      // Marquer comme expiré
      await prisma.download.update({
        where: { id: download.id },
        data: { isExpired: true }
      })

      return NextResponse.json(
        { error: 'Lien de téléchargement expiré' },
        { status: 410 }
      )
    }

    // Vérifier que la licence est toujours active
    if (download.license.status !== 'ACTIVE' || download.license.validUntil < new Date()) {
      return NextResponse.json(
        { error: 'Licence expirée ou inactive' },
        { status: 403 }
      )
    }

    // Vérifier les limites de téléchargement (si applicable)
    if (download.license.maxDownloads !== -1 && download.license.downloadsCount >= download.license.maxDownloads) {
      return NextResponse.json(
        { error: 'Limite de téléchargements atteinte' },
        { status: 403 }
      )
    }

    // Récupérer l'URL de téléchargement Google Drive
    const downloadUrl = await getGoogleDriveDownloadUrl(download.template.slug)
    
    if (!downloadUrl) {
      return NextResponse.json(
        { error: 'Fichier non disponible' },
        { status: 404 }
      )
    }

    // Marquer le téléchargement comme utilisé
    await prisma.download.update({
      where: { id: download.id },
      data: { isExpired: true }
    })

    // Retourner les informations de téléchargement
    return NextResponse.json({
      template: {
        title: download.template.title,
        slug: download.template.slug,
        fileSize: download.template.fileSize
      },
      downloadUrl: downloadUrl,
      expiresAt: download.expiresAt,
      message: 'Téléchargement autorisé. Utilisez l\'URL fournie pour télécharger le fichier.'
    })

  } catch (error) {
    console.error('Error processing download:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement du téléchargement' },
      { status: 500 }
    )
  }
}

// Fonction pour récupérer l'URL Google Drive (à implémenter)
async function getGoogleDriveDownloadUrl(templateSlug: string): Promise<string | null> {
  // TODO: Implémenter l'intégration Google Drive
  // Pour l'instant, retourner une URL fictive
  return `https://drive.google.com/file/d/${templateSlug}-template/view`
}
