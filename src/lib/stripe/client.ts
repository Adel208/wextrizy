import { loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<any>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export const formatStripeAmount = (amount: number) => {
  return Math.round(amount * 100)
}

export const formatStripeLineItems = (cartItems: any[]) => {
  return cartItems.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.template.title,
        description: item.template.shortDescription,
        images: [item.template.thumbnail],
      },
      unit_amount: formatStripeAmount(item.template.salePrice || item.template.price),
    },
    quantity: item.quantity,
  }))
}
