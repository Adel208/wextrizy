'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { Category } from '@/types'

interface CategoryFiltersProps {
  category: Category
}

export default function CategoryFilters({ category }: CategoryFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const currentPrice = searchParams.get('price')
  const currentSort = searchParams.get('sort')

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/templates/categories/${category.slug}?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push(`/templates/categories/${category.slug}`)
  }

  const hasActiveFilters = currentPrice || currentSort

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filtres</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Tout effacer
          </button>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prix
        </label>
        <select
          value={currentPrice || ''}
          onChange={(e) => updateFilters('price', e.target.value || null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Tous les prix</option>
          <option value="0-50">Moins de €50</option>
          <option value="50-100">€50 - €100</option>
          <option value="100-200">€100 - €200</option>
          <option value="200+">Plus de €200</option>
        </select>
      </div>

      {/* Sort Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Trier par
        </label>
        <select
          value={currentSort || ''}
          onChange={(e) => updateFilters('sort', e.target.value || null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Recommandé</option>
          <option value="newest">Plus récents</option>
          <option value="oldest">Plus anciens</option>
          <option value="price-low">Prix croissant</option>
          <option value="price-high">Prix décroissant</option>
          <option value="popular">Plus populaires</option>
          <option value="rating">Meilleures notes</option>
        </select>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Filtres actifs :</div>
          <div className="flex flex-wrap gap-2">
            {currentPrice && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Prix: {currentPrice}
                <button
                  onClick={() => updateFilters('price', null)}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {currentSort && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Tri: {currentSort}
                <button
                  onClick={() => updateFilters('sort', null)}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Category Info */}
      <div className="pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 mb-2">À propos de cette catégorie</div>
        <p className="text-xs text-gray-500 leading-relaxed">
          {category.description}
        </p>
      </div>
    </div>
  )
}
