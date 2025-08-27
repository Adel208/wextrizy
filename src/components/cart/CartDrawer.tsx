'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'

export default function CartDrawer() {
  const { 
    isOpen, 
    closeCart, 
    items, 
    totalItems, 
    totalPrice, 
    totalPriceWithTax,
    removeItem, 
    updateQuantity,
    clearCart,
    goToCheckout
  } = useCartStore()

  const handleCheckout = () => {
    goToCheckout()
    closeCart()
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    {/* Header */}
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Panier d'achat
                        </Dialog.Title>
                        <button
                          type="button"
                          className="relative rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          onClick={closeCart}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Fermer le panier</span>
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 px-4 sm:px-6">
                      {items.length === 0 ? (
                        <div className="text-center py-12">
                          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">Votre panier est vide</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Commencez à ajouter des templates pour commencer.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div key={item.template.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                              {/* Template Image */}
                              <div className="flex-shrink-0">
                                <img
                                  src={item.template.thumbnail}
                                  alt={item.template.title}
                                  className="h-16 w-16 object-cover rounded-md"
                                />
                              </div>

                              {/* Template Info */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                  {item.template.title}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {formatPrice(item.template.salePrice || item.template.price)}
                                </p>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateQuantity(item.template.id, item.quantity - 1)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="text-sm font-medium text-gray-900 w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.template.id, item.quantity + 1)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.template.id)}
                                className="p-1 text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Cart Summary */}
                    {items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="space-y-4">
                          {/* Subtotal */}
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Sous-total</p>
                            <p>{formatPrice(totalPrice)}</p>
                          </div>

                          {/* Tax */}
                          <div className="flex justify-between text-sm text-gray-500">
                            <p>TVA (20%)</p>
                            <p>{formatPrice(totalPriceWithTax - totalPrice)}</p>
                          </div>

                          {/* Total */}
                          <div className="flex justify-between text-lg font-medium text-gray-900 border-t border-gray-200 pt-4">
                            <p>Total</p>
                            <p>{formatPrice(totalPriceWithTax)}</p>
                          </div>

                          {/* Actions */}
                          <div className="space-y-3">
                            <button
                              onClick={handleCheckout}
                              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Procéder au paiement
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                            
                            <button
                              onClick={clearCart}
                              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                              Vider le panier
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
