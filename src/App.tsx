import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Global UI
import ToastContainer from './components/ui/Toast'

// Buyer screens
import Splash from './screens/buyer/Splash'
import Onboarding from './screens/buyer/Onboarding'
import SignUp from './screens/buyer/SignUp'
import VerifyMethod from './screens/buyer/VerifyMethod'
import VerifyCode from './screens/buyer/VerifyCode'
import Verified from './screens/buyer/Verified'
import Home from './screens/buyer/Home'
import Explore from './screens/buyer/Explore'
import Communities from './screens/buyer/Communities'
import Marketplace from './screens/buyer/Marketplace'
import Services from './screens/buyer/Services'
import Delivery from './screens/buyer/Delivery'
import Brands from './screens/buyer/Brands'
import Search from './screens/buyer/Search'
import Results from './screens/buyer/Results'
import Filters from './screens/buyer/Filters'
import ProductDetail from './screens/buyer/ProductDetail'
import ServiceDetail from './screens/buyer/ServiceDetail'
import SellerProfile from './screens/buyer/SellerProfile'
import Chat from './screens/buyer/Chat'
import Cart from './screens/buyer/Cart'
import Checkout from './screens/buyer/Checkout'
import OrderPlaced from './screens/buyer/OrderPlaced'
import MyOrders from './screens/buyer/MyOrders'
import TrackOrder from './screens/buyer/TrackOrder'
import RateOrder from './screens/buyer/RateOrder'
import Wishlist from './screens/buyer/Wishlist'
import Notifications from './screens/buyer/Notifications'
import Profile from './screens/buyer/Profile'
import ReportListing from './screens/buyer/ReportListing'

// Seller screens
import SellerSetup from './screens/seller/SellerSetup'
import SellerDashboard from './screens/seller/SellerDashboard'
import SellerListings from './screens/seller/SellerListings'
import AddListing from './screens/seller/AddListing'
import SellerOrders from './screens/seller/SellerOrders'
import OrderDetail from './screens/seller/OrderDetail'
import Promote from './screens/seller/Promote'
import Plans from './screens/seller/Plans'
import Insights from './screens/seller/Insights'
import SellerReviews from './screens/seller/SellerReviews'
import Wallet from './screens/seller/Wallet'

// Admin screens
import AdminOverview from './screens/admin/AdminOverview'
import AdminVerify from './screens/admin/AdminVerify'
import AdminModerate from './screens/admin/AdminModerate'
import AdminReports from './screens/admin/AdminReports'
import AdminMore from './screens/admin/AdminMore'
import AdminUsers from './screens/admin/AdminUsers'
import AdminCategories from './screens/admin/AdminCategories'
import AdminTransactions from './screens/admin/AdminTransactions'
import AdminAds from './screens/admin/AdminAds'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-800 flex items-start justify-center">
        <div className="relative w-full max-w-[430px] min-h-screen bg-bg overflow-hidden">
          <ToastContainer />
          <Routes>
            {/* Onboarding */}
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding/:page" element={<Onboarding />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify/method" element={<VerifyMethod />} />
            <Route path="/verify/code" element={<VerifyCode />} />
            <Route path="/verified" element={<Verified />} />

            {/* Buyer */}
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/services" element={<Services />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/search" element={<Search />} />
            <Route path="/results" element={<Results />} />
            <Route path="/filters" element={<Filters />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/seller-profile/:id" element={<SellerProfile />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-placed" element={<OrderPlaced />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/track/:id" element={<TrackOrder />} />
            <Route path="/review/:id" element={<RateOrder />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/report" element={<ReportListing />} />
            <Route path="/dispatch" element={<Navigate to="/home" replace />} />

            {/* Seller */}
            <Route path="/seller/setup" element={<SellerSetup />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/listings" element={<SellerListings />} />
            <Route path="/seller/add-listing" element={<AddListing />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
            <Route path="/seller/order/:id" element={<OrderDetail />} />
            <Route path="/seller/promote" element={<Promote />} />
            <Route path="/seller/plans" element={<Plans />} />
            <Route path="/seller/insights" element={<Insights />} />
            <Route path="/seller/reviews" element={<SellerReviews />} />
            <Route path="/seller/wallet" element={<Wallet />} />

            {/* Admin */}
            <Route path="/admin/overview" element={<AdminOverview />} />
            <Route path="/admin/verify" element={<AdminVerify />} />
            <Route path="/admin/moderate" element={<AdminModerate />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/more" element={<AdminMore />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
            <Route path="/admin/ads" element={<AdminAds />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
