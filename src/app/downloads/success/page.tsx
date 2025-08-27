'use client'

import Link from 'next/link'
import { CheckCircle, Download, ArrowRight } from 'lucide-react'

export default function DownloadSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Téléchargement réussi !
        </h1>
        
        <p className="text-gray-600 mb-8">
          Votre template a été téléchargé avec succès. Vous pouvez maintenant commencer à l'utiliser pour votre projet.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/templates"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Voir plus de templates
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
          
          <Link
            href="/dashboard"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Mon tableau de bord
          </Link>
        </div>
      </div>
    </div>
  )
}
