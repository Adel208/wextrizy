import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/auth.config'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authConfig)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { sessionId } = await params

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID manquant' },
        { status: 400 }
      )
    }

    // Récupérer la commande avec tous les détails
    const order = await prisma.order.findUnique({
      where: {
        stripeSessionId: sessionId,
        userId: session.user.id, // Sécurité : l'utilisateur ne peut voir que ses propres commandes
      },
      include: {
        orderItems: {
          include: {
            template: {
              select: {
                id: true,
                title: true,
                thumbnail: true,
                downloadUrl: true,
                description: true,
              },
            },
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Commande introuvable' },
        { status: 404 }
      )
    }

    // Formater la réponse
    const formattedOrder = {
      id: order.id,
      amount: order.amount,
      status: order.status,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      orderItems: order.orderItems.map(item => ({
        template: {
          title: item.template.title,
          thumbnail: item.template.thumbnail,
          downloadUrl: item.template.downloadUrl,
          description: item.template.description,
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
    }

    return NextResponse.json(formattedOrder)
  } catch (error: any) {
    console.error('Erreur lors de la récupération de la commande:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
