import { PrismaClient, LicenseType, LicenseStatus, OrderStatus, PaymentStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function testLicenses() {
  try {
    console.log('🧪 Test des nouvelles tables de licences...\n')

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
        stripeSessionId: 'test-session-123',
        stripePaymentIntentId: 'test-payment-123',
        amount: template.price,
        currency: 'EUR',
        status: OrderStatus.COMPLETED,
        paymentStatus: PaymentStatus.SUCCEEDED
      }
    })

    console.log(`✅ Commande créée: ${testOrder.id}\n`)

    // 3. Créer une licence personnelle
    console.log('📋 Création d\'une licence personnelle...')
    const personalLicense = await prisma.license.create({
      data: {
        userId: user.id,
        templateId: template.id,
        orderId: testOrder.id,
        type: LicenseType.PERSONAL,
        status: LicenseStatus.ACTIVE,
        maxDownloads: 3,
        downloadLimit: 1,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
        metadata: {
          purchaseMethod: 'test',
          notes: 'Licence de test'
        }
      }
    })

    console.log(`✅ Licence créée: ${personalLicense.id}`)
    console.log(`   Type: ${personalLicense.type}`)
    console.log(`   Statut: ${personalLicense.status}`)
    console.log(`   Téléchargements max: ${personalLicense.maxDownloads}`)
    console.log(`   Valide jusqu'au: ${personalLicense.validUntil.toLocaleDateString()}\n`)

    // 4. Créer un enregistrement de téléchargement
    console.log('📥 Création d\'un enregistrement de téléchargement...')
    const download = await prisma.download.create({
      data: {
        licenseId: personalLicense.id,
        userId: user.id,
        templateId: template.id,
        downloadToken: 'test-token-123',
        downloadUrl: 'https://drive.google.com/file/d/test123/view',
        ipAddress: '127.0.0.1',
        userAgent: 'Test Browser',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        isExpired: false
      }
    })

    console.log(`✅ Téléchargement créé: ${download.id}`)
    console.log(`   Token: ${download.downloadToken}`)
    console.log(`   Expire le: ${download.expiresAt.toLocaleDateString()}\n`)

    // 5. Mettre à jour le compteur de téléchargements
    console.log('🔄 Mise à jour du compteur de téléchargements...')
    const updatedLicense = await prisma.license.update({
      where: { id: personalLicense.id },
      data: {
        downloadsCount: {
          increment: 1
        }
      }
    })

    console.log(`✅ Licence mise à jour: ${updatedLicense.downloadsCount}/${updatedLicense.maxDownloads} téléchargements\n`)

    // 6. Récupérer les licences de l'utilisateur
    console.log('🔍 Récupération des licences de l\'utilisateur...')
    const userLicenses = await prisma.license.findMany({
      where: { userId: user.id },
      include: {
        template: {
          select: {
            title: true,
            slug: true
          }
        },
        downloads: {
          select: {
            downloadedAt: true,
            expiresAt: true
          }
        }
      }
    })

    console.log(`✅ ${userLicenses.length} licence(s) trouvée(s):`)
    userLicenses.forEach(license => {
      console.log(`   📋 ${license.template.title} (${license.type})`)
      console.log(`      Téléchargements: ${license.downloadsCount}/${license.maxDownloads}`)
      console.log(`      Statut: ${license.status}`)
      console.log(`      ${license.downloads.length} téléchargement(s) enregistré(s)`)
    })

    // 7. Vérifier les relations
    console.log('\n🔗 Test des relations...')
    const templateWithLicenses = await prisma.template.findUnique({
      where: { id: template.id },
      include: {
        licenses: {
          include: {
            user: {
              select: { email: true }
            }
          }
        },
        downloadRecords: {
          include: {
            user: {
              select: { email: true }
            }
          }
        }
      }
    })

    if (templateWithLicenses) {
      console.log(`✅ Template "${templateWithLicenses.title}":`)
      console.log(`   ${templateWithLicenses.licenses.length} licence(s) active(s)`)
      console.log(`   ${templateWithLicenses.downloadRecords.length} téléchargement(s) enregistré(s)`)
    }

    console.log('\n🎉 Tests terminés avec succès !')

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter les tests
testLicenses()
