import React from 'react'
import { Plus } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import Tag from '../../components/ui/Tag'
import AdminTabBar from '../../components/layout/AdminTabBar'
import { adCampaigns } from '../../data/seed'
import { useStore, fmt } from '../../store/useStore'

const statusVariant: Record<string, string> = {
  live: 'teal', scheduled: 'blue', ended: 'grey'
}

export default function AdminAds() {
  const { showToast } = useStore()

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar
        title="Advertising"
        right={
          <button
            onClick={() => showToast('Campaign draft created')}
            className="bg-violet text-white text-[12px] font-bold rounded-full px-3 py-2"
          >
            New campaign
          </button>
        }
      />
      <div className="flex-1 px-[18px] flex flex-col gap-4 pb-6">
        {/* Revenue card */}
        <div className="bg-ink rounded-lg p-5">
          <p className="text-sm text-white/60">Ad revenue this month</p>
          <p className="text-[24px] font-extrabold text-white mt-1">₦186,000</p>
        </div>

        {/* Campaigns */}
        <div className="bg-white border border-line rounded-lg overflow-hidden divide-y divide-line">
          {adCampaigns.map(camp => (
            <div key={camp.id} className="px-4 py-4">
              <div className="flex items-start justify-between mb-1">
                <p className="text-[14px] font-bold text-ink">{camp.name}</p>
                <Tag variant={statusVariant[camp.status] as any} className="capitalize">{camp.status}</Tag>
              </div>
              <p className="text-xs text-mute">{camp.type}</p>
              <div className="flex gap-4 mt-2">
                <div>
                  <p className="text-xs text-mute">Impressions</p>
                  <p className="text-[13px] font-bold text-ink">{camp.impressions}</p>
                </div>
                <div>
                  <p className="text-xs text-mute">Budget</p>
                  <p className="text-[13px] font-bold text-ink">{fmt(camp.budget)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AdminTabBar />
    </div>
  )
}
