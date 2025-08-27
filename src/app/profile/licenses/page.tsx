'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  FileText, 
  Calendar, 
  Clock, 
  Zap,
  ArrowRight,
  Copy,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Filter,
  Search,
  Star,
  TrendingUp
} from 'lucide-react'

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

interface Download {
  id: string
  downloadedAt: string
  expiresAt: string
  isExpired: boolean
  template: {
    title: string
    slug: string
    thumbnail: string
  }
  license: {
    type: string
    status: string
    validUntil: string
  }
}

export default function UserLicensesPage() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [downloads, setDownloads] = useState<Download[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [licensesResponse, downloadsResponse] = await Promise.all([
        fetch('/api/licenses'),
        fetch('/api/downloads')
      ])

      if (!licensesResponse.ok || !downloadsResponse.ok) {
        throw new Error('Erreur lors de la récupération des données')
      }

      const [licensesData, downloadsData] = await Promise.all([
        licensesResponse.json(),
        downloadsResponse.json()
      ])

      setLicenses(licensesData)
      setDownloads(downloadsData)
    } catch (error) {
      setError('Erreur lors de la récupération des données')
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
      
      // Rafraîchir les données
      fetchData()
      
    } catch (error) {
      setError('Erreur lors de la génération du lien de téléchargement')
      console.error('Error:', error)
    }
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

  const filteredLicenses = licenses.filter(license => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && license.status === 'ACTIVE' && new Date(license.validUntil) > new Date()) ||
      (filter === 'expired' && (license.status !== 'ACTIVE' || new Date(license.validUntil) <= new Date()))
    
    const matchesSearch = license.template.title.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: licenses.length,
    active: licenses.filter(l => l.status === 'ACTIVE' && new Date(l.validUntil) > new Date()).length,
    expired: licenses.filter(l => l.status !== 'ACTIVE' || new Date(l.validUntil) <= new Date()).length,
    totalDownloads: downloads.length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Erreur</h2>
              <p className="text-white/60">{error}</p>
              <button
                onClick={fetchData}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Réessayer
              </button>
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
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium mb-6"
            >
              <FileText className="h-4 w-4 mr-2 text-blue-400" />
              Gestion des Licences
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Vos
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Licences
              </span>
              et Téléchargements
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Gérez vos licences EXTRiZY, téléchargez vos templates et suivez 
              l'historique de vos projets.
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Licences', value: stats.total, icon: FileText, color: 'from-blue-500 to-cyan-500' },
                { label: 'Licences Actives', value: stats.active, icon: Star, color: 'from-green-500 to-emerald-500' },
                { label: 'Licences Expirées', value: stats.expired, icon: Clock, color: 'from-red-500 to-pink-500' },
                { label: 'Téléchargements', value: stats.totalDownloads, icon: Download, color: 'from-purple-500 to-pink-500' }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center"
                  >
                    <div className={`h-12 w-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Rechercher un template..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-white/40" />
                  {['all', 'active', 'expired'].map((filterOption) => (
                    <button
                      key={filterOption}
                      onClick={() => setFilter(filterOption as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        filter === filterOption
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      {filterOption === 'all' ? 'Toutes' : 
                       filterOption === 'active' ? 'Actives' : 'Expirées'}
                    </button>
                  ))}
                </div>

                {/* Refresh Button */}
                <button
                  onClick={fetchData}
                  className="p-3 bg-white/10 rounded-xl text-white/60 hover:bg-white/20 transition-all duration-200"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Licenses Grid */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {filteredLicenses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <FileText className="h-16 w-16 text-white/40 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {searchTerm ? 'Aucun résultat trouvé' : 'Aucune licence trouvée'}
                </h3>
                <p className="text-white/60 mb-8">
                  {searchTerm ? 'Essayez de modifier vos critères de recherche' : 'Commencez par acheter votre premier template EXTRiZY'}
                </p>
                <motion.a
                  href="/templates"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center space-x-2"
                >
                  <span>Explorer les templates</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredLicenses.map((license, index) => {
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
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
