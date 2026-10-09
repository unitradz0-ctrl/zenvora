import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import SegmentedControl from '../../components/ui/SegmentedControl'
import Button from '../../components/ui/Button'
import Tag from '../../components/ui/Tag'
import { useStore } from '../../store/useStore'

const comparison = [
  { feature: 'Listings', free: '10', pro: 'Unlimited' },
  { feature: 'Featured products', free: 'Paid', pro: 'Included' },
  { feature: 'Seller analytics', free: 'Basic', pro: 'Full' },
  { feature: 'Promotional tools', free: '—', pro: '✓' },
  { feature: 'Priority visibility', free: '—', pro: '✓' },
  { feature: 'Verified seller badge', free: 'After 5 sales', pro: 'Included' },
]

export default function Plans() {
  const navigate = useNavigate()
  const { sellerPlan, setSellerPlan, showToast } = useStore()
  const [tab, setTab] = useState(sellerPlan === 'pro' ? 'Pro' : 'Free')

  const handleUpgrade = () => {
    setSellerPlan('pro')
    showToast("You're now a Pro seller")
    navigate('/seller/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Seller plans" />
      <div className="px-[18px] mb-4">
        <SegmentedControl options={['Free', 'Pro']} value={tab} onChange={setTab} />
      </div>

      <div className="flex-1 px-[18px] flex flex-col gap-4 pb-[100px]">
        {/* Plan card */}
        <div className={`rounded-lg p-5 ${tab === 'Pro' ? 'bg-ink' : 'bg-white border border-line'}`}>
          {tab === 'Pro' && <Tag variant="gold" className="mb-3">Best for growing shops</Tag>}
          <div className="flex items-end gap-1">
            <p className={`text-[28px] font-extrabold ${tab === 'Pro' ? 'text-white' : 'text-ink'}`}>
              {tab === 'Pro' ? '₦2,000' : 'Free'}
            </p>
            {tab === 'Pro' && <p className="text-white/60 text-sm mb-1">/month</p>}
          </div>
          <p className={`text-sm mt-1 ${tab === 'Pro' ? 'text-white/60' : 'text-mute'}`}>
            {tab === 'Pro'
              ? 'Everything you need to grow your shop on campus.'
              : 'Perfect for getting started with up to 10 listings.'}
          </p>
        </div>

        {/* Comparison */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 px-4 py-3 border-b border-line">
            <span className="text-xs font-bold text-mute">Feature</span>
            <span className="text-xs font-bold text-mute text-center">Free</span>
            <span className="text-xs font-bold text-violet text-center">Pro</span>
          </div>
          {comparison.map((row, i) => (
            <div key={i} className="grid grid-cols-3 px-4 py-3 border-b border-line last:border-0">
              <span className="text-[13px] text-ink">{row.feature}</span>
              <span className="text-[13px] text-mute text-center">{row.free}</span>
              <span className={`text-[13px] font-bold text-center ${row.pro === '✓' || row.pro === 'Included' || row.pro === 'Unlimited' || row.pro === 'Full' ? 'text-teal' : 'text-violet'}`}>
                {row.pro === '✓' ? <Check size={14} className="mx-auto" /> : row.pro}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-mute text-center">Cancel any time. Your listings stay live if you go back to Free.</p>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-line px-[18px] pt-3 pb-[26px]">
        {tab === 'Pro' ? (
          <Button variant="gold" onClick={handleUpgrade}>Upgrade to Pro · ₦2,000/month</Button>
        ) : (
          <Button variant="ghost" className="opacity-60" disabled>You're on the Free plan</Button>
        )}
      </div>
    </div>
  )
}
