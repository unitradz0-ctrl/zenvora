import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminTabBar from '../../components/layout/AdminTabBar'
import BarChart from '../../components/ui/BarChart'
import { useStore } from '../../store/useStore'
import { chartData7 } from '../../data/seed'

const dauData = [
  { day: 'M', value: 320, highlight: false },
  { day: 'T', value: 410, highlight: false },
  { day: 'W', value: 380, highlight: false },
  { day: 'T', value: 460, highlight: false },
  { day: 'F', value: 490, highlight: false },
  { day: 'S', value: 610, highlight: true },
  { day: 'S', value: 290, highlight: false },
]

export default function AdminOverview() {
  const navigate = useNavigate()
  const { verificationRequests, reports, flaggedListingsState } = useStore()

  const attention = [
    { label: 'Seller verification requests', count: verificationRequests.length, to: '/admin/verify' },
    { label: 'Flagged listings', count: flaggedListingsState.length, to: '/admin/moderate' },
    { label: 'Open reports', count: reports.filter(r => r.status === 'open').length, to: '/admin/reports' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div className="px-[18px] pt-12 pb-4">
        <h1 className="text-[21px] font-extrabold text-ink">Overview</h1>
        <p className="text-sm text-mute">ZENVORA admin · Greenfield University</p>
      </div>

      <div className="flex-1 overflow-y-auto px-[18px] flex flex-col gap-4 pb-6">
        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Registered users', value: '4,812' },
            { label: 'Active sellers', value: '326' },
            { label: 'Live listings', value: '1,904' },
            { label: 'Transactions', value: '1,043' },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white border border-line rounded-lg p-4">
              <p className="text-xs text-mute">{kpi.label}</p>
              <p className="text-[22px] font-extrabold text-ink mt-1">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Revenue card */}
        <div className="bg-ink rounded-lg p-5">
          <p className="text-sm text-white/60">Transaction value this month</p>
          <p className="text-[24px] font-extrabold text-white mt-1">₦8,350,000</p>
          <p className="text-sm text-white/60 mt-2">Commission (3%)</p>
          <p className="text-[22px] font-extrabold text-gold">₦250,500</p>
        </div>

        {/* DAU chart */}
        <div className="bg-white border border-line rounded-lg p-4">
          <p className="text-[13px] font-bold text-mute mb-3">Daily active users</p>
          <BarChart data={dauData} />
        </div>

        {/* Needs attention */}
        <div>
          <p className="text-lg font-extrabold text-ink mb-3">Needs attention</p>
          <div className="bg-white border border-line rounded-lg overflow-hidden divide-y divide-line">
            {attention.map(item => (
              <button
                key={item.label}
                onClick={() => navigate(item.to)}
                className="w-full flex items-center justify-between px-4 py-4 text-left"
              >
                <span className="text-[14px] text-ink">{item.label}</span>
                {item.count > 0 && (
                  <span className="w-6 h-6 rounded-full bg-coral text-white text-[11px] font-extrabold flex items-center justify-center shrink-0">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AdminTabBar />
    </div>
  )
}
