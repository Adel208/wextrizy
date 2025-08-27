import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import { authConfig } from '@/lib/auth/auth.config'
import { generateDownloadToken, getGoogleDriveDownloadUrl } from '@/lib/downloads'

// GET /api/downloads - Récupérer l'historique des téléchargements
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    const downloads = await prisma.download.findMany({
      where: { userId: user.id },
      include: {
        template: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true
          }
        },
        license: {
          select: {
            type: true,
            status: true,
            validUntil: true
          }
        }
      },
      orderBy: {
        downloadedAt: 'desc'
      }
    })

    return NextResponse.json(downloads)
  } catch (error) {
    console.error('Error fetching downloads:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des téléchargements' },
      { status: 500 }
    )
  }
}

// POST /api/downloads - Générer un nouveau lien de téléchargement
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { templateId } = body

    if (!templateId) {
      return NextResponse.json(
        { error: 'ID du template manquant' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier que l'utilisateur a une licence active pour ce template
    const license = await prisma.license.findFirst({
      where: {
        userId: user.id,
        templateId: templateId,
        status: 'ACTIVE',
        validUntil: {
          gte: new Date()
        }
      }
    })

    if (!license) {
      return NextResponse.json(
        { error: 'Aucune licence active trouvée pour ce template' },
        { status: 403 }
      )
    }

    // Vérifier les limites de téléchargement
    if (license.maxDownloads !== -1 && license.downloadsCount >= license.maxDownloads) {
      return NextResponse.json(
        { error: 'Limite de téléchargements atteinte pour cette licence' },
        { status: 403 }
      )
    }

    // Récupérer le template
    const template = await prisma.license.findUnique({
      where: { id: license.id },
      include: {
        template: true
      }
    })

    if (!template) {
      return NextResponse.json(
        { error: 'Template non trouvé' },
        { status: 404 }
      )
    }

    // Générer un token de téléchargement unique
    const downloadToken = generateDownloadToken()
    
    // Générer l'URL de téléchargement Google Drive
    const downloadUrl = await getGoogleDriveDownloadUrl(template.template.slug)
    
    // Définir l'expiration (24h)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    // Créer l'enregistrement de téléchargement
    const download = await prisma.download.create({
      data: {
        licenseId: license.id,
        userId: user.id,
        templateId: templateId,
        downloadToken: downloadToken,
        downloadUrl: downloadUrl,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        expiresAt: expiresAt,
        isExpired: false
      }
    })

    // Mettre à jour le compteur de téléchargements de la licence
    await prisma.license.update({
      where: { id: license.id },
      data: {
        downloadsCount: {
          increment: 1
        }
      }
    })

    return NextResponse.json({
      downloadId: download.id,
      downloadToken: downloadToken,
      downloadUrl: downloadUrl,
      expiresAt: expiresAt,
      template: {
        title: template.template.title,
        slug: template.template.slug
      }
    })
  } catch (error) {
    console.error('Error generating download:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération du téléchargement' },
      { status: 500 }
    )
  }
}
