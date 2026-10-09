import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/ui/TopBar'
import SegmentedControl from '../../components/ui/SegmentedControl'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import Tag from '../../components/ui/Tag'
import EmptyState from '../../components/ui/EmptyState'
import SellerTabBar from '../../components/layout/SellerTabBar'
import { useStore, fmt } from '../../store/useStore'
import { sellerOrders, sellerListings, products } from '../../data/seed'

export default function SellerOrders() {
  const navigate = useNavigate()
  const { acceptedOrders, declinedOrders, acceptSellerOrder, declineSellerOrder } = useStore()
  const [tab, setTab] = useState('New (2)')

  const newOrders = sellerOrders.filter(o => o.status === 'new')
  const preparingOrders = sellerOrders.filter(o => o.status === 'preparing')
  const completedOrders = sellerOrders.filter(o => o.status === 'delivered')

  const orders =
    tab === 'New (2)' ? newOrders :
    tab === 'Preparing' ? preparingOrders :
    completedOrders

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Orders" showBack={false} />
      <div className="px-[18px] mb-4">
        <SegmentedControl
          options={['New (2)', 'Preparing', 'Completed']}
          value={tab}
          onChange={setTab}
        />
      </div>

      <div className="flex-1 px-[18px] flex flex-col gap-3 pb-6">
        {orders.length === 0 && (
          <EmptyState emoji="📦" title="No orders here" subtitle="Orders will appear as buyers place them." />
        )}
        {orders.map(order => {
          const accepted = acceptedOrders.has(order.id)
          const declined = declinedOrders.has(order.id)
          const fee = Math.round(order.amount * 0.03)

          return (
            <div key={order.id} className="bg-white border border-line rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-4">
                <Avatar name={order.buyerName} color="#5B2EE5" size={42} />
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-ink">{order.buyerName}</p>
                  <p className="text-xs text-mute">{order.deliverySpot}</p>
                  <p className="text-[15px] font-extrabold text-violet mt-1">{fmt(order.amount)}</p>
                </div>
              </div>

              {/* Item row — look up by productId in sellerListings then products */}
              {(() => {
                const listing = sellerListings.find(l => l.id === order.productId)
                  || products.find(p => p.id === order.productId)
                return (
                  <div className="mx-4 mb-3 bg-bg rounded-[12px] px-3 py-2">
                    <p className="text-[13px] text-ink">
                      {listing ? `${listing.emoji} ${listing.title}` : order.productId}
                    </p>
                  </div>
                )
              })()}

              {/* Actions */}
              <div className="px-4 pb-4 flex gap-2">
                {tab === 'New (2)' && !accepted && !declined && (
                  <>
                    <Button variant="ghost" size="s" fullWidth={false} className="flex-1" onClick={() => declineSellerOrder(order.id)}>Decline</Button>
                    <Button size="s" fullWidth={false} className="flex-1" onClick={() => acceptSellerOrder(order.id)}>Accept</Button>
                  </>
                )}
                {tab === 'New (2)' && accepted && (
                  <Tag variant="teal" className="text-sm py-2 px-3">✓ Accepted · moved to Preparing</Tag>
                )}
                {tab === 'New (2)' && declined && (
                  <span className="text-sm text-mute">Declined</span>
                )}
                {tab === 'Preparing' && (
                  <Button size="s" fullWidth={false} className="flex-1" onClick={() => navigate(`/seller/order/${order.id}`)}>Open order</Button>
                )}
                {tab === 'Completed' && (
                  <p className="text-xs text-mute">Fee ₦{fee} paid to ZENVORA</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <SellerTabBar />
    </div>
  )
}
