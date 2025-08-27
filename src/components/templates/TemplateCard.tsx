'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Star, 
  Download, 
  Eye, 
  Heart, 
  ShoppingCart,
  Code,
  Palette,
  Smartphone,
  Globe
} from 'lucide-react'
import { formatPrice } from '@/lib/utils/formatPrice'
import AddToCartButton from '@/components/cart/AddToCartButton'

interface Template {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  price: number
  salePrice?: number
  isOnSale: boolean
  isFeatured: boolean
  isPopular: boolean
  thumbnail: string
  images: string[]
  demoUrl: string
  downloadUrl: string
  technologies: string[]
  categoryId: string
  fileSize: string
  version: string
  downloads: number
  rating: number
  reviewCount: number
  createdAt: Date
  updatedAt: Date
  category: {
    id: string
    name: string
    slug: string
  }
  reviews: Array<{
    id: string
    rating: number
    comment: string
    createdAt: Date
  }>
}

interface TemplateCardProps {
  template: Template
  variant?: 'default' | 'featured' | 'compact'
}

export default function TemplateCard({ template, variant = 'default' }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const getTechnologyIcon = (tech: string) => {
    const techLower = tech.toLowerCase()
    if (techLower.includes('react')) return <Code className="h-4 w-4" />
    if (techLower.includes('css') || techLower.includes('design')) return <Palette className="h-4 w-4" />
    if (techLower.includes('mobile') || techLower.includes('responsive')) return <Smartphone className="h-4 w-4" />
    return <Globe className="h-4 w-4" />
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-white/20'
        }`}
      />
    ))
  }

  if (variant === 'compact') {
    return (
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/10"
      >
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10">
                <Image
                  src={template.thumbnail}
                  alt={template.title}
                  width={64}
                  height={64}
                  className={`object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              {template.isOnSale && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  -{Math.round(((template.price - (template.salePrice || 0)) / template.price) * 100)}%
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                {template.title}
              </h3>
              <p className="text-xs text-white/60 mt-1 line-clamp-2">
                {template.shortDescription}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-1">
                  {renderStars(template.rating)}
                  <span className="text-xs text-white/40 ml-1">
                    ({template.reviewCount})
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {template.salePrice ? formatPrice(template.salePrice) : formatPrice(template.price)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/10 overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={template.thumbnail}
          alt={template.title}
          fill
          className={`object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {template.isFeatured && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full font-medium"
            >
              Featured
            </motion.div>
          )}
          {template.isPopular && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full font-medium"
            >
              Popular
            </motion.div>
          )}
        </div>

        {/* Sale Badge */}
        {template.isOnSale && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-sm rounded-full font-bold"
          >
            -{Math.round(((template.price - (template.salePrice || 0)) / template.price) * 100)}%
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-center space-x-2"
        >
          <Link
            href={template.demoUrl}
            target="_blank"
            className="flex-1 bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Démo</span>
          </Link>
          
          <AddToCartButton template={template} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
            {template.category.name}
          </span>
          <div className="flex items-center space-x-1 text-white/40">
            <Download className="h-3 w-3" />
            <span className="text-xs">{template.downloads}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {template.title}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {template.shortDescription}
        </p>

        {/* Technologies */}
        <div className="flex items-center space-x-2 mb-4">
          {template.technologies.slice(0, 3).map((tech) => (
            <div
              key={tech}
              className="flex items-center space-x-1 px-2 py-1 bg-white/10 rounded-lg text-white/60 text-xs"
            >
              {getTechnologyIcon(tech)}
              <span>{tech}</span>
            </div>
          ))}
          {template.technologies.length > 3 && (
            <span className="text-white/40 text-xs">
              +{template.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(template.rating)}
            </div>
            <span className="text-white/40 text-sm">
              ({template.reviewCount})
            </span>
          </div>
          
          <div className="text-right">
            {template.isOnSale && (
              <div className="text-white/40 text-sm line-through">
                {formatPrice(template.price)}
              </div>
            )}
            <div className="text-xl font-bold text-white">
              {template.salePrice ? formatPrice(template.salePrice) : formatPrice(template.price)}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 text-xs text-white/40">
          <span>v{template.version}</span>
          <span>{template.fileSize}</span>
        </div>
      </div>
    </motion.div>
  )
}
