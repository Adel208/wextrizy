'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'

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
  createdAt: string
  updatedAt: string
  category: {
    id: string
    name: string
    slug: string
  }
  reviews: Array<{
    id: string
    rating: number
    comment: string
    createdAt: string
  }>
}

interface AddToCartButtonProps {
  template: Template
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function AddToCartButton({ 
  template, 
  className = '', 
  variant = 'default',
  size = 'md'
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem, items } = useCartStore()

  const isInCart = items.some(item => item.id === template.id)

  const handleAddToCart = async () => {
    if (isInCart) return

    setIsAdding(true)
    
    // Simuler un délai pour l'effet visuel
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addItem({
      id: template.id,
      title: template.title,
      slug: template.slug,
      price: template.price,
      salePrice: template.salePrice,
      thumbnail: template.thumbnail,
      quantity: 1
    })
    setIsAdding(false)
    setIsAdded(true)
    
    // Réinitialiser l'état après 2 secondes
    setTimeout(() => setIsAdded(false), 2000)
  }

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }
    
    const variantClasses = {
      default: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
      outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
      ghost: 'text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500'
    }
    
    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`
  }

  if (isInCart) {
    return (
      <button
        disabled
        className={`${getButtonClasses()} bg-green-600 hover:bg-green-700 cursor-not-allowed opacity-75`}
      >
        <Check className="h-4 w-4 mr-2" />
        Déjà dans le panier
      </button>
    )
  }

  if (isAdded) {
    return (
      <button
        disabled
        className={`${getButtonClasses()} bg-green-600 hover:bg-green-700 cursor-not-allowed`}
      >
        <Check className="h-4 w-4 mr-2" />
        Ajouté !
      </button>
    )
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${getButtonClasses()} ${isAdding ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {isAdding ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          Ajout...
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Ajouter au panier
        </>
      )}
    </button>
  )
}
