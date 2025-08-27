export interface User {
  id: string
  name?: string | null
  email: string
  emailVerified?: Date | null
  image?: string | null
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

// NextAuth types
export interface NextAuthUser {
  id: string
  email: string
  name?: string | null
  role: 'USER' | 'ADMIN'
}

export interface NextAuthSession {
  user: NextAuthUser
  expires: string
}

export interface NextAuthToken {
  id: string
  email: string
  name?: string | null
  role: 'USER' | 'ADMIN'
  iat: number
  exp: number
}

export interface Template {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  price: number
  salePrice?: number | null
  isOnSale: boolean
  isFeatured: boolean
  isPopular: boolean
  thumbnail: string
  images: string[]
  demoUrl?: string | null
  downloadUrl?: string | null
  technologies: string[]
  categoryId: string
  fileSize?: string | null
  version?: string | null
  downloads: number
  rating: number
  reviewCount: number
  createdAt: Date
  updatedAt: Date
  category: Category
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  icon?: string | null
  color?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  templateId: string
  amount: number
  currency: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
  stripeSessionId?: string | null
  downloadToken: string
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
  user: User
  template: Template
}

export interface Review {
  id: string
  userId: string
  templateId: string
  rating: number
  comment?: string | null
  createdAt: Date
  updatedAt: Date
  user: User
  template: Template
}

export interface CartItem {
  template: Template
  quantity: number
}

export interface SearchFilters {
  category?: string
  priceRange?: [number, number]
  technologies?: string[]
  rating?: number
  sortBy?: 'price' | 'rating' | 'downloads' | 'newest'
  sortOrder?: 'asc' | 'desc'
}
