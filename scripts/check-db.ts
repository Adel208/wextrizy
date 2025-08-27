import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('🔍 Vérification de la base de données...\n')

    // Vérifier les tables
    const users = await prisma.user.findMany()
    const templates = await prisma.template.findMany()
    const categories = await prisma.category.findMany()
    const licenses = await prisma.license.findMany()
    const downloads = await prisma.download.findMany()

    console.log(`👥 Utilisateurs: ${users.length}`)
    users.forEach(user => {
      console.log(`   - ${user.email} (${user.role})`)
    })

    console.log(`\n📦 Templates: ${templates.length}`)
    templates.forEach(template => {
      console.log(`   - ${template.title} (${template.slug})`)
    })

    console.log(`\n🏷️ Catégories: ${categories.length}`)
    categories.forEach(category => {
      console.log(`   - ${category.name} (${category.slug})`)
    })

    console.log(`\n📋 Licences: ${licenses.length}`)
    console.log(`📥 Téléchargements: ${downloads.length}`)

    // Vérifier la structure des tables
    console.log('\n🏗️ Structure des tables:')
    
    if (users.length > 0) {
      const user = users[0]
      console.log(`   User: ${Object.keys(user).join(', ')}`)
    }
    
    if (templates.length > 0) {
      const template = templates[0]
      console.log(`   Template: ${Object.keys(template).join(', ')}`)
    }

    console.log('\n✅ Vérification terminée')

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()
