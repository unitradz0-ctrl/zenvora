import React from 'react'
import TopBar from '../../components/ui/TopBar'
import BuyerTabBar from '../../components/layout/BuyerTabBar'
import { notifications } from '../../data/seed'

export default function Notifications() {
  const today = notifications.filter(n => n.group === 'today')
  const earlier = notifications.filter(n => n.group === 'earlier')

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Notifications" showBack={false} />
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Today */}
        <div className="px-[18px] mt-2 mb-1">
          <p className="text-[13px] font-bold text-mute uppercase tracking-wide">Today</p>
        </div>
        <div className="bg-white border border-line rounded-lg mx-[18px] overflow-hidden divide-y divide-line">
          {today.map(n => (
            <div key={n.id} className="flex items-start gap-3 px-4 py-4">
              <div
                className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[20px] shrink-0"
                style={{ backgroundColor: n.iconBg }}
              >
                {n.icon}
              </div>
              <div className="flex-1">
                <p className="text-[13.5px] text-ink leading-snug">{n.title}</p>
              </div>
              <span className="text-xs text-mute shrink-0">{n.time}</span>
            </div>
          ))}
        </div>

        {/* Earlier */}
        <div className="px-[18px] mt-5 mb-1">
          <p className="text-[13px] font-bold text-mute uppercase tracking-wide">Earlier</p>
        </div>
        <div className="bg-white border border-line rounded-lg mx-[18px] overflow-hidden divide-y divide-line">
          {earlier.map(n => (
            <div key={n.id} className="flex items-start gap-3 px-4 py-4">
              <div
                className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[20px] shrink-0"
                style={{ backgroundColor: n.iconBg }}
              >
                {n.icon}
              </div>
              <div className="flex-1">
                <p className="text-[13.5px] text-ink leading-snug">{n.title}</p>
              </div>
              <span className="text-xs text-mute shrink-0">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
      <BuyerTabBar />
    </div>
  )
}
