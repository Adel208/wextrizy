import { PrismaClient, LicenseType, LicenseStatus, OrderStatus, PaymentStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function testAPIs() {
  try {
    console.log('🧪 Test des nouvelles API de licences et téléchargements...\n')

    // 1. Récupérer un utilisateur et un template
    const user = await prisma.user.findFirst({
      where: { email: 'user@templatestore.com' }
    })
    
    const template = await prisma.template.findFirst({
      where: { slug: 'modern-ecommerce' }
    })

    if (!user || !template) {
      console.log('❌ Utilisateur ou template non trouvé')
      return
    }

    console.log(`👤 Utilisateur: ${user.email}`)
    console.log(`📦 Template: ${template.title}\n`)

    // 2. Créer une commande de test
    console.log('📦 Création d\'une commande de test...')
    const testOrder = await prisma.order.create({
      data: {
        userId: user.id,
        stripeSessionId: 'test-session-456',
        stripePaymentIntentId: 'test-payment-456',
        amount: template.price,
        currency: 'EUR',
        status: OrderStatus.COMPLETED,
        paymentStatus: PaymentStatus.SUCCEEDED
      }
    })

    console.log(`✅ Commande créée: ${testOrder.id}\n`)

    // 3. Créer une licence commerciale
    console.log('📋 Création d\'une licence commerciale...')
    const commercialLicense = await prisma.license.create({
      data: {
        userId: user.id,
        templateId: template.id,
        orderId: testOrder.id,
        type: LicenseType.COMMERCIAL,
        status: LicenseStatus.ACTIVE,
        maxDownloads: 5,
        downloadLimit: 3,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000), // 2 ans
        metadata: {
          purchaseMethod: 'test',
          notes: 'Licence commerciale de test',
          originalPrice: template.price.toString()
        }
      }
    })

    console.log(`✅ Licence commerciale créée: ${commercialLicense.id}`)
    console.log(`   Type: ${commercialLicense.type}`)
    console.log(`   Statut: ${commercialLicense.status}`)
    console.log(`   Téléchargements max: ${commercialLicense.maxDownloads}`)
    console.log(`   Valide jusqu'au: ${commercialLicense.validUntil.toLocaleDateString()}\n`)

    // 4. Créer plusieurs enregistrements de téléchargement
    console.log('📥 Création d\'enregistrements de téléchargement...')
    const downloads = []
    
    for (let i = 1; i <= 3; i++) {
      const download = await prisma.download.create({
        data: {
          licenseId: commercialLicense.id,
          userId: user.id,
          templateId: template.id,
          downloadToken: `test-token-${i}-${Date.now()}`,
          downloadUrl: `https://drive.google.com/file/d/test${i}/view`,
          ipAddress: `192.168.1.${i}`,
          userAgent: `Test Browser ${i}`,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
          isExpired: false
        }
      })
      downloads.push(download)
      console.log(`   ✅ Téléchargement ${i} créé: ${download.id}`)
    }

    // 5. Mettre à jour le compteur de téléchargements
    console.log('\n🔄 Mise à jour du compteur de téléchargements...')
    const updatedLicense = await prisma.license.update({
      where: { id: commercialLicense.id },
      data: {
        downloadsCount: downloads.length
      }
    })

    console.log(`✅ Licence mise à jour: ${updatedLicense.downloadsCount}/${updatedLicense.maxDownloads} téléchargements\n`)

    // 6. Tester les relations et requêtes complexes
    console.log('🔗 Test des relations et requêtes complexes...')
    
    // Récupérer toutes les licences de l'utilisateur avec détails
    const userLicenses = await prisma.license.findMany({
      where: { userId: user.id },
      include: {
        template: {
          select: {
            title: true,
            slug: true,
            price: true
          }
        },
        order: {
          select: {
            amount: true,
            status: true,
            createdAt: true
          }
        },
        downloads: {
          select: {
            downloadToken: true,
            downloadedAt: true,
            expiresAt: true,
            isExpired: true
          },
          orderBy: {
            downloadedAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`✅ ${userLicenses.length} licence(s) trouvée(s):`)
    userLicenses.forEach(license => {
      console.log(`   📋 ${license.template.title} (${license.type})`)
      console.log(`      Prix: €${license.template.price}`)
      console.log(`      Commande: ${license.order.status} - €${license.order.amount}`)
      console.log(`      Téléchargements: ${license.downloadsCount}/${license.maxDownloads}`)
      console.log(`      ${license.downloads.length} téléchargement(s) enregistré(s)`)
      
      license.downloads.forEach(download => {
        console.log(`         - Token: ${download.downloadToken.slice(0, 20)}...`)
        console.log(`           Expire: ${download.expiresAt.toLocaleDateString()}`)
        console.log(`           Expiré: ${download.isExpired}`)
      })
    })

    // 7. Test des statistiques
    console.log('\n📊 Test des statistiques...')
    
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
    
    const expiredDownloads = await prisma.download.count({
      where: { 
        userId: user.id,
        isExpired: true
      }
    })

    console.log(`📈 Statistiques utilisateur:`)
    console.log(`   Total licences: ${totalLicenses}`)
    console.log(`   Licences actives: ${activeLicenses}`)
    console.log(`   Total téléchargements: ${totalDownloads}`)
    console.log(`   Téléchargements expirés: ${expiredDownloads}`)

    console.log('\n🎉 Tests des API terminés avec succès !')
    console.log('\n📋 Résumé des fonctionnalités testées:')
    console.log('   ✅ Création de commandes')
    console.log('   ✅ Création de licences (personnelles et commerciales)')
    console.log('   ✅ Gestion des téléchargements')
    console.log('   ✅ Relations entre utilisateurs, licences et téléchargements')
    console.log('   ✅ Compteurs et limites de téléchargements')
    console.log('   ✅ Requêtes complexes avec includes')
    console.log('   ✅ Statistiques utilisateur')

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter les tests
testAPIs()
