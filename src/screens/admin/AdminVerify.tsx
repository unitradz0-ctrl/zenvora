import React from 'react'
import AdminTabBar from '../../components/layout/AdminTabBar'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import Tag from '../../components/ui/Tag'
import EmptyState from '../../components/ui/EmptyState'
import { useStore } from '../../store/useStore'

export default function AdminVerify() {
  const { verificationRequests, approveVerification, rejectVerification, showToast } = useStore()

  const handleApprove = (id: string) => {
    approveVerification(id)
    showToast('Seller verified')
  }
  const handleReject = (id: string) => {
    rejectVerification(id)
    showToast('Request rejected')
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="px-[18px] pt-12 pb-4">
        <h1 className="text-[21px] font-extrabold text-ink">Seller verification</h1>
        <p className="text-sm text-mute">Review seller requests</p>
      </div>

      <div className="flex-1 overflow-y-auto px-[18px] flex flex-col gap-3 pb-6">
        {verificationRequests.length === 0 ? (
          <EmptyState emoji="✅" title="All caught up" subtitle="No verification requests are waiting." />
        ) : (
          verificationRequests.map(req => (
            <div key={req.id} className="bg-white border border-line rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={req.name} color={req.avatarColor} size={42} />
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-ink">{req.name}</p>
                  <p className="text-xs text-mute">{req.shopName}</p>
                </div>
                <Tag variant="gold">Pending</Tag>
              </div>
              {/* ID info */}
              <div className="bg-bg rounded-[10px] px-3 py-2 mb-3">
                <p className="text-[12.5px] text-mute">{req.method} · {req.course}, {req.level}</p>
                <div className="w-full h-[48px] bg-[#E6E1F7] rounded-[8px] mt-2 flex items-center justify-center">
                  <span className="text-xs text-mute">ID document thumbnail</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="s" fullWidth={false} className="flex-1" onClick={() => handleReject(req.id)}>Reject</Button>
                <Button variant="teal" size="s" fullWidth={false} className="flex-1" onClick={() => handleApprove(req.id)}>Approve</Button>
              </div>
            </div>
          ))
        )}
      </div>

      <AdminTabBar />
    </div>
  )
}
