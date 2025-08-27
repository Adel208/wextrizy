import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import { getTemplateBySlug, getRelatedTemplates } from '@/lib/api/templates'
import TemplateGrid from '@/components/templates/TemplateGrid'
import { Star, Download, Eye, Heart, ShoppingCart, Tag, Code, Calendar, FileText } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const template = await getTemplateBySlug(params.slug)
  
  if (!template) {
    return {
      title: 'Template non trouvé - TemplateStore',
    }
  }

  return {
    title: `${template.title} - TemplateStore`,
    description: template.description,
    openGraph: {
      title: template.title,
      description: template.description,
      images: [template.thumbnail || '/api/og'],
    },
  }
}

export default async function TemplatePage({
  params,
}: {
  params: { slug: string }
}) {
  const [template, relatedTemplates] = await Promise.all([
    getTemplateBySlug(params.slug),
    getRelatedTemplates(params.slug),
  ])

  if (!template) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  const renderPrice = () => {
    if (template.isOnSale && template.salePrice) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-red-600">
            {formatPrice(template.salePrice)}
          </span>
          <span className="text-lg text-gray-500 line-through">
            {formatPrice(template.price)}
          </span>
          <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
            -{Math.round(((template.price - template.salePrice) / template.price) * 100)}%
          </span>
        </div>
      )
    }
    return (
      <span className="text-3xl font-bold text-gray-900">
        {formatPrice(template.price)}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Template Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {template.category?.name}
                  </span>
                  {template.isFeatured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Populaire
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {template.title}
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{template.rating}/5</span>
                  <span>({template.reviewCount} avis)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>{template.downloads} téléchargements</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Vue {template.downloads * 10} fois</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Technologies utilisées :</h3>
                <div className="flex flex-wrap gap-2">
                  {template.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <Download className="h-5 w-5 mr-2" />
                  Télécharger maintenant
                </button>
                <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <Eye className="h-5 w-5 mr-2" />
                  Voir la démo
                </button>
                <button className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={template.thumbnail}
                  alt={template.title}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg px-4 py-2">
                <div className="text-center">
                  {renderPrice()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Template Actions (Sticky) */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Eye className="h-4 w-4 mr-2" />
                Démo
              </button>
            </div>
            <div className="text-right">
              {renderPrice()}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Template Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Détails du template</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                  <p className="mt-1 text-sm text-gray-900">{template.category?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Version</label>
                  <p className="mt-1 text-sm text-gray-900">{template.version || '1.0.0'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Taille du fichier</label>
                  <p className="mt-1 text-sm text-gray-900">{template.fileSize || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date de création</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(template.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Template Features */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Fonctionnalités</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-100 text-green-600">
                      <Code className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">Code propre et commenté</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-100 text-blue-600">
                      <Tag className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">Responsive design</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-100 text-purple-600">
                      <FileText className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">Documentation incluse</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-orange-100 text-orange-600">
                      <Calendar className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">Mises à jour gratuites</div>
                </div>
              </div>
            </div>
            
            {/* Template Reviews */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Avis et notes</h2>
              <div className="text-center py-8">
                <Star className="h-16 w-16 text-yellow-400 fill-current mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{template.rating}/5</div>
                <div className="text-gray-600 mb-4">Basé sur {template.reviewCount} avis</div>
                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  Laisser un avis
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center mb-6">
                  {renderPrice()}
                </div>
                <div className="space-y-3">
                  <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Ajouter au panier
                  </button>
                  <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <Heart className="h-5 w-5 mr-2" />
                    Ajouter aux favoris
                  </button>
                  <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <Eye className="h-5 w-5 mr-2" />
                    Voir la démo
                  </button>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span>Garantie :</span>
                      <span className="font-medium text-gray-900">30 jours</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span>Support :</span>
                      <span className="font-medium text-gray-900">Inclus</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Mises à jour :</span>
                      <span className="font-medium text-gray-900">Gratuites</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Templates */}
        {relatedTemplates.length > 0 && (
          <div className="mt-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Templates similaires</h2>
              <p className="mt-2 text-gray-600">Découvrez d'autres templates qui pourraient vous intéresser</p>
            </div>
            <TemplateGrid templates={relatedTemplates} />
          </div>
        )}
      </div>
    </div>
  )
}
