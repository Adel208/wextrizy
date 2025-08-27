'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { useCartStore } from '@/lib/stores/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import { 
  CheckCircle, 
  Download, 
  Mail, 
  ArrowRight,
  Star
} from 'lucide-react'
import Link from 'next/link'

interface OrderDetails {
  id: string
  amount: number
  status: string
  createdAt: string
  orderItems: Array<{
    template: {
      title: string
      thumbnail: string
      downloadUrl: string
    }
    quantity: number
    totalPrice: number
  }>
}

function CheckoutSuccessContent() {
  const { data: session } = useSession()
  const router = useRouter()
  const { clearCart } = useCartStore()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simuler des données de commande pour le build
  useEffect(() => {
    // Vider le panier après un paiement réussi
    clearCart()
    
    // Simuler un chargement
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [clearCart])



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Paiement réussi !
          </h1>
          <p className="text-gray-600 mb-6">
            Votre commande a été traitée avec succès. Vous recevrez bientôt un email de confirmation.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retourner aux templates
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de succès */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Paiement confirmé !
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Merci pour votre achat ! Votre commande a été traitée avec succès et vous pouvez maintenant télécharger vos templates.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Détails de la commande */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Détails de votre commande
              </h2>

              {/* Informations de la commande */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Numéro de commande</p>
                  <p className="font-medium text-gray-900">{orderDetails.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(orderDetails.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <p className="font-medium text-green-600 capitalize">{orderDetails.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-medium text-gray-900">{formatPrice(orderDetails.amount)}</p>
                </div>
              </div>

              {/* Templates achetés */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Templates achetés
                </h3>
                
                {orderDetails.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.template.thumbnail}
                      alt={item.template.title}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.template.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Quantité: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatPrice(item.totalPrice)}
                      </p>
                      {item.template.downloadUrl && (
                        <Link
                          href={item.template.downloadUrl}
                          className="inline-flex items-center mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions et informations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Prochaines étapes
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Download className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Télécharger vos templates</h4>
                    <p className="text-sm text-gray-600">
                      Accédez immédiatement à vos templates achetés.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email de confirmation</h4>
                    <p className="text-sm text-gray-600">
                      Vous recevrez un email avec tous les détails.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Évaluez vos templates</h4>
                    <p className="text-sm text-gray-600">
                      Partagez votre expérience avec la communauté.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/dashboard"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Accéder à mon tableau de bord
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
                
                <Link
                  href="/templates"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
