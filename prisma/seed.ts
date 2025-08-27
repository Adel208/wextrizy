import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding de la base de données...')

  // Créer les catégories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'ecommerce' },
      update: {},
      create: {
        name: 'E-commerce',
        slug: 'ecommerce',
        description: 'Templates pour boutiques en ligne et sites de vente',
        icon: '🛒',
        color: '#3B82F6',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'portfolio' },
      update: {},
      create: {
        name: 'Portfolio',
        slug: 'portfolio',
        description: 'Templates pour présenter vos travaux et compétences',
        icon: '🎨',
        color: '#8B5CF6',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'blog' },
      update: {},
      create: {
        name: 'Blog',
        slug: 'blog',
        description: 'Templates pour blogs et sites de contenu',
        icon: '📝',
        color: '#10B981',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'landing' },
      update: {},
      create: {
        name: 'Landing Page',
        slug: 'landing',
        description: 'Templates pour pages d\'atterrissage et marketing',
        icon: '🚀',
        color: '#F97316',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'dashboard' },
      update: {},
      create: {
        name: 'Dashboard',
        slug: 'dashboard',
        description: 'Templates pour interfaces d\'administration',
        icon: '📊',
        color: '#EF4444',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'app' },
      update: {},
      create: {
        name: 'Application',
        slug: 'app',
        description: 'Templates pour applications web complexes',
        icon: '⚡',
        color: '#6366F1',
      },
    }),
  ])

  console.log('✅ Catégories créées:', categories.length)

  // Créer des templates d'exemple
  const templates = await Promise.all([
    prisma.template.upsert({
      where: { slug: 'modern-ecommerce' },
      update: {},
      create: {
        title: 'Modern E-commerce',
        slug: 'modern-ecommerce',
        description: 'Un template e-commerce moderne et responsive avec toutes les fonctionnalités essentielles pour une boutique en ligne professionnelle.',
        shortDescription: 'Template e-commerce moderne et responsive',
        price: 89.99,
        salePrice: 69.99,
        isOnSale: true,
        isFeatured: true,
        isPopular: true,
        thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        ],
        demoUrl: 'https://demo.templatestore.com/modern-ecommerce',
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        categoryId: categories[0].id,
        fileSize: '2.5 MB',
        version: '2.1.0',
        downloads: 1250,
        rating: 4.8,
        reviewCount: 89,
      },
    }),
    prisma.template.upsert({
      where: { slug: 'creative-portfolio' },
      update: {},
      create: {
        title: 'Creative Portfolio',
        slug: 'creative-portfolio',
        description: 'Portfolio créatif avec animations fluides et design moderne pour artistes, designers et créateurs.',
        shortDescription: 'Portfolio créatif avec animations fluides',
        price: 59.99,
        isOnSale: false,
        isFeatured: true,
        isPopular: false,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        ],
        demoUrl: 'https://demo.templatestore.com/creative-portfolio',
        technologies: ['Vue.js', 'Nuxt.js', 'SCSS', 'GSAP'],
        categoryId: categories[1].id,
        fileSize: '1.8 MB',
        version: '1.5.2',
        downloads: 890,
        rating: 4.6,
        reviewCount: 67,
      },
    }),
    prisma.template.upsert({
      where: { slug: 'tech-blog' },
      update: {},
      create: {
        title: 'Tech Blog',
        slug: 'tech-blog',
        description: 'Blog technique moderne avec système de gestion de contenu intégré et design épuré.',
        shortDescription: 'Blog technique moderne avec CMS intégré',
        price: 39.99,
        salePrice: 29.99,
        isOnSale: true,
        isFeatured: false,
        isPopular: true,
        thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
        ],
        demoUrl: 'https://demo.templatestore.com/tech-blog',
        technologies: ['Gatsby', 'GraphQL', 'Styled Components'],
        categoryId: categories[2].id,
        fileSize: '1.2 MB',
        version: '1.3.0',
        downloads: 2100,
        rating: 4.7,
        reviewCount: 156,
      },
    }),
    prisma.template.upsert({
      where: { slug: 'startup-landing' },
      update: {},
      create: {
        title: 'Startup Landing',
        slug: 'startup-landing',
        description: 'Page d\'atterrissage moderne pour startups avec sections optimisées pour la conversion.',
        shortDescription: 'Landing page moderne pour startups',
        price: 79.99,
        isOnSale: false,
        isFeatured: true,
        isPopular: false,
        thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
        ],
        demoUrl: 'https://demo.templatestore.com/startup-landing',
        technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
        categoryId: categories[3].id,
        fileSize: '2.1 MB',
        version: '2.0.1',
        downloads: 750,
        rating: 4.9,
        reviewCount: 43,
      },
    }),
    prisma.template.upsert({
      where: { slug: 'admin-dashboard' },
      update: {},
      create: {
        title: 'Admin Dashboard',
        slug: 'admin-dashboard',
        description: 'Tableau de bord d\'administration complet avec graphiques, tableaux et gestion des utilisateurs.',
        shortDescription: 'Dashboard d\'administration complet',
        price: 129.99,
        salePrice: 99.99,
        isOnSale: true,
        isFeatured: false,
        isPopular: true,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        ],
        demoUrl: 'https://demo.templatestore.com/admin-dashboard',
        technologies: ['React', 'TypeScript', 'Chart.js', 'Material-UI'],
        categoryId: categories[4].id,
        fileSize: '3.2 MB',
        version: '3.0.0',
        downloads: 420,
        rating: 4.5,
        reviewCount: 28,
      },
    }),
  ])

  console.log('✅ Templates créés:', templates.length)

  // Créer un utilisateur admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@templatestore.com' },
    update: {},
    create: {
      name: 'Admin TemplateStore',
      email: 'admin@templatestore.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQhQhqGm', // password: admin123
      role: 'ADMIN',
    },
  })

  console.log('✅ Utilisateur admin créé:', adminUser.email)

  // Créer un utilisateur test
  const testUser = await prisma.user.upsert({
    where: { email: 'user@templatestore.com' },
    update: {},
    create: {
      name: 'Utilisateur Test',
      email: 'user@templatestore.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQhQhqGm', // password: user123
      role: 'USER',
    },
  })

  console.log('✅ Utilisateur test créé:', testUser.email)

  // Créer quelques avis
  const reviews = await Promise.all([
    prisma.review.upsert({
      where: {
        userId_templateId: {
          userId: testUser.id,
          templateId: templates[0].id,
        },
      },
      update: {},
      create: {
        userId: testUser.id,
        templateId: templates[0].id,
        rating: 5,
        comment: 'Excellent template ! Très facile à personnaliser et le code est propre.',
      },
    }),
    prisma.review.upsert({
      where: {
        userId_templateId: {
          userId: testUser.id,
          templateId: templates[1].id,
        },
      },
      update: {},
      create: {
        userId: testUser.id,
        templateId: templates[1].id,
        rating: 4,
        comment: 'Très beau design, parfait pour mon portfolio.',
      },
    }),
    prisma.review.upsert({
      where: {
        userId_templateId: {
          userId: testUser.id,
          templateId: templates[2].id,
        },
      },
      update: {},
      create: {
        userId: testUser.id,
        templateId: templates[2].id,
        rating: 5,
        comment: 'Parfait pour mon blog tech, je recommande !',
      },
    }),
  ])

  console.log('✅ Avis créés:', reviews.length)

  console.log('🎉 Seeding terminé avec succès !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
