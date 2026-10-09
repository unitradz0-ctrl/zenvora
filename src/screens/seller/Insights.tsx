import React, { useState } from 'react'
import TopBar from '../../components/ui/TopBar'
import SegmentedControl from '../../components/ui/SegmentedControl'
import BarChart from '../../components/ui/BarChart'
import SellerTabBar from '../../components/layout/SellerTabBar'
import { sellerListings, chartData7 } from '../../data/seed'
import { fmt } from '../../store/useStore'

const kpis7 = [
  { label: 'Revenue', value: '₦118,400' },
  { label: 'Orders', value: '41' },
  { label: 'Repeat buyers', value: '38%' },
  { label: 'Views to orders', value: '12.9%' },
]
const kpis30 = [
  { label: 'Revenue', value: '₦402,700' },
  { label: 'Orders', value: '148' },
  { label: 'Repeat buyers', value: '44%' },
  { label: 'Views to orders', value: '11.4%' },
]

const chartData30 = [
  { day: 'W1', value: 92000, highlight: false },
  { day: 'W2', value: 108000, highlight: false },
  { day: 'W3', value: 87000, highlight: false },
  { day: 'W4', value: 115700, highlight: true },
]

export default function Insights() {
  const [tab, setTab] = useState('7 days')
  const kpis = tab === '7 days' ? kpis7 : kpis30
  const chart = tab === '7 days' ? chartData7 : chartData30
  const topListings = sellerListings.slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Insights" showBack={false} />
      <div className="px-[18px] mb-4">
        <SegmentedControl options={['7 days', '30 days']} value={tab} onChange={setTab} />
      </div>

      <div className="flex-1 overflow-y-auto px-[18px] flex flex-col gap-4 pb-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3">
          {kpis.map(kpi => (
            <div key={kpi.label} className="bg-white border border-line rounded-lg p-4">
              <p className="text-xs text-mute">{kpi.label}</p>
              <p className="text-[22px] font-extrabold text-ink mt-1">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white border border-line rounded-lg p-4">
          <p className="text-[13px] font-bold text-mute mb-3">Sales history</p>
          <BarChart data={chart} />
        </div>

        {/* Top listings */}
        <div>
          <p className="text-lg font-extrabold text-ink mb-3">Top listings</p>
          <div className="bg-white border border-line rounded-lg overflow-hidden divide-y divide-line">
            {topListings.map((l, i) => (
              <div key={l.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-[13px] font-bold text-violet w-5 shrink-0">{i + 1}</span>
                <div
                  className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center text-[22px] shrink-0"
                  style={{ backgroundColor: l.tileColor }}
                >
                  {l.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-[13.5px] font-bold text-ink">{l.title}</p>
                  <p className="text-xs text-mute">{l.views} views</p>
                </div>
                <p className="text-[13.5px] font-bold text-violet">{fmt(l.price * (l.views > 100 ? 14 : 8))}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SellerTabBar />
    </div>
  )
}
