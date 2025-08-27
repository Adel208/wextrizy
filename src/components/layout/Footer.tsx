'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart
} from 'lucide-react'

const footerLinks = {
  templates: [
    { name: 'E-commerce', href: '/templates/ecommerce' },
    { name: 'Portfolio', href: '/templates/portfolio' },
    { name: 'Blog', href: '/templates/blog' },
    { name: 'Landing Page', href: '/templates/landing' },
    { name: 'Dashboard', href: '/templates/dashboard' },
    { name: 'Application', href: '/templates/app' },
  ],
  support: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Tutoriels', href: '/tutorials' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Support technique', href: '/support' },
    { name: 'Communauté', href: '/community' },
  ],
  company: [
    { name: 'À propos', href: '/about' },
    { name: 'Templates', href: '/templates' },
    { name: 'Blog', href: '/blog' },
    { name: 'Support', href: '/support' },
    { name: 'Contact', href: '/contact' },
    { name: 'Mentions légales', href: '/legal' },
  ],
  contact: [
    { icon: Mail, text: 'contact@templatestore.com' },
    { icon: Phone, text: '+33 1 23 45 67 89' },
    { icon: MapPin, text: 'Paris, France' },
  ]
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'GitHub', href: '#', icon: Github },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand section - Large */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="space-y-6">
              <Link href="/" className="inline-block">
                <span className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  TemplateStore
                </span>
              </Link>
              <p className="text-lg leading-7 text-white/70 max-w-md">
                La meilleure marketplace de templates web modernes et professionnels. 
                Créez des sites web exceptionnels en quelques clics.
              </p>
              
              {/* Social links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white/60 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links sections - Smaller */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold leading-6 text-white mb-6">Templates</h3>
            <ul className="space-y-4">
              {footerLinks.templates.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold leading-6 text-white mb-6">Support</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold leading-6 text-white mb-6">Entreprise</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact section - Medium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold leading-6 text-white mb-6">Contact</h3>
            <div className="space-y-4">
              {footerLinks.contact.map((contact, index) => (
                <div key={index} className="flex items-center space-x-3 text-white/60 hover:text-white transition-colors duration-200">
                  <contact.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{contact.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-white/60">
              <span className="text-sm">© 2024 TemplateStore. Tous droits réservés.</span>
              <span className="text-sm">Fait avec</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-sm">en France</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-white/60">
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">
                Conditions d'utilisation
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 z-40"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  )
}
