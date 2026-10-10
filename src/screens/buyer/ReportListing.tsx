import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import TopBar from '../../components/ui/TopBar'
import Button from '../../components/ui/Button'
import BottomActionBar from '../../components/ui/BottomActionBar'
import RadioOptionCard from '../../components/ui/RadioOptionCard'
import { Textarea } from '../../components/ui/Input'
import { useStore } from '../../store/useStore'

const reasons = [
  { id: 'not_described', label: 'Not as described', sub: 'The item is different from what was shown' },
  { id: 'scam', label: 'Suspected scam', sub: 'I think this seller is trying to scam buyers' },
  { id: 'prohibited', label: 'Prohibited item', sub: 'This item is not allowed on UNITRADZ' },
  { id: 'wrong_price', label: 'Wrong price', sub: 'The price seems misleading or wrong' },
  { id: 'offensive', label: 'Offensive content', sub: 'This listing contains offensive material' },
]

export default function ReportListing() {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useStore()
  const productTitle = (location.state as { productTitle?: string })?.productTitle || 'this listing'
  const [selected, setSelected] = useState('not_described')
  const [details, setDetails] = useState('')

  const handleSend = () => {
    showToast('Report sent. Thank you.')
    navigate(-1)
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Report listing" />
      <div className="flex-1 px-[18px] flex flex-col gap-4 pb-[100px]">
        <p className="text-sm text-mute leading-snug">
          Tell us what's wrong with <strong className="text-ink">{productTitle}</strong>. Our team reviews every report.
        </p>
        {reasons.map(r => (
          <RadioOptionCard
            key={r.id}
            selected={selected === r.id}
            onSelect={() => setSelected(r.id)}
            title={r.label}
            subtitle={r.sub}
          />
        ))}
        <Textarea
          label="More details (optional)"
          value={details}
          onChange={e => setDetails(e.target.value)}
          placeholder="Add any extra details..."
        />
      </div>
      <BottomActionBar>
        <Button variant="coral" onClick={handleSend}>Send report</Button>
      </BottomActionBar>
    </div>
  )
}
