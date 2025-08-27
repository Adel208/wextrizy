'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, X, ChevronDown, Check } from 'lucide-react'
import { getCategories } from '@/lib/api/templates'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  templateCount: number
}

interface TemplateFiltersProps {
  categories?: Category[]
  onFiltersChange?: (filters: any) => void
}

export default function TemplateFilters({ categories: initialCategories = [], onFiltersChange }: TemplateFiltersProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [loading, setLoading] = useState(initialCategories.length === 0)
  const [expanded, setExpanded] = useState(false)
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('newest')

  const technologies = [
    'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte',
    'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS',
    'Bootstrap', 'Node.js', 'PHP', 'Python', 'WordPress'
  ]

  useEffect(() => {
    // Si on a déjà des catégories initiales, pas besoin de les récupérer
    if (initialCategories.length > 0) {
      setCategories(initialCategories)
      setLoading(false)
      return
    }

    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        console.error('Error fetching categories:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [initialCategories])

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange({
        category: selectedCategory,
        priceRange,
        technologies: selectedTechnologies,
        sortBy
      })
    }
  }, [selectedCategory, priceRange, selectedTechnologies, sortBy, onFiltersChange])

  const clearFilters = () => {
    setSelectedCategory('')
    setPriceRange([0, 1000])
    setSelectedTechnologies([])
    setSortBy('newest')
  }

  const hasActiveFilters = selectedCategory || 
    priceRange[0] > 0 || 
    priceRange[1] < 1000 || 
    selectedTechnologies.length > 0 || 
    sortBy !== 'newest'

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-white/60" />
            <span className="text-white/80 font-medium">Filtres</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 bg-white/10 rounded animate-pulse"></div>
              <div className="h-10 bg-white/10 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-white/60" />
          <span className="text-white/80 font-medium">Filtres</span>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Effacer</span>
          </button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white/80">Catégorie</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name} ({category.templateCount})
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white/80">Prix</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              placeholder="Min"
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            />
            <span className="text-white/40">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              placeholder="Max"
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Sort Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white/80">Trier par</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
          >
            <option value="newest">Plus récents</option>
            <option value="oldest">Plus anciens</option>
            <option value="price-low">Prix croissant</option>
            <option value="price-high">Prix décroissant</option>
            <option value="rating">Meilleures notes</option>
            <option value="popularity">Popularité</option>
          </select>
        </div>

        {/* Technologies Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-white/80">Technologies</label>
          <div className="relative">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 flex items-center justify-between"
            >
              <span className={selectedTechnologies.length > 0 ? 'text-white' : 'text-white/40'}>
                {selectedTechnologies.length > 0 
                  ? `${selectedTechnologies.length} sélectionné(s)`
                  : 'Sélectionner...'
                }
              </span>
              <ChevronDown className={`h-4 w-4 text-white/40 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
            </button>

            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 z-10 max-h-48 overflow-y-auto"
              >
                <div className="space-y-2">
                  {technologies.map((tech) => (
                    <label key={tech} className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 rounded px-2 py-1 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedTechnologies.includes(tech)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTechnologies([...selectedTechnologies, tech])
                          } else {
                            setSelectedTechnologies(selectedTechnologies.filter(t => t !== tech))
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500/50 focus:ring-2"
                      />
                      <span className="text-sm text-white/80">{tech}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-wrap gap-2 pt-4 border-t border-white/10"
        >
          {selectedCategory && (
            <span className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              Catégorie: {categories.find(c => c.slug === selectedCategory)?.name}
              <button
                onClick={() => setSelectedCategory('')}
                className="ml-2 hover:text-blue-200 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {(priceRange[0] > 0 || priceRange[1] < 1000) && (
            <span className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
              Prix: €{priceRange[0]} - €{priceRange[1]}
              <button
                onClick={() => setPriceRange([0, 1000])}
                className="ml-2 hover:text-green-200 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {selectedTechnologies.map((tech) => (
            <span key={tech} className="inline-flex items-center px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
              {tech}
              <button
                onClick={() => setSelectedTechnologies(selectedTechnologies.filter(t => t !== tech))}
                className="ml-2 hover:text-purple-200 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </motion.div>
      )}
    </div>
  )
}
