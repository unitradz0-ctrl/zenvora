import React from 'react'
import AdminTabBar from '../../components/layout/AdminTabBar'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import Tag from '../../components/ui/Tag'
import EmptyState from '../../components/ui/EmptyState'
import { useStore } from '../../store/useStore'

export default function AdminModerate() {
  const { flaggedListingsState, keepListing, removeListing, showToast } = useStore()

  const handleKeep = (id: string) => {
    keepListing(id)
    showToast('Listing kept')
  }
  const handleRemove = (id: string) => {
    removeListing(id)
    showToast('Listing removed')
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="px-[18px] pt-12 pb-4">
        <h1 className="text-[21px] font-extrabold text-ink">Product moderation</h1>
        <p className="text-sm text-mute">Flagged listings</p>
      </div>

      <div className="flex-1 overflow-y-auto px-[18px] flex flex-col gap-3 pb-6">
        {flaggedListingsState.length === 0 ? (
          <EmptyState emoji="🧹" title="Nothing to review" subtitle="All flagged listings have been handled." />
        ) : (
          flaggedListingsState.map(item => (
            <div key={item.id} className="bg-white border border-line rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Avatar name={item.seller} color={item.avatarColor} size={42} />
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-ink">{item.title}</p>
                  <p className="text-xs text-mute">{item.seller}</p>
                </div>
              </div>
              <Tag variant="coral" className="mb-3">{item.reason}</Tag>
              <div className="flex gap-2">
                <Button variant="ghost" size="s" fullWidth={false} className="flex-1" onClick={() => handleKeep(item.id)}>Keep</Button>
                <Button variant="coral" size="s" fullWidth={false} className="flex-1" onClick={() => handleRemove(item.id)}>Remove</Button>
              </div>
            </div>
          ))
        )}
      </div>

      <AdminTabBar />
    </div>
  )
}
