import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SegmentedControl from '../../components/ui/SegmentedControl'
import BuyerTabBar from '../../components/layout/BuyerTabBar'
import Tag from '../../components/ui/Tag'
import Button from '../../components/ui/Button'
import { products } from '../../data/seed'
import { buyerOrders } from '../../data/seed'
import { fmt } from '../../store/useStore'

export default function MyOrders() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Active')
  const active = buyerOrders.filter(o => o.status !== 'delivered')
  const completed = buyerOrders.filter(o => o.status === 'delivered')
  const orders = tab === 'Active' ? active : completed

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="sticky top-0 z-20 bg-bg px-[18px] pt-5 pb-3">
        <h1 className="text-[19px] font-extrabold text-ink mb-3">My orders</h1>
        <SegmentedControl
          options={['Active', 'Completed']}
          value={tab}
          onChange={setTab}
        />
      </div>

      <div className="flex-1 px-[18px] flex flex-col gap-3 pb-6">
        {orders.map(order => {
          const product = products.find(p => p.id === order.productId) || products[0]
          return (
            <div key={order.id} className="bg-white border border-line rounded-lg overflow-hidden">
              <div className="flex items-start gap-3 p-4">
                <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center text-[28px] shrink-0" style={{ backgroundColor: product.tileColor }}>
                  {product.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-mute">#{order.orderNumber}</span>
                    {order.status === 'out_for_delivery'
                      ? <Tag variant="blue">Out for delivery</Tag>
                      : <Tag variant="teal">Delivered</Tag>
                    }
                  </div>
                  <p className="text-[14px] font-bold text-ink leading-tight">{product.title}</p>
                  <p className="text-xs text-mute mt-[2px]">{order.sellerName}</p>
                  <p className="text-[15px] font-extrabold text-violet mt-1">{fmt(order.amount)}</p>
                </div>
              </div>
              <div className="px-4 pb-4 flex gap-2">
                {order.status !== 'delivered' && (
                  <Button size="s" fullWidth={false} className="flex-1" onClick={() => navigate(`/track/${order.id}`)}>
                    Track order
                  </Button>
                )}
                {order.status === 'delivered' && (
                  <Button size="s" variant="ghost" fullWidth={false} className="flex-1" onClick={() => navigate(`/review/${order.id}`)}>
                    Rate seller
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <BuyerTabBar />
    </div>
  )
}
