'use client'

import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cartStore'

interface CartIconProps {
  className?: string
  showCount?: boolean
}

export default function CartIcon({ className = '', showCount = true }: CartIconProps) {
  const { totalItems, openCart } = useCartStore()

  return (
    <button
      onClick={openCart}
      className={`relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors rounded-full ${className}`}
      aria-label="Ouvrir le panier"
    >
      <ShoppingCart className="h-5 w-5" />
      
      {showCount && totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  )
}
