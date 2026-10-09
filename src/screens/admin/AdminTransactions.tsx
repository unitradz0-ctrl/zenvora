import React from 'react'
import TopBar from '../../components/ui/TopBar'
import Tag from '../../components/ui/Tag'
import AdminTabBar from '../../components/layout/AdminTabBar'
import { adminTransactions } from '../../data/seed'
import { fmt } from '../../store/useStore'

const statusVariant: Record<string, string> = {
  completed: 'teal', flagged: 'coral', refunded: 'gold'
}

export default function AdminTransactions() {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Transaction monitoring" />
      <div className="flex-1 px-[18px] flex flex-col gap-4 pb-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-line rounded-lg p-4">
            <p className="text-xs text-mute">Today</p>
            <p className="text-[22px] font-extrabold text-ink mt-1">₦412,000</p>
          </div>
          <div className="bg-white border border-line rounded-lg p-4">
            <p className="text-xs text-mute">Disputed</p>
            <p className="text-[22px] font-extrabold text-coral mt-1">3</p>
          </div>
        </div>

        {/* Transaction list */}
        <div className="bg-white border border-line rounded-lg overflow-hidden divide-y divide-line">
          {adminTransactions.map(tx => (
            <div key={tx.id} className="flex items-center gap-3 px-4 py-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[13px] font-bold text-ink">#{tx.orderNumber}</p>
                  <Tag variant={statusVariant[tx.status] as any} className="capitalize">{tx.status}</Tag>
                </div>
                <p className="text-xs text-mute">{tx.item} · {tx.buyer} → {tx.seller}</p>
              </div>
              <p className="text-[14px] font-extrabold text-ink shrink-0">{fmt(tx.amount)}</p>
            </div>
          ))}
        </div>
      </div>
      <AdminTabBar />
    </div>
  )
}
