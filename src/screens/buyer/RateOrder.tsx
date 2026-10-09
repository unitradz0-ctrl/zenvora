import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/ui/TopBar'
import Button from '../../components/ui/Button'
import BottomActionBar from '../../components/ui/BottomActionBar'
import StarRating from '../../components/ui/StarRating'
import Chip from '../../components/ui/Chip'
import { Textarea } from '../../components/ui/Input'
import { products } from '../../data/seed'
import { useStore } from '../../store/useStore'

const ratingChips = ['On time', 'As described', 'Friendly', 'Good packaging', 'Fair price']

export default function RateOrder() {
  const navigate = useNavigate()
  const { showToast } = useStore()
  const product = products[0]
  const [rating, setRating] = useState(4)
  const [selected, setSelected] = useState<Set<string>>(new Set(['On time', 'As described']))
  const [comment, setComment] = useState('Exactly as described. Delivered to my hostel on time.')

  const toggleChip = (chip: string) => {
    const next = new Set(selected)
    if (next.has(chip)) next.delete(chip)
    else next.add(chip)
    setSelected(next)
  }

  const handleSubmit = () => {
    showToast('Thanks for your review')
    navigate('/orders')
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Rate your order" />
      <div className="flex-1 px-[18px] flex flex-col gap-5 pb-[100px]">
        {/* Product thumbnail */}
        <div className="flex items-center gap-4">
          <div
            className="w-[84px] h-[84px] rounded-[16px] flex items-center justify-center text-[44px] shrink-0"
            style={{ backgroundColor: product.tileColor }}
          >
            {product.emoji}
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-ink">How was Kunle S.?</h2>
            <p className="text-sm text-mute mt-1">Your review helps other students.</p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center">
          <StarRating value={rating} interactive onChange={setRating} size="lg" />
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {ratingChips.map(chip => (
            <Chip
              key={chip}
              variant={selected.has(chip) ? 'on' : 'default'}
              onClick={() => toggleChip(chip)}
            >
              {chip}
            </Chip>
          ))}
        </div>

        {/* Comment */}
        <Textarea
          label="Write a review (optional)"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Tell others about your experience..."
        />
      </div>
      <BottomActionBar>
        <Button onClick={handleSubmit}>Submit review</Button>
      </BottomActionBar>
    </div>
  )
}
