import { PrismaClient, LicenseType, LicenseStatus, OrderStatus, PaymentStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function demoInterface() {
  try {
    console.log('🎨 Démonstration de l\'interface utilisateur EXTRiZY...\n')

    // 1. Créer des données de démonstration complètes
    console.log('📊 Création des données de démonstration...')

    // Récupérer l'utilisateur de test
    const user = await prisma.user.findFirst({
      where: { email: 'user@templatestore.com' }
    })

    if (!user) {
      console.log('❌ Utilisateur de test non trouvé')
      return
    }

    // Récupérer plusieurs templates
    const templates = await prisma.template.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    })

    if (templates.length === 0) {
      console.log('❌ Aucun template trouvé')
      return
    }

    console.log(`✅ ${templates.length} templates trouvés`)

    // 2. Créer des commandes de démonstration
    console.log('\n🛒 Création des commandes de démonstration...')
    
    const orders = []
    for (let i = 0; i < templates.length; i++) {
      const template = templates[i]
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          stripeSessionId: `demo-session-${i + 1}`,
          stripePaymentIntentId: `demo-payment-${i + 1}`,
          amount: template.price,
          currency: 'EUR',
          status: OrderStatus.COMPLETED,
          paymentStatus: PaymentStatus.SUCCEEDED
        }
      })
      orders.push(order)
      console.log(`   ✅ Commande ${i + 1} créée: ${order.id} - €${template.price}`)
    }

    // 3. Créer des licences de différents types
    console.log('\n📋 Création des licences de démonstration...')
    
    const licenseTypes = [LicenseType.PERSONAL, LicenseType.COMMERCIAL, LicenseType.ENTERPRISE]
    const licenses = []

    for (let i = 0; i < templates.length; i++) {
      const template = templates[i]
      const order = orders[i]
      const licenseType = licenseTypes[i % licenseTypes.length]

      // Configuration selon le type de licence
      const licenseConfig = {
        PERSONAL: {
          maxDownloads: 3,
          downloadLimit: 1,
          validityDays: 365
        },
        COMMERCIAL: {
          maxDownloads: 5,
          downloadLimit: 3,
          validityDays: 730
        },
        ENTERPRISE: {
          maxDownloads: -1,
          downloadLimit: -1,
          validityDays: 1825
        }
      }

      const config = licenseConfig[licenseType]
      
      const license = await prisma.license.create({
        data: {
          userId: user.id,
          templateId: template.id,
          orderId: order.id,
          type: licenseType,
          status: LicenseStatus.ACTIVE,
          maxDownloads: config.maxDownloads,
          downloadLimit: config.downloadLimit,
          validFrom: new Date(),
          validUntil: new Date(Date.now() + config.validityDays * 24 * 60 * 60 * 1000),
          metadata: {
            purchaseMethod: 'demo',
            notes: `Licence ${licenseType} de démonstration`,
            originalPrice: template.price.toString(),
            demo: true
          }
        }
      })

      licenses.push(license)
      console.log(`   ✅ Licence ${licenseType} créée: ${license.id}`)
      console.log(`      Template: ${template.title}`)
      console.log(`      Téléchargements max: ${config.maxDownloads === -1 ? '∞' : config.maxDownloads}`)
      console.log(`      Valide jusqu'au: ${license.validUntil.toLocaleDateString()}`)
    }

    // 4. Créer des téléchargements de démonstration
    console.log('\n📥 Création des téléchargements de démonstration...')
    
    for (let i = 0; i < licenses.length; i++) {
      const license = licenses[i]
      const template = templates[i]
      
      // Créer 1-3 téléchargements par licence
      const downloadCount = Math.min(license.maxDownloads === -1 ? 3 : license.maxDownloads, 3)
      
      for (let j = 0; j < downloadCount; j++) {
        const download = await prisma.download.create({
          data: {
            licenseId: license.id,
            userId: user.id,
            templateId: template.id,
            downloadToken: `demo-token-${i}-${j}-${Date.now()}`,
            downloadUrl: `https://drive.google.com/file/d/demo-${template.slug}/view`,
            ipAddress: `192.168.1.${i + 1}`,
            userAgent: `Demo Browser ${i + 1}`,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            isExpired: false
          }
        })
        
        console.log(`   ✅ Téléchargement ${j + 1} pour ${template.title}: ${download.id}`)
      }

      // Mettre à jour le compteur de téléchargements
      await prisma.license.update({
        where: { id: license.id },
        data: {
          downloadsCount: downloadCount
        }
      })
    }

    // 5. Afficher le résumé de la démonstration
    console.log('\n🎯 RÉSUMÉ DE LA DÉMONSTRATION')
    console.log('=====================================')
    
    const totalLicenses = await prisma.license.count({
      where: { userId: user.id }
    })
    
    const activeLicenses = await prisma.license.count({
      where: { 
        userId: user.id,
        status: LicenseStatus.ACTIVE,
        validUntil: { gte: new Date() }
      }
    })
    
    const totalDownloads = await prisma.download.count({
      where: { userId: user.id }
    })
    
    const totalOrders = await prisma.order.count({
      where: { userId: user.id }
    })

    console.log(`👤 Utilisateur: ${user.email}`)
    console.log(`📦 Templates disponibles: ${templates.length}`)
    console.log(`📋 Total licences: ${totalLicenses}`)
    console.log(`✅ Licences actives: ${activeLicenses}`)
    console.log(`📥 Total téléchargements: ${totalDownloads}`)
    console.log(`🛒 Total commandes: ${totalOrders}`)

    console.log('\n🌐 PAGES DISPONIBLES POUR TESTER:')
    console.log('=====================================')
    console.log('1. Page de succès post-achat:')
    console.log(`   http://localhost:3000/downloads/success?orderId=${orders[0].id}&templateId=${templates[0].id}`)
    
    console.log('\n2. Dashboard des licences utilisateur:')
    console.log('   http://localhost:3000/profile/licenses')
    
    console.log('\n3. API des licences:')
    console.log('   http://localhost:3000/api/licenses')
    
    console.log('\n4. API des téléchargements:')
    console.log('   http://localhost:3000/api/downloads')

    console.log('\n🎨 FONCTIONNALITÉS DE L\'INTERFACE:')
    console.log('=====================================')
    console.log('✅ Page de succès post-achat avec licences')
    console.log('✅ Dashboard complet des licences utilisateur')
    console.log('✅ Filtres et recherche des licences')
    console.log('✅ Statistiques utilisateur en temps réel')
    console.log('✅ Boutons de téléchargement avec validation')
    console.log('✅ Gestion des types de licence (Personal/Commercial/Enterprise)')
    console.log('✅ Compteurs de téléchargements automatiques')
    console.log('✅ Navigation intégrée dans la navbar')
    console.log('✅ Design "MINIMALISTE & ÉLÉGANT" cohérent')
    console.log('✅ Animations Framer Motion fluides')
    console.log('✅ Responsive design mobile/desktop')

    console.log('\n🚀 PROCHAINES ÉTAPES RECOMMANDÉES:')
    console.log('=====================================')
    console.log('1. Tester l\'interface dans le navigateur')
    console.log('2. Vérifier la responsivité mobile')
    console.log('3. Tester les fonctionnalités de téléchargement')
    console.log('4. Intégrer avec Stripe pour les vrais achats')
    console.log('5. Configurer Google Drive pour les vrais fichiers')

    console.log('\n🎉 Interface utilisateur EXTRiZY prête pour la démonstration !')

  } catch (error) {
    console.error('❌ Erreur lors de la démonstration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter la démonstration
demoInterface()
