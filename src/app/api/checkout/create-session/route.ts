import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/auth.config'
import { createCheckoutSession } from '@/lib/stripe/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authConfig)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { items, totalAmount } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Panier invalide' },
        { status: 400 }
      )
    }

    // Formater les articles pour Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.template.title,
          description: item.template.shortDescription,
          images: [item.template.thumbnail],
        },
        unit_amount: Math.round((item.template.salePrice || item.template.price) * 100),
      },
      quantity: item.quantity,
    }))

    // Créer la session Stripe
    const stripeSession = await createCheckoutSession(lineItems, {
      userId: session.user.id,
      userEmail: session.user.email,
      totalAmount: totalAmount.toString(),
    })

    // Créer la commande en base de données
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        stripeSessionId: stripeSession.id,
        amount: totalAmount,
        currency: 'EUR',
        status: 'PENDING',
        paymentStatus: 'PENDING',
        orderItems: {
          create: items.map((item: any) => ({
            templateId: item.template.id,
            quantity: item.quantity,
            unitPrice: item.template.salePrice || item.template.price,
            totalPrice: (item.template.salePrice || item.template.price) * item.quantity,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json({
      sessionId: stripeSession.id,
      orderId: order.id,
    })
  } catch (error: any) {
    console.error('Erreur lors de la création de la session de checkout:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
