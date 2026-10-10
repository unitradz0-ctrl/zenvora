import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MessageCircle, Phone } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import Button from '../../components/ui/Button'
import BottomActionBar from '../../components/ui/BottomActionBar'
import VerticalStepper from '../../components/ui/VerticalStepper'
import Avatar from '../../components/ui/Avatar'
import Tag from '../../components/ui/Tag'

const steps = [
  { label: 'Order placed', time: 'Today, 2:14 pm', status: 'done' as const },
  { label: 'Seller confirmed', time: '2:20 pm', status: 'done' as const },
  { label: 'Out for delivery', time: '5:48 pm', status: 'current' as const },
  { label: 'Delivered', time: 'Expected by 7:00 pm', status: 'pending' as const },
]

export default function TrackOrder() {
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Track order" />

      <div className="flex-1 px-[18px] flex flex-col gap-4 pb-[100px]">
        {/* Hero card */}
        <div className="bg-ink rounded-lg p-5">
          <p className="text-[13px] text-white/60">Arriving today</p>
          <p className="text-[30px] font-black text-white leading-tight">By 7:00 pm</p>
          {/* Progress bar */}
          <div className="h-[6px] rounded-full bg-white/20 mt-3 mb-2">
            <div className="h-full bg-gold rounded-full" style={{ width: '68%' }} />
          </div>
          <Tag variant="gold">Order #UT-20483</Tag>
        </div>

        {/* Stepper */}
        <div className="bg-white border border-line rounded-lg p-4">
          <VerticalStepper steps={steps} />
        </div>

        {/* Delivery agent */}
        <div className="bg-white border border-line rounded-lg p-4 flex items-center gap-3">
          <Avatar name="Musa A." color="#5B2EE5" size={52} />
          <div className="flex-1">
            <p className="text-[14px] font-bold text-ink">Musa A.</p>
            <p className="text-xs text-mute">Campus delivery agent</p>
          </div>
          <button
            aria-label="Chat with delivery agent"
            onClick={() => navigate(`/chat/agent-${id}`)}
            className="w-[38px] h-[38px] rounded-full border border-line flex items-center justify-center"
          >
            <MessageCircle size={16} className="text-ink" />
          </button>
          <button
            aria-label="Call delivery agent"
            className="w-[38px] h-[38px] rounded-full border border-line flex items-center justify-center"
          >
            <Phone size={16} className="text-ink" />
          </button>
        </div>
      </div>

      <BottomActionBar>
        <Button onClick={() => navigate(`/review/${id}`)}>Confirm I received it</Button>
      </BottomActionBar>
    </div>
  )
}
