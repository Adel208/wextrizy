import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import { authConfig } from '@/lib/auth/auth.config'

// GET /api/licenses - Récupérer les licences de l'utilisateur connecté
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

    const licenses = await prisma.license.findMany({
      where: { 
        userId: user.id,
        status: 'ACTIVE'
      },
      include: {
        template: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            description: true,
            price: true
          }
        },
        order: {
          select: {
            id: true,
            createdAt: true,
            amount: true
          }
        },
        downloads: {
          select: {
            id: true,
            downloadedAt: true,
            expiresAt: true,
            isExpired: true
          },
          orderBy: {
            downloadedAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(licenses)
  } catch (error) {
    console.error('Error fetching licenses:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des licences' },
      { status: 500 }
    )
  }
}

// POST /api/licenses - Créer une nouvelle licence (après achat)
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
    const { templateId, orderId, licenseType } = body

    if (!templateId || !orderId || !licenseType) {
      return NextResponse.json(
        { error: 'Données manquantes' },
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

    // Vérifier que la commande appartient à l'utilisateur
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: user.id,
        status: 'COMPLETED',
        paymentStatus: 'SUCCEEDED'
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Commande invalide ou non payée' },
        { status: 400 }
      )
    }

    // Vérifier que le template existe
    const template = await prisma.template.findUnique({
      where: { id: templateId }
    })

    if (!template) {
      return NextResponse.json(
        { error: 'Template non trouvé' },
        { status: 404 }
      )
    }

    // Configuration des licences selon le type
    const licenseConfig = {
      PERSONAL: {
        maxDownloads: 3,
        downloadLimit: 1,
        validityDays: 365
      },
      COMMERCIAL: {
        maxDownloads: 5,
        downloadLimit: 3,
        validityDays: 730
      },
      ENTERPRISE: {
        maxDownloads: -1, // Illimité
        downloadLimit: -1, // Illimité
        validityDays: 1825
      }
    }

    const config = licenseConfig[licenseType as keyof typeof licenseConfig]
    if (!config) {
      return NextResponse.json(
        { error: 'Type de licence invalide' },
        { status: 400 }
      )
    }

    // Créer la licence
    const license = await prisma.license.create({
      data: {
        userId: user.id,
        templateId: templateId,
        orderId: orderId,
        type: licenseType,
        status: 'ACTIVE',
        maxDownloads: config.maxDownloads,
        downloadLimit: config.downloadLimit,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + config.validityDays * 24 * 60 * 60 * 1000),
        metadata: {
          purchaseMethod: 'stripe',
          originalPrice: template.price.toString(),
          licenseType: licenseType
        }
      },
      include: {
        template: {
          select: {
            title: true,
            slug: true
          }
        }
      }
    })

    return NextResponse.json(license, { status: 201 })
  } catch (error) {
    console.error('Error creating license:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la licence' },
      { status: 500 }
    )
  }
}
