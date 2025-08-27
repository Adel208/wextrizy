import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Sérialiser les données pour le client
    const serializedTemplates = templates.map(template => ({
      id: template.id,
      title: template.title,
      slug: template.slug,
      description: template.description,
      shortDescription: template.shortDescription,
      price: Number(template.price),
      salePrice: template.salePrice ? Number(template.salePrice) : undefined,
      isOnSale: template.isOnSale,
      isFeatured: template.isFeatured,
      isPopular: template.isPopular,
      thumbnail: template.thumbnail,
      images: template.images,
      demoUrl: template.demoUrl,
      downloadUrl: template.downloadUrl,
      technologies: template.technologies,
      categoryId: template.categoryId,
      fileSize: template.fileSize,
      version: template.version,
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
      reviews: template.reviews.map(review => ({
        id: review.id,
        rating: Number(review.rating),
        comment: review.comment,
        createdAt: review.createdAt.toISOString()
      }))
    }))

    return NextResponse.json(serializedTemplates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}
