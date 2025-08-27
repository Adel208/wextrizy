import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getCategoryBySlug, getTemplatesByCategory } from '@/lib/api/templates'
import TemplateGrid from '@/components/templates/TemplateGrid'
import CategoryHeader from '@/components/categories/CategoryHeader'
import CategoryStats from '@/components/categories/CategoryStats'
import CategoryFilters from '@/components/categories/CategoryFilters'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const category = await getCategoryBySlug(params.slug)
  
  if (!category) {
    return {
      title: 'Catégorie non trouvée - TemplateStore',
    }
  }

  return {
    title: `${category.name} - Templates - TemplateStore`,
    description: category.description,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [category, templates] = await Promise.all([
    getCategoryBySlug(params.slug),
    getTemplatesByCategory(params.slug, searchParams),
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <CategoryHeader category={category} />
      
      {/* Category Stats */}
      <CategoryStats category={category} templatesCount={templates.length} />
      
      {/* Filters and Templates */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <CategoryFilters category={category} />
          </div>
          
          {/* Templates Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {templates.length} template{templates.length > 1 ? 's' : ''} dans {category.name}
              </h2>
            </div>
            
            <Suspense fallback={<TemplatesLoading />}>
              <TemplateGrid templates={templates} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function TemplatesLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
          <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
