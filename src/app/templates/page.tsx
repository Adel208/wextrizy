'use client'

import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid3X3, List, Star, Download, Eye } from 'lucide-react'
import TemplateGrid from '@/components/templates/TemplateGrid'
import TemplateSearch from '@/components/templates/TemplateSearch'
import TemplateFilters from '@/components/templates/TemplateFilters'

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

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  templateCount: number
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [templatesResponse, categoriesResponse] = await Promise.all([
          fetch('/api/templates'),
          fetch('/api/categories')
        ])

        if (!templatesResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const [templatesData, categoriesData] = await Promise.all([
          templatesResponse.json(),
          categoriesResponse.json()
        ])

        setTemplates(templatesData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 animate-pulse"
                >
                  <div className="w-full h-48 bg-white/10 rounded-xl mb-4"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-3 bg-white/10 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-white/10 rounded w-20"></div>
                    <div className="h-8 bg-white/10 rounded w-24"></div>
                  </div>
                </div>
              ))}
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
              <Grid3X3 className="h-4 w-4 mr-2 text-blue-400" />
              Collection Premium
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Découvrez nos
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                templates exceptionnels
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Une collection exclusive de templates web modernes, conçus par des experts 
              pour transformer vos projets en sites web professionnels et performants.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-12"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{templates.length}+</div>
                <div className="text-white/60 text-sm">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-white/60 text-sm">Téléchargements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">4.9</div>
                <div className="text-white/60 text-sm">Note moyenne</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                {/* Search */}
                <div className="lg:col-span-2">
                  <TemplateSearch />
                </div>

                {/* View Toggle */}
                <div className="flex items-center justify-center lg:justify-end space-x-2">
                  <span className="text-white/60 text-sm font-medium mr-3">Vue :</span>
                  <button className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200">
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200">
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <TemplateFilters categories={categories} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={
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
            }>
              <TemplateGrid initialTemplates={templates} />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  )
}
