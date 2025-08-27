'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Award, 
  Target, 
  Zap, 
  Code, 
  Palette, 
  Rocket, 
  Star,
  CheckCircle,
  TrendingUp,
  Globe,
  Heart,
  Shield,
  Clock,
  Lightbulb,
  ArrowRight,
  Download,
  MessageSquare
} from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Templates créés', icon: Code },
    { number: '50K+', label: 'Téléchargements', icon: Download },
    { number: '98%', label: 'Satisfaction client', icon: Heart },
    { number: '24/7', label: 'Support disponible', icon: Clock }
  ]

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque template que nous créons, en nous assurant qu\'il répond aux plus hauts standards de qualité.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Nous croyons au pouvoir de la collaboration et travaillons étroitement avec nos clients pour comprendre leurs besoins.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Nous repoussons constamment les limites de la créativité et de la technologie pour créer des solutions uniques.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Fiabilité',
      description: 'Nos templates sont testés rigoureusement pour garantir leur stabilité et leur performance dans tous les environnements.',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const team = [
    {
      name: 'Alexandre Dubois',
      role: 'Directeur Créatif',
      avatar: '/avatars/alexandre.jpg',
      description: 'Expert en design UX/UI avec 8+ années d\'expérience dans la création d\'interfaces modernes et intuitives.',
      skills: ['Design System', 'UX Research', 'Prototyping']
    },
    {
      name: 'Sophie Martin',
      role: 'Lead Développeur',
      avatar: '/avatars/sophie.jpg',
      description: 'Développeuse full-stack passionnée par les technologies web modernes et l\'optimisation des performances.',
      skills: ['React', 'Node.js', 'Performance']
    },
    {
      name: 'Thomas Leroy',
      role: 'Architecte Solutions',
      avatar: '/avatars/thomas.jpg',
      description: 'Spécialiste en architecture web et en solutions scalables pour des projets de grande envergure.',
      skills: ['Architecture', 'Scalabilité', 'DevOps']
    },
    {
      name: 'Emma Rousseau',
      role: 'Chef de Produit',
      avatar: '/avatars/emma.jpg',
      description: 'Experte en gestion de produit avec une vision claire des besoins du marché et des tendances utilisateur.',
      skills: ['Product Strategy', 'User Research', 'Analytics']
    }
  ]

  const milestones = [
    {
      year: '2020',
      title: 'Fondation d\'EXTRiZY',
      description: 'Création de la startup avec une vision claire : démocratiser l\'accès à des templates web de qualité professionnelle.'
    },
    {
      year: '2021',
      title: 'Premier template premium',
      description: 'Lancement de notre premier template e-commerce qui a révolutionné le marché avec son design moderne.'
    },
    {
      year: '2022',
      title: 'Expansion internationale',
      description: 'Ouverture de nos services à l\'international avec des clients dans plus de 25 pays.'
    },
    {
      year: '2023',
      title: 'Plateforme communautaire',
      description: 'Lancement de notre plateforme communautaire permettant aux développeurs de partager leurs créations.'
    },
    {
      year: '2024',
      title: 'Innovation IA',
      description: 'Intégration de l\'intelligence artificielle pour la génération automatique de templates personnalisés.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header avec padding pour la navbar fixe */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium mb-6"
            >
              <Users className="h-4 w-4 mr-2 text-blue-400" />
              Notre histoire
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Nous créons l'
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                avenir du web
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/70 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              EXTRiZY est né d\'une vision simple : démocratiser l\'accès à des templates web 
              de qualité professionnelle. Notre équipe d\'experts combine créativité, innovation 
              et expertise technique pour créer des solutions qui transforment vos idées en réalité.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 lg:p-12"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Notre Mission</h2>
                  </div>
                </div>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Révolutionner la façon dont les entreprises et les créateurs construisent 
                  leur présence en ligne en fournissant des templates web exceptionnels, 
                  accessibles et personnalisables.
                </p>
                <ul className="space-y-3">
                  {[
                    'Démocratiser l\'accès à des designs professionnels',
                    'Accélérer le développement de projets web',
                    'Maintenir les plus hauts standards de qualité',
                    'Favoriser l\'innovation et la créativité'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 lg:p-12"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Notre Vision</h2>
                  </div>
                </div>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Devenir la référence mondiale en matière de templates web premium, 
                  en créant une communauté florissante de développeurs et de créateurs 
                  qui façonnent ensemble l\'avenir du web.
                </p>
                <ul className="space-y-3">
                  {[
                    'Leader du marché des templates web',
                    'Communauté mondiale de créateurs',
                    'Innovation technologique continue',
                    'Impact positif sur l\'écosystème web'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nos Valeurs Fondamentales
              </h2>
              <p className="text-white/60 text-lg max-w-3xl mx-auto">
                Ces valeurs guident chacune de nos décisions et de nos actions au quotidien
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + (index * 0.1) }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300"
                  >
                    <div className={`h-16 w-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-white/70 leading-relaxed">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Notre Équipe d'Experts
              </h2>
              <p className="text-white/60 text-lg max-w-3xl mx-auto">
                Des professionnels passionnés qui donnent vie à vos projets les plus ambitieux
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 + (index * 0.1) }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">{member.description}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-white/10 rounded-full text-white/60 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Notre Parcours
              </h2>
              <p className="text-white/60 text-lg max-w-3xl mx-auto">
                Découvrez les étapes clés qui ont façonné EXTRiZY
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 2.2 + (index * 0.1) }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 border-slate-900"></div>

                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
                      <div className="text-2xl font-bold text-blue-400 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{milestone.title}</h3>
                      <p className="text-white/70 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
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
              transition={{ duration: 0.6, delay: 2.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à transformer votre vision en réalité ?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers de créateurs qui ont déjà choisi EXTRiZY 
                pour leurs projets web les plus ambitieux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/templates"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Explorer nos templates</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Nous contacter</span>
                  <MessageSquare className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
