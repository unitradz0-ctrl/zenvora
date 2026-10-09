import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, MapPin } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import Button from '../../components/ui/Button'
import BottomActionBar from '../../components/ui/BottomActionBar'
import RadioOptionCard from '../../components/ui/RadioOptionCard'
import { Textarea } from '../../components/ui/Input'
import { products } from '../../data/seed'
import { useStore, useCartTotal, fmt } from '../../store/useStore'

export default function Cart() {
  const navigate = useNavigate()
  const {
    cart, updateCartQty, deliveryOption, setDeliveryOption, noteToSeller, setNoteToSeller
  } = useStore()
  const { items, delivery, total } = useCartTotal()

  const cartProduct = cart.length > 0
    ? products.find(p => p.id === cart[0].productId) || products[0]
    : products[0]
  const qty = cart.length > 0 ? cart[0].quantity : 1

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Your order" />

      <div className="flex-1 px-[18px] flex flex-col gap-4 pb-[100px]">
        {/* Item card */}
        <div className="bg-white border border-line rounded-lg p-4 flex items-center gap-3">
          <div className="w-[64px] h-[64px] rounded-[12px] flex items-center justify-center text-[34px] shrink-0" style={{ backgroundColor: cartProduct.tileColor }}>
            {cartProduct.emoji}
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-ink leading-tight">{cartProduct.title}</p>
            <div className="flex items-center gap-1 mt-[2px]">
              <ShieldCheck size={12} className="text-teal" />
              <span className="text-xs text-mute">{cartProduct.seller}</span>
            </div>
            <p className="text-[15px] font-extrabold text-violet mt-1">{fmt(cartProduct.price)}</p>
          </div>
          {/* Quantity stepper */}
          <div className="flex items-center gap-2 bg-bg rounded-full px-2 py-1 border border-line">
            <button
              aria-label="Decrease quantity"
              onClick={() => updateCartQty(cartProduct.id, qty - 1)}
              className="w-7 h-7 rounded-full bg-white border border-line flex items-center justify-center text-ink font-bold"
            >−</button>
            <span className="text-[14px] font-bold text-ink w-5 text-center">{qty}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => updateCartQty(cartProduct.id, qty + 1)}
              className="w-7 h-7 rounded-full bg-white border border-line flex items-center justify-center text-ink font-bold"
            >+</button>
          </div>
        </div>

        {/* Delivery options */}
        <div>
          <h2 className="text-lg font-extrabold text-ink mb-3">How do you want to receive it?</h2>
          <div className="flex flex-col gap-3">
            <RadioOptionCard
              selected={deliveryOption === 'pickup'}
              onSelect={() => setDeliveryOption('pickup')}
              icon={<MapPin size={18} className="text-violet" />}
              title="Pick up on campus"
              subtitle="Meet at Hall B gate"
              price="Free"
              priceColor="text-teal"
            />
            <RadioOptionCard
              selected={deliveryOption === 'campus'}
              onSelect={() => setDeliveryOption('campus')}
              icon={<span className="text-[18px]">🛵</span>}
              title="Campus delivery"
              subtitle="To your hostel, today by 7pm"
              price={fmt(500)}
              priceColor="text-ink"
            />
          </div>
        </div>

        {/* Note */}
        <Textarea
          label="Note to seller"
          value={noteToSeller}
          onChange={e => setNoteToSeller(e.target.value)}
          placeholder="Any instructions for the seller..."
        />

        {/* Summary */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          {[
            { label: `Items (${qty})`, value: fmt(items) },
            { label: 'Delivery', value: delivery === 0 ? 'Free' : fmt(delivery) },
          ].map((row, i) => (
            <div key={i} className="flex justify-between px-4 py-3 border-b border-line">
              <span className="text-sm text-mute">{row.label}</span>
              <span className="text-sm font-semibold text-ink">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between px-4 py-3">
            <span className="text-[15px] font-bold text-ink">Total</span>
            <span className="text-[19px] font-extrabold text-violet">{fmt(total)}</span>
          </div>
        </div>
      </div>

      <BottomActionBar>
        <Button onClick={() => navigate('/checkout')}>
          Continue to payment · {fmt(total)}
        </Button>
      </BottomActionBar>
    </div>
  )
}
