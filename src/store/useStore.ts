import { create } from 'zustand'
import type { DeliveryOption, PaymentMethod, VerificationMethod, Plan, CartItem } from '../types'
import {
  products, buyerOrders, sellerOrders, adminVerificationRequests,
  adminReports, sellerListings, flaggedListings, categories, adminUsers
} from '../data/seed'

interface Toast {
  id: string
  message: string
}

interface AppState {
  // Auth / persona
  currentRole: 'buyer' | 'seller' | 'admin'
  isLoggedIn: boolean
  sellerPlan: Plan
  isStudentVerified: boolean
  isSellerVerified: boolean

  // Cart
  cart: CartItem[]
  deliveryOption: DeliveryOption
  paymentMethod: PaymentMethod
  noteToSeller: string

  // Verification flow
  verificationMethod: VerificationMethod

  // Wishlist
  wishlist: Set<string>

  // Toast
  toasts: Toast[]

  // Settings toggles
  pushNotifications: boolean
  messageAlerts: boolean
  dealsAlerts: boolean
  showSchool: boolean

  // Dynamic data (mutable copies)
  verificationRequests: typeof adminVerificationRequests
  reports: typeof adminReports
  sellerOrdersState: typeof sellerOrders
  listingsState: typeof sellerListings
  flaggedListingsState: typeof flaggedListings
  categoriesState: typeof categories
  adminUsersState: typeof adminUsers

  // Seller order actions (local state for the screen session)
  acceptedOrders: Set<string>
  declinedOrders: Set<string>

  // Actions
  setRole: (role: 'buyer' | 'seller' | 'admin') => void
  login: () => void
  logout: () => void
  setSellerPlan: (plan: Plan) => void
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  updateCartQty: (productId: string, qty: number) => void
  clearCart: () => void
  setDeliveryOption: (opt: DeliveryOption) => void
  setPaymentMethod: (m: PaymentMethod) => void
  setNoteToSeller: (n: string) => void
  setVerificationMethod: (m: VerificationMethod) => void
  toggleWishlist: (productId: string) => void
  showToast: (message: string) => void
  dismissToast: (id: string) => void
  setPushNotifications: (v: boolean) => void
  setMessageAlerts: (v: boolean) => void
  setDealsAlerts: (v: boolean) => void
  setShowSchool: (v: boolean) => void
  approveVerification: (id: string) => void
  rejectVerification: (id: string) => void
  resolveReport: (id: string) => void
  reviewReport: (id: string) => void
  acceptSellerOrder: (id: string) => void
  declineSellerOrder: (id: string) => void
  keepListing: (id: string) => void
  removeListing: (id: string) => void
  toggleCategory: (id: string) => void
}

let toastCounter = 0

export const useStore = create<AppState>((set, get) => ({
  currentRole: 'buyer',
  isLoggedIn: false,
  sellerPlan: 'free',
  isStudentVerified: true,
  isSellerVerified: false,

  cart: [],
  deliveryOption: 'campus',
  paymentMethod: 'card',
  noteToSeller: 'Please bring it to Hall C, Room 204.',

  verificationMethod: 'email',

  wishlist: new Set(['p1', 'p5', 'p7']),

  toasts: [],

  pushNotifications: true,
  messageAlerts: true,
  dealsAlerts: true,
  showSchool: true,

  verificationRequests: [...adminVerificationRequests],
  reports: [...adminReports],
  sellerOrdersState: [...sellerOrders],
  listingsState: [...sellerListings],
  flaggedListingsState: [...flaggedListings],
  categoriesState: [...categories],
  adminUsersState: [...adminUsers],

  acceptedOrders: new Set(),
  declinedOrders: new Set(),

  setRole: (role) => set({ currentRole: role }),
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false, currentRole: 'buyer' }),
  setSellerPlan: (plan) => set({ sellerPlan: plan }),

  addToCart: (productId) => set((s) => {
    const existing = s.cart.find(i => i.productId === productId)
    if (existing) return { cart: s.cart.map(i => i.productId === productId ? { ...i, quantity: Math.min(i.quantity + 1, 5) } : i) }
    return { cart: [...s.cart, { productId, quantity: 1 }] }
  }),

  removeFromCart: (productId) => set((s) => ({ cart: s.cart.filter(i => i.productId !== productId) })),

  updateCartQty: (productId, qty) => set((s) => ({
    cart: qty < 1
      ? s.cart.filter(i => i.productId !== productId)
      : s.cart.map(i => i.productId === productId ? { ...i, quantity: Math.min(qty, 5) } : i)
  })),

  clearCart: () => set({ cart: [] }),

  setDeliveryOption: (opt) => set({ deliveryOption: opt }),
  setPaymentMethod: (m) => set({ paymentMethod: m }),
  setNoteToSeller: (n) => set({ noteToSeller: n }),
  setVerificationMethod: (m) => set({ verificationMethod: m }),

  toggleWishlist: (productId) => set((s) => {
    const next = new Set(s.wishlist)
    if (next.has(productId)) next.delete(productId)
    else next.add(productId)
    return { wishlist: next }
  }),

  showToast: (message) => {
    const id = String(++toastCounter)
    set((s) => ({ toasts: [...s.toasts, { id, message }] }))
    setTimeout(() => get().dismissToast(id), 2200)
  },

  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) })),

  setPushNotifications: (v) => set({ pushNotifications: v }),
  setMessageAlerts: (v) => set({ messageAlerts: v }),
  setDealsAlerts: (v) => set({ dealsAlerts: v }),
  setShowSchool: (v) => set({ showSchool: v }),

  approveVerification: (id) => set((s) => ({
    verificationRequests: s.verificationRequests.filter(r => r.id !== id)
  })),
  rejectVerification: (id) => set((s) => ({
    verificationRequests: s.verificationRequests.filter(r => r.id !== id)
  })),

  resolveReport: (id) => set((s) => ({
    reports: s.reports.filter(r => r.id !== id)
  })),

  reviewReport: (id) => set((s) => ({
    reports: s.reports.map(r => r.id === id ? { ...r, status: 'in_review' as const } : r)
  })),

  acceptSellerOrder: (id) => set((s) => {
    const next = new Set(s.acceptedOrders)
    next.add(id)
    return { acceptedOrders: next }
  }),
  declineSellerOrder: (id) => set((s) => {
    const next = new Set(s.declinedOrders)
    next.add(id)
    return { declinedOrders: next }
  }),

  keepListing: (id) => set((s) => ({
    flaggedListingsState: s.flaggedListingsState.filter(l => l.id !== id)
  })),
  removeListing: (id) => set((s) => ({
    flaggedListingsState: s.flaggedListingsState.filter(l => l.id !== id)
  })),

  toggleCategory: (id) => set((s) => ({
    categoriesState: s.categoriesState.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c)
  })),
}))

// Computed helpers
export function useCartTotal() {
  const { cart, deliveryOption } = useStore()
  const items = cart.reduce((sum, item) => {
    const p = products.find(pr => pr.id === item.productId)
    return sum + (p ? p.price * item.quantity : 0)
  }, 0)
  const delivery = deliveryOption === 'campus' ? 500 : 0
  return { items, delivery, total: items + delivery }
}

export function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG')
}
