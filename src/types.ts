export type UserRole = 'buyer' | 'seller' | 'admin'
export type DeliveryOption = 'pickup' | 'campus'
export type PaymentMethod = 'card' | 'transfer' | 'wallet'
export type VerificationMethod = 'email' | 'id' | 'regnum'
export type Plan = 'free' | 'pro'
export type OrderStatus = 'new' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'
export type ListingStatus = 'active' | 'promoted' | 'sold_out' | 'draft'

export interface Product {
  id: string
  title: string
  price: number
  emoji: string
  tileColor: string
  seller: string
  sellerId: string
  sellerVerified: boolean
  rating: number
  reviewCount: number
  condition: string
  category: string
  description?: string
  stock?: number
  promoted?: boolean
  views?: number
  pickupSpot?: string
  offerDelivery?: boolean
}

export interface Service {
  id: string
  title: string
  fromPrice: number
  emoji: string
  tileColor: string
  seller: string
  sellerId: string
  sellerVerified: boolean
  rating: number
  reviewCount: number
  packages: ServicePackage[]
}

export interface ServicePackage {
  name: string
  price: number
  description: string
  selected?: boolean
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface Order {
  id: string
  orderNumber: string
  productId: string
  sellerId: string
  sellerName: string
  buyerName: string
  buyerId: string
  status: OrderStatus
  amount: number
  deliveryOption: DeliveryOption
  deliverySpot?: string
  createdAt: string
  estimatedDelivery?: string
}

export interface Review {
  id: string
  authorName: string
  authorInitial: string
  authorColor: string
  rating: number
  text: string
  date: string
}

export interface Seller {
  id: string
  name: string
  shopName: string
  bio: string
  verified: boolean
  verifiedSeller: boolean
  rating: number
  reviewCount: number
  salesCount: number
  replyTime: string
  avatarColor: string
  school: string
}

export interface Notification {
  id: string
  icon: string
  iconBg: string
  title: string
  time: string
  group: 'today' | 'earlier'
}

export interface Category {
  id: string
  name: string
  emoji: string
  count: number
  tileColor: string
  enabled: boolean
}

export interface AdminVerificationRequest {
  id: string
  name: string
  shopName: string
  method: string
  course: string
  level: string
  status: 'pending' | 'approved' | 'rejected'
  avatarColor: string
}

export interface AdminReport {
  id: string
  type: string
  severity: 'high' | 'medium' | 'low'
  reportedBy: string
  against: string
  item: string
  status: 'open' | 'in_review' | 'resolved'
}

export interface AdminTransaction {
  id: string
  orderNumber: string
  item: string
  buyer: string
  seller: string
  amount: number
  status: 'completed' | 'flagged' | 'refunded'
}

export interface AdCampaign {
  id: string
  name: string
  type: string
  status: 'live' | 'scheduled' | 'ended'
  impressions: string
  budget: number
}

export interface SellerListing {
  id: string
  title: string
  price: number
  emoji: string
  tileColor: string
  views: number
  stock: number
  status: ListingStatus
}
