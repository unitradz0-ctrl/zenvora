import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Search, Users } from 'lucide-react'
import { communities } from '../../data/seed'
import BottomTabBar from '../../components/layout/BottomTabBar'

export default function Communities() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-nav-gradient px-4 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft size={22} className="text-white" />
          </button>
          <h1 className="text-white text-[20px] font-extrabold flex-1">Communities</h1>
        </div>
        <div className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-lg px-3 h-10">
          <Search size={15} className="text-white/60 shrink-0" />
          <input
            placeholder="Search communities..."
            className="flex-1 text-sm text-white placeholder:text-white/50 outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex-1 px-4 pt-5 pb-24">
        {/* Banner */}
        <div className="bg-primary rounded-lg p-4 mb-5 flex items-center gap-3">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center text-2xl shrink-0">🎓</div>
          <div>
            <p className="text-white font-extrabold text-[14px]">Join your university community</p>
            <p className="text-white/65 text-xs">Connect with students, buy, sell, and grow together.</p>
          </div>
        </div>

        <h2 className="text-[15px] font-extrabold text-ink mb-3">All Communities</h2>
        <div className="flex flex-col gap-3">
          {communities.map(c => (
            <div
              key={c.id}
              className="bg-white border border-line rounded-lg p-4 flex items-center gap-3"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shrink-0"
                style={{ backgroundColor: c.color }}
              >
                {c.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-bold text-ink">{c.name}</p>
                <div className="flex items-center gap-1 mt-[2px]">
                  <Users size={11} className="text-mute" />
                  <span className="text-xs text-mute">{c.type} · {c.members} members</span>
                </div>
              </div>
              <button className="bg-accent text-white text-xs font-bold px-3 py-[6px] rounded-full shrink-0">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  )
}
