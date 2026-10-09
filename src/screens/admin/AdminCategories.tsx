import React from 'react'
import { Plus, GripVertical } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import Toggle from '../../components/ui/Toggle'
import AdminTabBar from '../../components/layout/AdminTabBar'
import { useStore } from '../../store/useStore'

export default function AdminCategories() {
  const { categoriesState, toggleCategory, showToast } = useStore()

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar
        title="Categories"
        right={
          <button
            aria-label="Add category"
            onClick={() => showToast('New category added')}
            className="w-[38px] h-[38px] rounded-full bg-violet flex items-center justify-center"
          >
            <Plus size={18} className="text-white" />
          </button>
        }
      />
      <div className="flex-1 px-[18px] pb-6">
        <div className="bg-white border border-line rounded-lg overflow-hidden divide-y divide-line">
          {categoriesState.map(cat => (
            <div key={cat.id} className="flex items-center gap-3 px-4 py-4">
              <GripVertical size={18} className="text-mute shrink-0 cursor-grab" />
              <div
                className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[20px] shrink-0"
                style={{ backgroundColor: cat.tileColor }}
              >
                {cat.emoji}
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-bold text-ink">{cat.name}</p>
                <p className="text-xs text-mute">{cat.count} listings</p>
              </div>
              <Toggle checked={cat.enabled} onChange={() => toggleCategory(cat.id)} ariaLabel={`Toggle ${cat.name}`} />
            </div>
          ))}
        </div>
      </div>
      <AdminTabBar />
    </div>
  )
}
