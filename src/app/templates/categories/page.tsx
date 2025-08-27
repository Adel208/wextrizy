'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Palette, 
  FileText, 
  Rocket, 
  BarChart3, 
  Smartphone,
  Globe,
  Code,
  Camera,
  Music,
  BookOpen,
  Users,
  Grid3X3,
  ArrowRight,
  Star
} from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  templateCount: number
}

const categoryIcons: { [key: string]: React.ComponentType<any> } = {
  'e-commerce': ShoppingCart,
  'portfolio': Palette,
  'blog': FileText,
  'landing-page': Rocket,
  'dashboard': BarChart3,
  'application': Smartphone,
  'corporate': Globe,
  'developer': Code,
  'photography': Camera,
  'creative': Music,
  'education': BookOpen,
  'community': Users,
}

const categoryGradients: { [key: string]: string } = {
  'e-commerce': 'from-blue-500 to-cyan-500',
  'portfolio': 'from-purple-500 to-pink-500',
  'blog': 'from-green-500 to-emerald-500',
  'landing-page': 'from-orange-500 to-red-500',
  'dashboard': 'from-red-500 to-pink-500',
  'application': 'from-indigo-500 to-purple-500',
  'corporate': 'from-gray-500 to-slate-500',
  'developer': 'from-yellow-500 to-orange-500',
  'photography': 'from-pink-500 to-rose-500',
  'creative': 'from-teal-500 to-cyan-500',
  'education': 'from-cyan-500 to-blue-500',
  'community': 'from-emerald-500 to-green-500',
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 animate-pulse"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl mb-4"></div>
                  <div className="h-6 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded mb-4"></div>
                  <div className="h-4 bg-white/10 rounded w-24"></div>
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
              <Grid3X3 className="h-4 w-4 mr-2 text-purple-400" />
              Explorez par catégorie
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Trouvez le template
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                parfait
              </span>
              pour votre projet
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Naviguez dans nos catégories spécialisées pour découvrir des templates 
              adaptés à vos besoins spécifiques et à votre secteur d'activité.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-12"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{categories.length}</div>
                <div className="text-white/60 text-sm">Catégories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {categories.reduce((acc, cat) => acc + (cat.templateCount || 0), 0)}+
                </div>
                <div className="text-white/60 text-sm">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-white/60 text-sm">Professionnels</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Toutes nos catégories
              </h2>
              <p className="text-white/60 text-lg">
                Choisissez la catégorie qui correspond à votre projet
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const Icon = categoryIcons[category.slug] || Palette
                const gradient = categoryGradients[category.slug] || 'from-gray-500 to-slate-500'
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Link
                      href={`/templates/categories/${category.slug}`}
                      className="block relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 overflow-hidden"
                    >
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold leading-6 text-white group-hover:text-blue-300 transition-colors">
                              {category.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-white/60 text-sm">Premium</span>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                        
                        <p className="text-white/70 text-sm mb-4 leading-relaxed">
                          {category.description || `Templates ${category.name.toLowerCase()} professionnels et modernes`}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 text-sm">
                            <span className="font-semibold text-blue-400">
                              {category.templateCount || 0}
                            </span> templates
                          </span>
                          <span className="text-white/40 text-xs">
                            À partir de €29.99
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Catégories populaires
              </h2>
              <p className="text-white/60 text-lg">
                Les catégories les plus demandées par nos utilisateurs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {categories.slice(0, 4).map((category, index) => {
                const Icon = categoryIcons[category.slug] || Palette
                const gradient = categoryGradients[category.slug] || 'from-gray-500 to-slate-500'
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="group"
                  >
                    <Link
                      href={`/templates/categories/${category.slug}`}
                      className="block relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 overflow-hidden"
                    >
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
                      
                      <div className="relative">
                        <div className="flex items-center gap-6 mb-6">
                          <div className={`h-20 w-20 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                            <Icon className="h-10 w-10 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold leading-7 text-white group-hover:text-blue-300 transition-colors">
                              {category.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              <Star className="h-5 w-5 text-yellow-400 fill-current" />
                              <Star className="h-5 w-5 text-yellow-400 fill-current" />
                              <Star className="h-5 w-5 text-yellow-400 fill-current" />
                              <Star className="h-5 w-5 text-yellow-400 fill-current" />
                              <Star className="h-5 w-5 text-yellow-400 fill-current" />
                              <span className="text-white/60 text-sm ml-2">5.0</span>
                            </div>
                          </div>
                          <ArrowRight className="h-6 w-6 text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                        </div>
                        
                        <p className="text-white/70 text-base mb-6 leading-relaxed">
                          {category.description || `Collection premium de templates ${category.name.toLowerCase()} conçus par des experts`}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 text-sm">
                            <span className="font-bold text-blue-400 text-lg">
                              {category.templateCount || 0}
                            </span> templates disponibles
                          </span>
                          <span className="text-green-400 font-medium text-sm">
                            À partir de €29.99
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
