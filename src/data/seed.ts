import type {
  Product, Service, Seller, Order, Review, Notification, Category,
  AdminVerificationRequest, AdminReport, AdminTransaction, AdCampaign, SellerListing
} from '../types'

export const SCHOOL = 'Greenfield University'

export const products: Product[] = [
  {
    id: 'p1', title: 'Thrift sneakers, size 42', price: 18500,
    emoji: '👟', tileColor: '#E7E2FF', seller: 'Kunle S.', sellerId: 'seller-2',
    sellerVerified: true, rating: 4.8, reviewCount: 32, condition: 'Fairly used',
    category: 'Fashion', promoted: true, stock: 1,
    description: 'Clean and ready to use. Selling because I\'m graduating. Happy to show it before you pay, or I can bring it to your hostel.',
    pickupSpot: 'Hall B gate', offerDelivery: true, views: 214,
  },
  {
    id: 'p2', title: 'Jollof rice & chicken pack', price: 2500,
    emoji: '🍛', tileColor: '#FFE9C7', seller: 'Amaka\'s Kitchen', sellerId: 'seller-3',
    sellerVerified: true, rating: 4.9, reviewCount: 120, condition: 'Made fresh daily',
    category: 'Food', stock: 20, description: 'Freshly made jollof rice with a full chicken piece. Available for hostel delivery before 8pm.',
    pickupSpot: 'Faculty cafeteria', offerDelivery: true, views: 341,
  },
  {
    id: 'p3', title: 'Intro to Microeconomics', price: 6000,
    emoji: '📘', tileColor: '#D9EEFF', seller: 'Chuka E.', sellerId: 'seller-4',
    sellerVerified: true, rating: 4.6, reviewCount: 14, condition: 'Fairly used',
    category: 'Books', stock: 2, description: 'Good condition, no writing except a few underlines. Ideal for 100 level Economics students.',
    pickupSpot: 'Library entrance', offerDelivery: false, views: 88,
  },
  {
    id: 'p4', title: 'iPhone 12 clear case', price: 3500,
    emoji: '📱', tileColor: '#DDF6F3', seller: 'Gadget Corner', sellerId: 'seller-5',
    sellerVerified: true, rating: 4.7, reviewCount: 58, condition: 'New',
    category: 'Electronics', stock: 8, description: 'Brand new clear case, fits iPhone 12 perfectly. Includes camera protection.',
    pickupSpot: 'Tech block lobby', offerDelivery: true, views: 127,
  },
  {
    id: 'p5', title: '14" bob wig, ready to wear', price: 22000,
    emoji: '👩‍🦱', tileColor: '#FFE1EE', seller: 'Zara Hair', sellerId: 'seller-6',
    sellerVerified: true, rating: 4.8, reviewCount: 41, condition: 'New',
    category: 'Beauty', stock: 3, description: 'Lace front, pre-styled 14" bob. Ready to wear, adjustable straps.',
    pickupSpot: 'Female hostel block D', offerDelivery: true, views: 198,
  },
  {
    id: 'p6', title: 'Small chops platter (20 pcs)', price: 4000,
    emoji: '🥟', tileColor: '#FFF0C9', seller: 'Tolu\'s Treats', sellerId: 'seller-1',
    sellerVerified: true, rating: 4.9, reviewCount: 76, condition: 'Made to order',
    category: 'Food', stock: 12, description: 'Freshly made puff puff, samosa, spring rolls. Perfect for hostel parties and hangouts.',
    pickupSpot: 'Hall A gate', offerDelivery: true, views: 142, promoted: true,
  },
  {
    id: 'p7', title: 'Scientific calculator', price: 7500,
    emoji: '🧮', tileColor: '#E3E8FF', seller: 'Chuka E.', sellerId: 'seller-4',
    sellerVerified: true, rating: 4.6, reviewCount: 14, condition: 'New',
    category: 'Stationery', stock: 5, description: 'Casio FX-991ES Plus. Perfect for engineering and science students.',
    pickupSpot: 'Library entrance', offerDelivery: false, views: 93,
  },
  {
    id: 'p8', title: 'Hostel desk lamp', price: 5000,
    emoji: '💡', tileColor: '#FFF3D1', seller: 'Gadget Corner', sellerId: 'seller-5',
    sellerVerified: true, rating: 4.7, reviewCount: 58, condition: 'New',
    category: 'Electronics', stock: 6, description: 'LED desk lamp with USB charging port. 3 brightness levels. Ideal for night reading.',
    pickupSpot: 'Tech block lobby', offerDelivery: true, views: 74,
  },
]

export const services: Service[] = [
  {
    id: 's1', title: 'Braids & hair styling', fromPrice: 8000,
    emoji: '💇', tileColor: '#FFE1EE', seller: 'Ife B.', sellerId: 'seller-7',
    sellerVerified: true, rating: 4.9, reviewCount: 63,
    packages: [
      { name: 'Basic', price: 8000, description: 'Simple braids, 2 hours' },
      { name: 'Standard', price: 14000, description: 'Box braids with accessories, 3 hours', selected: true },
      { name: 'Premium', price: 22000, description: 'Full styling + hair included' },
    ]
  },
  {
    id: 's2', title: 'Logo & flyer design', fromPrice: 5000,
    emoji: '🎨', tileColor: '#E7E2FF', seller: 'Zainab M.', sellerId: 'seller-8',
    sellerVerified: true, rating: 4.8, reviewCount: 29,
    packages: [
      { name: 'Basic', price: 5000, description: '1 logo concept, 2 revisions' },
      { name: 'Standard', price: 9000, description: '3 concepts, flyer included, 3 revisions', selected: true },
      { name: 'Premium', price: 16000, description: 'Full brand kit and social pack' },
    ]
  },
  {
    id: 's3', title: 'Laundry pickup', fromPrice: 1500,
    emoji: '🧺', tileColor: '#DDF6F3', seller: 'FreshFold', sellerId: 'seller-9',
    sellerVerified: true, rating: 4.5, reviewCount: 44,
    packages: [
      { name: 'Basic', price: 1500, description: 'Wash and fold, per bag' },
      { name: 'Standard', price: 2500, description: 'Wash, iron and fold, per bag', selected: true },
      { name: 'Premium', price: 4000, description: 'Full laundry service, 2 bags' },
    ]
  },
]

export const sellers: Seller[] = [
  {
    id: 'seller-1', name: 'Tolu Bello', shopName: "Tolu's Treats",
    bio: 'Freshly made snacks and drinks, delivered to your hostel before 8pm.',
    verified: true, verifiedSeller: true, rating: 4.9, reviewCount: 76,
    salesCount: 203, replyTime: '5m', avatarColor: '#5B2EE5', school: SCHOOL,
  },
  {
    id: 'seller-2', name: 'Kunle S.', shopName: "Kunle's Store",
    bio: 'Quality thrift fashion and student essentials.',
    verified: true, verifiedSeller: true, rating: 4.8, reviewCount: 32,
    salesCount: 88, replyTime: '10m', avatarColor: '#E8408C', school: SCHOOL,
  },
  {
    id: 'seller-3', name: "Amaka's Kitchen", shopName: "Amaka's Kitchen",
    bio: 'Home-style meals and small chops, made fresh daily. Hostel delivery before 8pm.',
    verified: true, verifiedSeller: true, rating: 4.9, reviewCount: 120,
    salesCount: 340, replyTime: '10m', avatarColor: '#00A99D', school: SCHOOL,
  },
  {
    id: 'seller-4', name: 'Chuka E.', shopName: "Chuka's Books",
    bio: 'Textbooks and stationery at student-friendly prices.',
    verified: true, verifiedSeller: true, rating: 4.6, reviewCount: 14,
    salesCount: 55, replyTime: '20m', avatarColor: '#2F80ED', school: SCHOOL,
  },
  {
    id: 'seller-5', name: 'Gadget Corner', shopName: 'Gadget Corner',
    bio: 'New and fairly used gadgets and accessories.',
    verified: true, verifiedSeller: true, rating: 4.7, reviewCount: 58,
    salesCount: 141, replyTime: '15m', avatarColor: '#FFB300', school: SCHOOL,
  },
  {
    id: 'seller-6', name: 'Zara Hair', shopName: 'Zara Hair',
    bio: 'Quality wigs and hair accessories at campus prices.',
    verified: true, verifiedSeller: true, rating: 4.8, reviewCount: 41,
    salesCount: 97, replyTime: '30m', avatarColor: '#FF5E57', school: SCHOOL,
  },
  {
    id: 'seller-7', name: 'Ife B.', shopName: "Ife's Hair Studio",
    bio: 'Professional braiding and hair styling on campus.',
    verified: true, verifiedSeller: true, rating: 4.9, reviewCount: 63,
    salesCount: 180, replyTime: '10m', avatarColor: '#E8408C', school: SCHOOL,
  },
  {
    id: 'seller-8', name: 'Zainab M.', shopName: 'Zainab Designs',
    bio: 'Graphic design services for students and campus businesses.',
    verified: true, verifiedSeller: true, rating: 4.8, reviewCount: 29,
    salesCount: 74, replyTime: '10m', avatarColor: '#5B2EE5', school: SCHOOL,
  },
  {
    id: 'seller-9', name: 'FreshFold', shopName: 'FreshFold Laundry',
    bio: 'Same-day laundry pickup and delivery on campus.',
    verified: true, verifiedSeller: true, rating: 4.5, reviewCount: 44,
    salesCount: 112, replyTime: '25m', avatarColor: '#00A99D', school: SCHOOL,
  },
]

export const sellerListings: SellerListing[] = [
  { id: 'l1', title: 'Small chops platter (20 pcs)', price: 4000, emoji: '🥟', tileColor: '#FFF0C9', views: 142, stock: 12, status: 'active' },
  { id: 'l2', title: 'Zobo drink, 1 litre', price: 1500, emoji: '🥤', tileColor: '#FFE1EE', views: 96, stock: 30, status: 'active' },
  { id: 'l3', title: 'Chin chin jar', price: 2000, emoji: '🍪', tileColor: '#FFF3D1', views: 77, stock: 18, status: 'promoted' },
  { id: 'l4', title: 'Birthday cake slice box', price: 1800, emoji: '🍰', tileColor: '#FFE9C7', views: 61, stock: 9, status: 'active' },
  { id: 'l5', title: 'Meat pie (6 pack)', price: 3000, emoji: '🥧', tileColor: '#FFE6E4', views: 48, stock: 0, status: 'sold_out' },
  { id: 'l6', title: 'Puff puff bucket', price: 2200, emoji: '🍩', tileColor: '#EFEBFF', views: 33, stock: 15, status: 'active' },
]

export const buyerOrders: Order[] = [
  {
    id: 'o1', orderNumber: 'ZV-20483', productId: 'p1', sellerId: 'seller-2',
    sellerName: 'Kunle S.', buyerName: 'Tolu Bello', buyerId: 'user-1',
    status: 'out_for_delivery', amount: 19000, deliveryOption: 'campus',
    deliverySpot: 'Hall C, Room 204', createdAt: '2:14 PM', estimatedDelivery: '7:00 PM',
  },
  {
    id: 'o2', orderNumber: 'ZV-20311', productId: 'p3', sellerId: 'seller-4',
    sellerName: 'Chuka E.', buyerName: 'Tolu Bello', buyerId: 'user-1',
    status: 'delivered', amount: 6000, deliveryOption: 'campus',
    deliverySpot: 'Hall C, Room 204', createdAt: 'Yesterday 11am',
  },
  {
    id: 'o3', orderNumber: 'ZV-20277', productId: 'p2', sellerId: 'seller-3',
    sellerName: "Amaka's Kitchen", buyerName: 'Tolu Bello', buyerId: 'user-1',
    status: 'delivered', amount: 3000, deliveryOption: 'campus',
    deliverySpot: 'Hall C, Room 204', createdAt: 'Sunday 6pm',
  },
]

export const sellerOrders: Order[] = [
  {
    id: 'so1', orderNumber: 'ZV-20491', productId: 'l1', sellerId: 'seller-1',
    sellerName: "Tolu's Treats", buyerName: 'Ife B.', buyerId: 'buyer-2',
    status: 'new', amount: 4000, deliveryOption: 'campus',
    deliverySpot: 'Hall B, Room 112', createdAt: 'Today 2:00 PM', estimatedDelivery: '6:00 PM',
  },
  {
    id: 'so2', orderNumber: 'ZV-20490', productId: 'l2', sellerId: 'seller-1',
    sellerName: "Tolu's Treats", buyerName: 'Kemi A.', buyerId: 'buyer-3',
    status: 'new', amount: 3000, deliveryOption: 'pickup',
    deliverySpot: 'Library', createdAt: 'Today 1:30 PM',
  },
  {
    id: 'so3', orderNumber: 'ZV-20489', productId: 'l3', sellerId: 'seller-1',
    sellerName: "Tolu's Treats", buyerName: 'Seun O.', buyerId: 'buyer-4',
    status: 'preparing', amount: 2000, deliveryOption: 'campus',
    deliverySpot: 'Hall A, Room 301', createdAt: 'Today 12:00 PM', estimatedDelivery: '7:00 PM',
  },
  {
    id: 'so4', orderNumber: 'ZV-20485', productId: 'l4', sellerId: 'seller-1',
    sellerName: "Tolu's Treats", buyerName: 'Bayo T.', buyerId: 'buyer-5',
    status: 'delivered', amount: 1800, deliveryOption: 'pickup',
    deliverySpot: 'Hall A gate', createdAt: 'Yesterday',
  },
  {
    id: 'so5', orderNumber: 'ZV-20481', productId: 'l5', sellerId: 'seller-1',
    sellerName: "Tolu's Treats", buyerName: 'Ada N.', buyerId: 'buyer-6',
    status: 'delivered', amount: 3000, deliveryOption: 'campus',
    deliverySpot: 'Hall D, Room 22', createdAt: '2 days ago',
  },
]

export const productReviews: Review[] = [
  { id: 'r1', authorName: 'Amaka O.', authorInitial: 'A', authorColor: '#00A99D', rating: 5, text: 'Exactly as described and he delivered to my hostel the same evening.', date: '2 days ago' },
  { id: 'r2', authorName: 'Ife B.', authorInitial: 'I', authorColor: '#5B2EE5', rating: 5, text: 'Super clean and fits perfectly. Very responsive seller.', date: '5 days ago' },
  { id: 'r3', authorName: 'Kemi A.', authorInitial: 'K', authorColor: '#E8408C', rating: 4, text: 'Good quality for the price. A bit tight but wearable.', date: 'Last week' },
]

export const sellerReviews: Review[] = [
  { id: 'sr1', authorName: 'Ife B.', authorInitial: 'I', authorColor: '#5B2EE5', rating: 5, text: 'Small chops were hot and on time. Will order again.', date: 'Mon' },
  { id: 'sr2', authorName: 'Kemi A.', authorInitial: 'K', authorColor: '#E8408C', rating: 4, text: 'Zobo was fresh. A little more ice would be nice.', date: 'Tue' },
  { id: 'sr3', authorName: 'Seun O.', authorInitial: 'S', authorColor: '#00A99D', rating: 5, text: 'Best chin chin on campus.', date: 'Wed' },
]

export const publicSellerReviews: Review[] = [
  { id: 'pr1', authorName: 'Ife B.', authorInitial: 'I', authorColor: '#5B2EE5', rating: 5, text: 'Best jollof on campus. Still hot when it arrived.', date: 'Mon' },
  { id: 'pr2', authorName: 'Chuka E.', authorInitial: 'C', authorColor: '#2F80ED', rating: 5, text: 'Portion was big and delivery was quick.', date: 'Tue' },
  { id: 'pr3', authorName: 'Zainab M.', authorInitial: 'Z', authorColor: '#FFB300', rating: 4, text: 'Good, but I wanted more chicken.', date: 'Wed' },
]

export const notifications: Notification[] = [
  { id: 'n1', icon: '🚚', iconBg: '#DCEBFF', title: 'Your sneakers are out for delivery — Musa A. will reach Hall C by 7pm', time: '5:48p', group: 'today' },
  { id: 'n2', icon: '💬', iconBg: '#EFEBFF', title: 'Kunle S. sent you a message', time: '4:10p', group: 'today' },
  { id: 'n3', icon: '🏷️', iconBg: '#FFF3D1', title: 'Price drop on your wishlist — 14" bob wig is now ₦20,500', time: '11:02a', group: 'today' },
  { id: 'n4', icon: '🛡️', iconBg: '#DDF6F3', title: 'You are now a verified student — Your badge is live on your profile', time: 'Mon', group: 'earlier' },
  { id: 'n5', icon: '⭐', iconBg: '#FFF3D1', title: 'Rate your order from Chuka E.', time: 'Sun', group: 'earlier' },
]

export const categories: Category[] = [
  { id: 'c1', name: 'Food', emoji: '🍔', count: 214, tileColor: '#FFE9C7', enabled: true },
  { id: 'c2', name: 'Fashion', emoji: '👗', count: 388, tileColor: '#FFE1EE', enabled: true },
  { id: 'c3', name: 'Books', emoji: '📚', count: 152, tileColor: '#D9EEFF', enabled: true },
  { id: 'c4', name: 'Electronics', emoji: '🔌', count: 176, tileColor: '#DDF6F3', enabled: true },
  { id: 'c5', name: 'Beauty', emoji: '💄', count: 121, tileColor: '#FFE3EC', enabled: true },
  { id: 'c6', name: 'Services', emoji: '🛠️', count: 96, tileColor: '#E7E2FF', enabled: true },
  { id: 'c7', name: 'Delivery', emoji: '🛵', count: 24, tileColor: '#FFF3D1', enabled: true },
  { id: 'c8', name: 'Used items', emoji: '🧺', count: 203, tileColor: '#E3E8FF', enabled: true },
]

export const adminVerificationRequests: AdminVerificationRequest[] = [
  { id: 'av1', name: 'Amaka Okoye', shopName: "Amaka's Kitchen", method: 'Student ID', course: 'Law', level: '300L', status: 'pending', avatarColor: '#00A99D' },
  { id: 'av2', name: 'Chuka Eze', shopName: "Chuka's Books", method: 'School email', course: 'Economics', level: '200L', status: 'pending', avatarColor: '#2F80ED' },
  { id: 'av3', name: 'Zainab Musa', shopName: 'Zainab Designs', method: 'Student ID', course: 'Mass Comm', level: '400L', status: 'pending', avatarColor: '#5B2EE5' },
]

export const adminReports: AdminReport[] = [
  { id: 'ar1', type: 'Suspected scam', severity: 'high', reportedBy: 'Ife B.', against: 'Anon_204', item: 'Unknown product', status: 'open' },
  { id: 'ar2', type: 'Not as described', severity: 'medium', reportedBy: 'Kemi A.', against: 'Seller X', item: 'Thrift jacket', status: 'open' },
  { id: 'ar3', type: 'Rude messages', severity: 'medium', reportedBy: 'Seun O.', against: 'User in chat', item: 'Chat', status: 'open' },
  { id: 'ar4', type: 'Wrong price', severity: 'low', reportedBy: 'Bayo T.', against: 'Gadget Corner', item: 'Phone, ₦5,000', status: 'open' },
]

export const adminTransactions: AdminTransaction[] = [
  { id: 'at1', orderNumber: 'ZV-20483', item: 'Sneakers', buyer: 'Tolu', seller: 'Kunle', amount: 19000, status: 'completed' },
  { id: 'at2', orderNumber: 'ZV-20482', item: 'Jollof pack', buyer: 'Ife', seller: 'Amaka', amount: 2500, status: 'completed' },
  { id: 'at3', orderNumber: 'ZV-20480', item: 'Phone', buyer: 'Seyi', seller: 'Anon_204', amount: 45000, status: 'flagged' },
  { id: 'at4', orderNumber: 'ZV-20478', item: 'Textbook', buyer: 'Kemi', seller: 'Chuka', amount: 6000, status: 'refunded' },
  { id: 'at5', orderNumber: 'ZV-20475', item: 'Braids', buyer: 'Ada', seller: 'Ife', amount: 8000, status: 'completed' },
]

export const adCampaigns: AdCampaign[] = [
  { id: 'ac1', name: 'Campus Bites', type: 'Sponsored seller', status: 'live', impressions: '142k', budget: 48000 },
  { id: 'ac2', name: 'QuickPay app', type: 'Banner advertising', status: 'live', impressions: '98k', budget: 72000 },
  { id: 'ac3', name: 'PrintHub', type: 'Sponsored products', status: 'scheduled', impressions: '61k', budget: 26000 },
  { id: 'ac4', name: 'Glow Salon', type: 'Special offer', status: 'ended', impressions: '—', budget: 40000 },
]

export const flaggedListings = [
  { id: 'fl1', title: 'Branded sneakers, "100% original"', seller: 'Kunle S.', reason: 'Possible counterfeit', avatarColor: '#E8408C' },
  { id: 'fl2', title: 'Exam answers for sale', seller: 'Anon_204', reason: 'Prohibited item', avatarColor: '#FF5E57' },
  { id: 'fl3', title: 'Phone, price ₦5,000', seller: 'Gadget Corner', reason: 'Price looks wrong', avatarColor: '#FFB300' },
]

export const adminUsers = [
  { id: 'u1', name: 'Tolu Bello', role: 'Verified student', status: 'active', avatarColor: '#5B2EE5' },
  { id: 'u2', name: 'Amaka Okoye', role: 'Verified seller', status: 'active', avatarColor: '#00A99D' },
  { id: 'u3', name: 'Anon_204', role: 'User', status: 'suspended', avatarColor: '#FF5E57' },
  { id: 'u4', name: 'Ife Bakare', role: 'Verified student', status: 'active', avatarColor: '#5B2EE5' },
  { id: 'u5', name: 'Seyi Lawal', role: 'Pending verification', status: 'pending', avatarColor: '#FFB300' },
]

export const chartData7 = [
  { day: 'M', value: 12000, highlight: false },
  { day: 'T', value: 18500, highlight: false },
  { day: 'W', value: 14200, highlight: false },
  { day: 'T', value: 22000, highlight: false },
  { day: 'F', value: 19800, highlight: false },
  { day: 'S', value: 42500, highlight: true },
  { day: 'S', value: 8900, highlight: false },
]
