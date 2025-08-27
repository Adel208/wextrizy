'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Star, Download, Eye, Heart, ShoppingCart, Grid3X3, Palette, Code, Rocket } from 'lucide-react'

export default function HomePage() {
  // Positions fixes pour éviter l'erreur d'hydratation
  const particles = [
    { left: '10%', top: '20%' },
    { left: '20%', top: '80%' },
    { left: '30%', top: '40%' },
    { left: '40%', top: '60%' },
    { left: '50%', top: '10%' },
    { left: '60%', top: '90%' },
    { left: '70%', top: '30%' },
    { left: '80%', top: '70%' },
    { left: '90%', top: '50%' },
    { left: '15%', top: '75%' },
    { left: '25%', top: '25%' },
    { left: '35%', top: '85%' },
    { left: '45%', top: '15%' },
    { left: '55%', top: '65%' },
    { left: '65%', top: '35%' },
    { left: '75%', top: '95%' },
    { left: '85%', top: '45%' },
    { left: '95%', top: '25%' },
    { left: '5%', top: '55%' },
    { left: '95%', top: '85%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Header avec padding pour la navbar fixe */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Background Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  x: [0, (i % 3) * 30 - 45, 0],
                  y: [0, (i % 4) * 25 - 37.5, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 8 + (i % 4) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
              Nouveau Design 2024
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Créez des sites web
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                extraordinaires
              </span>
              avec EXTRiZY
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Découvrez notre collection exclusive de templates web premium, conçus par des experts 
              pour transformer vos idées en sites web professionnels et performants.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/templates">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Explorer les Templates</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              
              <Link href="/templates/categories">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Voir les Catégories</span>
                  <Grid3X3 className="h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-white/60 text-sm">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-white/60 text-sm">Téléchargements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">4.9</div>
                <div className="text-white/60 text-sm">Note moyenne</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pourquoi choisir EXTRiZY ?
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Des templates conçus pour la performance, la beauté et la facilité d'utilisation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Palette,
                  title: "Design Moderne",
                  description: "Interfaces élégantes et contemporaines qui impressionnent vos visiteurs"
                },
                {
                  icon: Code,
                  title: "Code Propre",
                  description: "Code source optimisé et bien structuré pour une maintenance facile"
                },
                {
                  icon: Rocket,
                  title: "Performance",
                  description: "Templates optimisés pour une vitesse de chargement exceptionnelle"
                },
                {
                  icon: Download,
                  title: "Téléchargement Instantané",
                  description: "Accès immédiat après achat, sans attente"
                },
                {
                  icon: Eye,
                  title: "Prévisualisation",
                  description: "Démo en ligne pour tester avant d'acheter"
                },
                {
                  icon: Heart,
                  title: "Support Premium",
                  description: "Assistance technique dédiée pour tous vos projets"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à créer votre site web ?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers de développeurs et designers qui font confiance à EXTRiZY 
                pour leurs projets web les plus ambitieux.
              </p>
              <Link href="/templates">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-3 mx-auto"
                >
                  <Zap className="h-6 w-6" />
                  <span>Commencer Maintenant</span>
                  <ArrowRight className="h-6 w-6" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
