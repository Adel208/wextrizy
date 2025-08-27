import { prisma } from '@/lib/db'
import { Template, Category } from '@/types'

// Fonction utilitaire pour sérialiser les objets Prisma
function serializeTemplate(template: any) {
  return {
    ...template,
    id: template.id,
    price: Number(template.price),
    salePrice: template.salePrice ? Number(template.salePrice) : undefined,
    downloads: Number(template.downloads),
    rating: Number(template.rating),
    reviewCount: Number(template.reviewCount),
    createdAt: template.createdAt.toISOString(),
    updatedAt: template.updatedAt.toISOString(),
    category: {
      id: template.category.id,
      name: template.category.name,
      slug: template.category.slug
    },
    reviews: template.reviews?.map((review: any) => ({
      id: review.id,
      rating: Number(review.rating),
      comment: review.comment,
      createdAt: review.createdAt.toISOString()
    })) || []
  }
}

export async function getTemplates(searchParams: { [key: string]: string | string[] | undefined } = {}) {
  const {
    q: query,
    category,
    price,
    sort = 'newest',
    page = '1',
    limit = '20'
  } = searchParams

  const pageNum = parseInt(page as string) || 1
  const limitNum = parseInt(limit as string) || 20
  const skip = (pageNum - 1) * limitNum

  // Build where clause
  const where: any = {}

  if (query) {
    where.OR = [
      { title: { contains: query as string, mode: 'insensitive' } },
      { description: { contains: query as string, mode: 'insensitive' } },
      { technologies: { has: query as string } }
    ]
  }

  if (category) {
    where.category = { slug: category as string }
  }

  if (price) {
    const [min, max] = (price as string).split('-')
    if (max === '+') {
      where.price = { gte: parseInt(min) }
    } else {
      where.price = { gte: parseInt(min), lte: parseInt(max) }
    }
  }

  // Build orderBy clause
  let orderBy: any = {}
  switch (sort) {
    case 'newest':
      orderBy.createdAt = 'desc'
      break
    case 'oldest':
      orderBy.createdAt = 'asc'
      break
    case 'price-low':
      orderBy.price = 'asc'
      break
    case 'price-high':
      orderBy.price = 'desc'
      break
    case 'popular':
      orderBy.downloads = 'desc'
      break
    case 'rating':
      orderBy.rating = 'desc'
      break
    default:
      orderBy.createdAt = 'desc'
  }

  try {
    const [templates, total] = await Promise.all([
      prisma.template.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
        include: {
          category: true,
          reviews: {
            select: {
              id: true,
              rating: true,
              comment: true,
              createdAt: true
            }
          }
        }
      }),
      prisma.template.count({ where })
    ])

    // Calculate average rating for each template and serialize
    const templatesWithRating = templates.map(template => {
      const rating = template.reviews.length > 0 
        ? template.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / template.reviews.length
        : 0
      
      return serializeTemplate({
        ...template,
        rating,
        reviewCount: template.reviews.length
      })
    })

    return templatesWithRating
  } catch (error) {
    console.error('Error fetching templates:', error)
    return []
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { templates: true }
        }
      }
    })

    return categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      templateCount: category._count.templates
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { templates: true }
        }
      }
    })

    if (!category) return null

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      templateCount: category._count.templates
    }
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export async function getTemplatesByCategory(categorySlug: string, searchParams: { [key: string]: string | string[] | undefined } = {}) {
  const { sort = 'newest', price } = searchParams

  const where: any = {
    category: { slug: categorySlug }
  }

  if (price) {
    const [min, max] = (price as string).split('-')
    if (max === '+') {
      where.price = { gte: parseInt(min) }
    } else {
      where.price = { gte: parseInt(min), lte: parseInt(max) }
    }
  }

  let orderBy: any = {}
  switch (sort) {
    case 'newest':
      orderBy.createdAt = 'desc'
      break
    case 'oldest':
      orderBy.createdAt = 'asc'
      break
    case 'price-low':
      orderBy.price = 'asc'
      break
    case 'price-high':
      orderBy.price = 'desc'
      break
    case 'popular':
      orderBy.downloads = 'desc'
      break
    case 'rating':
      orderBy.rating = 'desc'
      break
    default:
      orderBy.createdAt = 'desc'
  }

  try {
    const templates = await prisma.template.findMany({
      where,
      orderBy,
      include: {
        category: true,
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true
          }
        }
      }
    })

    return templates.map(template => {
      const rating = template.reviews.length > 0 
        ? template.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / template.reviews.length
        : 0
      
      return serializeTemplate({
        ...template,
        rating,
        reviewCount: template.reviews.length
      })
    })
  } catch (error) {
    console.error('Error fetching templates by category:', error)
    return []
  }
}

export async function getTemplateBySlug(slug: string) {
  try {
    const template = await prisma.template.findUnique({
      where: { slug },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!template) return null

    const rating = template.reviews.length > 0 
      ? template.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / template.reviews.length
      : 0

    return serializeTemplate({
      ...template,
      rating,
      reviewCount: template.reviews.length
    })
  } catch (error) {
    console.error('Error fetching template:', error)
    return null
  }
}

export async function getRelatedTemplates(templateSlug: string, limit: number = 4) {
  try {
    const currentTemplate = await prisma.template.findUnique({
      where: { slug: templateSlug },
      select: { categoryId: true, technologies: true }
    })

    if (!currentTemplate) return []

    const relatedTemplates = await prisma.template.findMany({
      where: {
        AND: [
          { slug: { not: templateSlug } },
          {
            OR: [
              { categoryId: currentTemplate.categoryId },
              { technologies: { hasSome: currentTemplate.technologies } }
            ]
          }
        ]
      },
      take: limit,
      include: {
        category: true,
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true
          }
        }
      },
      orderBy: { downloads: 'desc' }
    })

    return relatedTemplates.map(template => {
      const rating = template.reviews.length > 0 
        ? template.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / template.reviews.length
        : 0
      
      return serializeTemplate({
        ...template,
        rating,
        reviewCount: template.reviews.length
      })
    })
  } catch (error) {
    console.error('Error fetching related templates:', error)
    return []
  }
}
