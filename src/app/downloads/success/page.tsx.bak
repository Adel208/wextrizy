'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  CheckCircle, 
  FileText, 
  Calendar, 
  Clock, 
  Zap,
  ArrowRight,
  Copy,
  ExternalLink,
  AlertCircle
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface License {
  id: string
  type: 'PERSONAL' | 'COMMERCIAL' | 'ENTERPRISE'
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'REVOKED'
  downloadsCount: number
  maxDownloads: number
  downloadLimit: number
  validFrom: string
  validUntil: string
  template: {
    id: string
    title: string
    slug: string
    thumbnail: string
    description: string
    price: number
  }
  order: {
    id: string
    amount: number
    createdAt: string
  }
}

export default function DownloadSuccessPage() {
  const searchParams = useSearchParams()
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  const orderId = searchParams.get('orderId')
  const templateId = searchParams.get('templateId')

  useEffect(() => {
    if (orderId && templateId) {
      fetchLicenses()
    } else {
      // Si pas de paramètres, récupérer toutes les licences actives
      fetchAllLicenses()
    }
  }, [orderId, templateId])

  const fetchLicenses = async () => {
    try {
      const response = await fetch('/api/licenses')
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des licences')
      }
      const data = await response.json()
      
      // Filtrer les licences de la commande spécifique
      const orderLicenses = data.filter((license: License) => 
        license.order.id === orderId
      )
      
      setLicenses(orderLicenses)
    } catch (error) {
      setError('Erreur lors de la récupération des licences')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllLicenses = async () => {
    try {
      const response = await fetch('/api/licenses')
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des licences')
      }
      const data = await response.json()
      setLicenses(data)
    } catch (error) {
      setError('Erreur lors de la récupération des licences')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateDownloadLink = async (templateId: string) => {
    try {
      const response = await fetch('/api/downloads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ templateId }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du lien')
      }

      const data = await response.json()
      
      // Ouvrir le lien de téléchargement dans un nouvel onglet
      window.open(data.downloadUrl, '_blank')
      
      // Rafraîchir les licences pour mettre à jour les compteurs
      fetchAllLicenses()
      
    } catch (error) {
      setError('Erreur lors de la génération du lien de téléchargement')
      console.error('Error:', error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedToken(text)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const getLicenseTypeInfo = (type: string) => {
    const types = {
      PERSONAL: { name: 'Personnelle', color: 'from-blue-500 to-cyan-500', description: 'Usage personnel uniquement' },
      COMMERCIAL: { name: 'Commerciale', color: 'from-purple-500 to-pink-500', description: 'Usage commercial limité' },
      ENTERPRISE: { name: 'Entreprise', color: 'from-orange-500 to-red-500', description: 'Usage commercial illimité' }
    }
    return types[type as keyof typeof types] || types.PERSONAL
  }

  const getStatusColor = (status: string) => {
    const colors = {
      ACTIVE: 'text-green-400',
      EXPIRED: 'text-red-400',
      SUSPENDED: 'text-yellow-400',
      REVOKED: 'text-gray-400'
    }
    return colors[status as keyof typeof colors] || colors.ACTIVE
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-white">Chargement en cours...</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Erreur</h2>
              <p className="text-white/60">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header avec padding pour la navbar fixe */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Achat réussi !
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/70 mb-12 max-w-2xl mx-auto"
            >
              Vos licences sont maintenant actives. Téléchargez vos templates 
              et commencez à créer votre projet web !
            </motion.p>
          </div>
        </section>

        {/* Licenses Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Vos Licences Actives
              </h2>
              <p className="text-white/60 text-lg">
                {licenses.length} licence(s) disponible(s) pour téléchargement
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {licenses.map((license, index) => {
                const typeInfo = getLicenseTypeInfo(license.type)
                const isDownloadable = license.status === 'ACTIVE' && 
                  new Date(license.validUntil) > new Date() &&
                  (license.maxDownloads === -1 || license.downloadsCount < license.maxDownloads)

                return (
                  <motion.div
                    key={license.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                    className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`h-16 w-16 bg-gradient-to-br ${typeInfo.color} rounded-2xl flex items-center justify-center`}>
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{license.template.title}</h3>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${typeInfo.color} text-white`}>
                            {typeInfo.name}
                          </div>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${getStatusColor(license.status)}`}>
                        {license.status}
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 text-white/60 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>Acheté le {new Date(license.order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60 mb-2">
                        <Clock className="h-4 w-4" />
                        <span>Valide jusqu'au {new Date(license.validUntil).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60">
                        <Download className="h-4 w-4" />
                        <span>{license.downloadsCount}/{license.maxDownloads === -1 ? '∞' : license.maxDownloads} téléchargements</span>
                      </div>
                    </div>

                    {/* Download Button */}
                    <div className="space-y-4">
                      {isDownloadable ? (
                        <motion.button
                          onClick={() => generateDownloadLink(license.template.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Download className="h-5 w-5" />
                          <span>Télécharger le template</span>
                          <ArrowRight className="h-5 w-5" />
                        </motion.button>
                      ) : (
                        <div className="w-full px-6 py-4 bg-white/10 text-white/60 rounded-xl font-semibold text-lg text-center">
                          {license.status !== 'ACTIVE' ? 'Licence inactive' : 
                           license.maxDownloads !== -1 && license.downloadsCount >= license.maxDownloads ? 'Limite de téléchargements atteinte' :
                           'Licence expirée'}
                        </div>
                      )}

                      {/* License Details */}
                      <div className="bg-white/5 rounded-2xl p-4">
                        <h4 className="text-sm font-semibold text-white/80 mb-3">Détails de la licence</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/60">Type:</span>
                            <span className="text-white">{typeInfo.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Prix:</span>
                            <span className="text-white">€{license.order.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Projets autorisés:</span>
                            <span className="text-white">{license.downloadLimit === -1 ? '∞' : license.downloadLimit}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center mt-16"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Besoin d'aide ?
                </h3>
                <p className="text-white/60 mb-6">
                  Notre équipe support est là pour vous accompagner dans l'utilisation de vos templates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Contacter le support</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                  <motion.a
                    href="/templates"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Explorer plus de templates</span>
                    <Zap className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
