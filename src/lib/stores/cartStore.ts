import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Template } from '@/types'

export interface CartItem {
  template: Template
  quantity: number
  addedAt: Date
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (template: Template) => void
  removeItem: (templateId: string) => void
  updateQuantity: (templateId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  goToCheckout: () => void
  
  // Computed values
  totalItems: number
  totalPrice: number
  totalPriceWithTax: number
  hasItems: boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (template: Template) => {
        set((state) => {
          const existingItem = state.items.find(item => item.template.id === template.id)
          
          if (existingItem) {
            // Si l'item existe déjà, augmenter la quantité
            return {
              items: state.items.map(item =>
                item.template.id === template.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            }
          } else {
            // Ajouter un nouvel item
            return {
              items: [...state.items, {
                template,
                quantity: 1,
                addedAt: new Date()
              }]
            }
          }
        })
      },

      removeItem: (templateId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.template.id !== templateId)
        }))
      },

      updateQuantity: (templateId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(templateId)
          return
        }

        set((state) => ({
          items: state.items.map(item =>
            item.template.id === templateId
              ? { ...item, quantity }
              : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      goToCheckout: () => {
        // Rediriger vers la page de checkout
        if (typeof window !== 'undefined') {
          window.location.href = '/checkout'
        }
      },

      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      get totalPrice() {
        return get().items.reduce((total, item) => {
          const price = item.template.salePrice || item.template.price
          return total + (price * item.quantity)
        }, 0)
      },

      get totalPriceWithTax() {
        const subtotal = get().totalPrice
        const tax = subtotal * 0.20 // 20% de TVA
        return subtotal + tax
      },

      get hasItems() {
        return get().items.length > 0
      }
    }),
    {
      name: 'template-store-cart',
      partialize: (state) => ({ items: state.items }), // Ne persister que les items
    }
  )
)
