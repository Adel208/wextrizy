'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Download, Eye, Heart, ShoppingCart, Code, Palette, Smartphone, Globe } from 'lucide-react'
import TemplateCard from './TemplateCard'
import { getTemplates } from '@/lib/api/templates'

interface Template {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  price: number
  salePrice?: number
  isOnSale: boolean
  isFeatured: boolean
  isPopular: boolean
  thumbnail: string
  images: string[]
  demoUrl: string
  downloadUrl: string
  technologies: string[]
  categoryId: string
  fileSize: string
  version: string
  downloads: number
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
  category: {
    id: string
    name: string
    slug: string
  }
  reviews: Array<{
    id: string
    rating: number
    comment: string
    createdAt: string
  }>
}

interface TemplateGridProps {
  initialTemplates?: Template[]
}

export default function TemplateGrid({ initialTemplates = [] }: TemplateGridProps) {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates)
  const [loading, setLoading] = useState(initialTemplates.length === 0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Si on a déjà des templates initiaux, pas besoin de les récupérer
    if (initialTemplates.length > 0) {
      setTemplates(initialTemplates)
      setLoading(false)
      return
    }

    const fetchTemplates = async () => {
      try {
        setLoading(true)
        const data = await getTemplates()
        setTemplates(data)
      } catch (err) {
        setError('Erreur lors du chargement des templates')
        console.error('Error fetching templates:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [initialTemplates])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 animate-pulse"
          >
            <div className="w-full h-48 bg-white/10 rounded-xl mb-4"></div>
            <div className="h-4 bg-white/10 rounded mb-2"></div>
            <div className="h-3 bg-white/10 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-white/10 rounded w-20"></div>
              <div className="h-8 bg-white/10 rounded w-24"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/20 p-8">
          <div className="text-red-400 text-lg font-medium mb-2">
            Erreur de chargement
          </div>
          <p className="text-white/60">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </motion.div>
    )
  }

  if (templates.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <div className="text-white/60 text-lg mb-2">
            Aucun template trouvé
          </div>
          <p className="text-white/40">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {templates.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="group"
        >
          <TemplateCard template={template} />
        </motion.div>
      ))}
    </div>
  )
}
