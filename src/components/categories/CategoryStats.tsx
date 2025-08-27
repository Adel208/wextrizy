import { Category } from '@/types'
import { Star, Download, Eye, Clock } from 'lucide-react'

interface CategoryStatsProps {
  category: Category
  templatesCount: number
}

export default function CategoryStats({ category, templatesCount }: CategoryStatsProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-lg">
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{templatesCount}</div>
            <div className="text-sm text-gray-500">Templates</div>
          </div>
          
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 rounded-lg">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <div className="text-sm text-gray-500">Note moyenne</div>
          </div>
          
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-purple-100 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2.5k+</div>
            <div className="text-sm text-gray-500">Vues</div>
          </div>
          
          <div>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">24h</div>
            <div className="text-sm text-gray-500">Support</div>
          </div>
        </div>
      </div>
    </div>
  )
}
