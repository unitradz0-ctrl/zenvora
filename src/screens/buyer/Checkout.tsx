import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Lock, CreditCard, Smartphone, Wallet } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import Button from '../../components/ui/Button'
import BottomActionBar from '../../components/ui/BottomActionBar'
import RadioOptionCard from '../../components/ui/RadioOptionCard'
import { useStore, useCartTotal, fmt } from '../../store/useStore'

export default function Checkout() {
  const navigate = useNavigate()
  const { paymentMethod, setPaymentMethod, clearCart, deliveryOption } = useStore()
  const { items, delivery, total } = useCartTotal()

  const handlePay = () => {
    // Grab the first cart item to show on the confirmation screen
    const { cart } = useStore.getState()
    const firstItem = cart[0]
    clearCart()
    navigate('/order-placed', {
      state: {
        orderNumber: `UT-${20480 + Math.floor(Math.random() * 20)}`,
        productId: firstItem?.productId || 'p1',
        total,
        deliveryOption,
      }
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Payment" />

      <div className="flex-1 px-[18px] flex flex-col gap-4 pb-[100px]">
        {/* Address */}
        <div className="bg-white border border-line rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-violet-soft flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-violet" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-ink">Hall C, Room 204</p>
            <p className="text-xs text-mute">Greenfield University</p>
          </div>
          <button className="text-[13px] font-bold text-violet">Edit</button>
        </div>

        {/* Payment methods */}
        <div>
          <h2 className="text-lg font-extrabold text-ink mb-3">Pay with</h2>
          <div className="flex flex-col gap-3">
            <RadioOptionCard
              selected={paymentMethod === 'card'}
              onSelect={() => setPaymentMethod('card')}
              icon={<CreditCard size={18} className="text-violet" />}
              title="Debit card"
              subtitle="•••• 4417"
            />
            <RadioOptionCard
              selected={paymentMethod === 'transfer'}
              onSelect={() => setPaymentMethod('transfer')}
              icon={<Smartphone size={18} className="text-violet" />}
              title="Bank transfer"
              subtitle="Pay with your bank app"
            />
            <RadioOptionCard
              selected={paymentMethod === 'wallet'}
              onSelect={() => setPaymentMethod('wallet')}
              icon={<Wallet size={18} className="text-violet" />}
              title="UNITRADZ wallet"
              subtitle="Balance ₦3,200"
            />
          </div>
        </div>

        {/* Security note */}
        <div className="bg-teal-soft rounded-lg p-4 flex gap-3">
          <Lock size={18} className="text-teal shrink-0 mt-[2px]" />
          <p className="text-[13px] text-[#007A71] leading-snug">
            Your payment is protected. The seller is notified as soon as you place your order.
          </p>
        </div>

        {/* Summary */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          {[
            { label: 'Items', value: fmt(items) },
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
        <Button variant="gold" onClick={handlePay}>Pay {fmt(total)}</Button>
      </BottomActionBar>
    </div>
  )
}
