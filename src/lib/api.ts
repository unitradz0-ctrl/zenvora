import { supabase } from './supabase'

// ─── LISTINGS ────────────────────────────────────────────────────────────────

export async function fetchListings(options?: {
  category?: string
  query?: string
  condition?: string
  minPrice?: number
  maxPrice?: number
  verifiedOnly?: boolean
  campusDelivery?: boolean
  highRated?: boolean
  sort?: string
  limit?: number
}) {
  let q = supabase.from('listings').select('*').neq('status', 'draft')

  if (options?.category) q = q.eq('category', options.category)
  if (options?.query)    q = q.ilike('title', `%${options.query}%`)
  if (options?.condition && options.condition !== 'Any') q = q.eq('condition', options.condition)
  if (options?.minPrice !== undefined) q = q.gte('price', options.minPrice)
  if (options?.maxPrice !== undefined) q = q.lte('price', options.maxPrice)
  if (options?.verifiedOnly)  q = q.eq('seller_verified', true)
  if (options?.campusDelivery) q = q.eq('offer_delivery', true)
  if (options?.highRated)     q = q.gte('rating', 4)

  if (options?.sort === 'Lowest price')  q = q.order('price',      { ascending: true })
  else if (options?.sort === 'Top rated') q = q.order('rating',     { ascending: false })
  else if (options?.sort === 'Newest')    q = q.order('created_at', { ascending: false })
  else q = q.order('promoted', { ascending: false }).order('created_at', { ascending: false })

  q = q.limit(options?.limit ?? 50)
  return q
}

export async function fetchListingById(id: string) {
  return supabase.from('listings').select('*').eq('id', id).single()
}

export async function fetchSellerListings(sellerId: string) {
  return supabase.from('listings').select('*').eq('seller_id', sellerId)
    .neq('status', 'draft').order('created_at', { ascending: false })
}

export async function createListing(listing: Record<string, unknown>) {
  return supabase.from('listings').insert(listing).select().single()
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

export async function fetchServices() {
  return supabase.from('services').select('*').order('created_at', { ascending: false })
}

export async function fetchServiceById(id: string) {
  return supabase.from('services').select('*').eq('id', id).single()
}

// ─── COMMUNITIES ─────────────────────────────────────────────────────────────

export async function fetchCommunities() {
  return supabase.from('communities').select('*')
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────

export async function fetchCategories() {
  return supabase.from('categories').select('*').eq('enabled', true)
}

// ─── CART ─────────────────────────────────────────────────────────────────────

export async function fetchCart(userId: string) {
  return supabase.from('cart_items').select('*, listing:listings(*)').eq('user_id', userId)
}

export async function addToCart(userId: string, listingId: string, quantity = 1) {
  return supabase.from('cart_items')
    .upsert({ user_id: userId, listing_id: listingId, quantity }, { onConflict: 'user_id,listing_id' })
    .select().single()
}

export async function updateCartQty(userId: string, listingId: string, quantity: number) {
  if (quantity < 1) return removeFromCart(userId, listingId)
  return supabase.from('cart_items').update({ quantity })
    .eq('user_id', userId).eq('listing_id', listingId)
}

export async function removeFromCart(userId: string, listingId: string) {
  return supabase.from('cart_items').delete()
    .eq('user_id', userId).eq('listing_id', listingId)
}

export async function clearCart(userId: string) {
  return supabase.from('cart_items').delete().eq('user_id', userId)
}

// ─── WISHLIST ─────────────────────────────────────────────────────────────────

export async function fetchWishlist(userId: string) {
  return supabase.from('wishlist').select('listing_id').eq('user_id', userId)
}

export async function addToWishlist(userId: string, listingId: string) {
  return supabase.from('wishlist').insert({ user_id: userId, listing_id: listingId })
}

export async function removeFromWishlist(userId: string, listingId: string) {
  return supabase.from('wishlist').delete()
    .eq('user_id', userId).eq('listing_id', listingId)
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────

export async function fetchBuyerOrders(buyerId: string) {
  return supabase.from('orders').select('*').eq('buyer_id', buyerId)
    .order('created_at', { ascending: false })
}

export async function fetchSellerOrders(sellerId: string) {
  return supabase.from('orders').select('*').eq('seller_id', sellerId)
    .order('created_at', { ascending: false })
}

export async function createOrder(order: Record<string, unknown>) {
  return supabase.from('orders').insert(order).select().single()
}

export async function updateOrderStatus(orderId: string, status: string) {
  return supabase.from('orders').update({ status }).eq('id', orderId)
}

// ─── MESSAGES ────────────────────────────────────────────────────────────────

export async function fetchMessages(userId1: string, userId2: string) {
  return supabase.from('messages').select('*')
    .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
    .order('created_at', { ascending: true })
}

export async function sendMessage(senderId: string, receiverId: string, text: string, listingId?: string) {
  return supabase.from('messages')
    .insert({ sender_id: senderId, receiver_id: receiverId, text, listing_id: listingId })
    .select().single()
}

export function subscribeToMessages(userId1: string, userId2: string, callback: (msg: unknown) => void) {
  return supabase
    .channel(`chat-${[userId1, userId2].sort().join('-')}`)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'messages',
      filter: `receiver_id=eq.${userId2}`,
    }, payload => callback(payload.new))
    .subscribe()
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

export async function fetchNotifications(userId: string) {
  return supabase.from('notifications').select('*').eq('user_id', userId)
    .order('created_at', { ascending: false }).limit(50)
}

export async function markAllNotificationsRead(userId: string) {
  return supabase.from('notifications').update({ read: true }).eq('user_id', userId)
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────

export async function createReview(review: Record<string, unknown>) {
  return supabase.from('reviews').insert(review).select().single()
}

export async function fetchListingReviews(listingId: string) {
  return supabase.from('reviews').select('*, reviewer:profiles(full_name)')
    .eq('listing_id', listingId).order('created_at', { ascending: false })
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────

export async function submitReport(report: Record<string, unknown>) {
  return supabase.from('reports').insert(report).select().single()
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────

export async function fetchProfile(userId: string) {
  return supabase.from('profiles').select('*').eq('id', userId).single()
}

export async function updateProfile(userId: string, updates: Record<string, unknown>) {
  return supabase.from('profiles').update(updates).eq('id', userId)
}

export async function fetchShopByOwner(ownerId: string) {
  return supabase.from('shops').select('*').eq('owner_id', ownerId).single()
}

export async function createShop(shop: Record<string, unknown>) {
  return supabase.from('shops').insert(shop).select().single()
}
