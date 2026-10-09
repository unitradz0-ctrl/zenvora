import React from 'react'
import { Check } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import Button from '../../components/ui/Button'
import SellerTabBar from '../../components/layout/SellerTabBar'
import { useStore } from '../../store/useStore'
import { fmt } from '../../store/useStore'

const transactions = [
  { id: 't1', label: 'Small chops platter', net: 3880, fee: 120 },
  { id: 't2', label: 'Zobo drink × 2', net: 2910, fee: 90 },
  { id: 't3', label: 'Chin chin jar', net: 1940, fee: 60 },
  { id: 't4', label: 'Birthday cake slice box', net: 1746, fee: 54 },
]

export default function Wallet() {
  const { showToast } = useStore()

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Wallet" showBack={false} />
      <div className="flex-1 overflow-y-auto px-[18px] flex flex-col gap-4 pb-6">
        {/* Wallet card */}
        <div className="bg-wallet-card rounded-lg p-6">
          <p className="text-[13px] text-white/60">Available to withdraw</p>
          <p className="text-[38px] font-black text-white leading-tight mt-1">₦86,420</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-white/50">Pending: ₦9,700</p>
            <Button
              variant="gold"
              size="s"
              fullWidth={false}
              onClick={() => showToast('Payout requested')}
            >
              Withdraw
            </Button>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <p className="text-lg font-extrabold text-ink mb-3">Recent transactions</p>
          <div className="bg-white border border-line rounded-lg overflow-hidden divide-y divide-line">
            {transactions.map(t => (
              <div key={t.id} className="flex items-center gap-3 px-4 py-4">
                <div className="w-[38px] h-[38px] rounded-[10px] bg-teal-soft flex items-center justify-center shrink-0">
                  <Check size={18} className="text-teal" />
                </div>
                <div className="flex-1">
                  <p className="text-[13.5px] font-bold text-ink">{t.label}</p>
                  <p className="text-xs text-mute">Fee 3% · −{fmt(t.fee)}</p>
                </div>
                <p className="text-[15px] font-extrabold text-teal">+{fmt(t.net)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SellerTabBar />
    </div>
  )
}
