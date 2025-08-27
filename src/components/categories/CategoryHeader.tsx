import { Category } from '@/types'
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
  Users
} from 'lucide-react'

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

const categoryColors: { [key: string]: string } = {
  'e-commerce': 'bg-blue-500',
  'portfolio': 'bg-purple-500',
  'blog': 'bg-green-500',
  'landing-page': 'bg-orange-500',
  'dashboard': 'bg-red-500',
  'application': 'bg-indigo-500',
  'corporate': 'bg-gray-500',
  'developer': 'bg-yellow-500',
  'photography': 'bg-pink-500',
  'creative': 'bg-teal-500',
  'education': 'bg-cyan-500',
  'community': 'bg-emerald-500',
}

interface CategoryHeaderProps {
  category: Category
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  const Icon = categoryIcons[category.slug] || Palette
  const bgColor = categoryColors[category.slug] || 'bg-gray-500'

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className={`h-24 w-24 ${bgColor} rounded-2xl flex items-center justify-center`}>
              <Icon className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            {category.name}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {category.description}
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-600 text-lg">
                {category.templateCount || 0}
              </span>
              <span>templates disponibles</span>
            </div>
            
            {category.color && (
              <div className="flex items-center gap-2">
                <span>Couleur :</span>
                <div 
                  className="w-6 h-6 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
