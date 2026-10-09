import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import { Input, Textarea } from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Chip from '../../components/ui/Chip'
import Toggle from '../../components/ui/Toggle'
import { useStore } from '../../store/useStore'

const catChips = ['Food', 'Drinks', 'Pastries', 'Other']

export default function AddListing() {
  const navigate = useNavigate()
  const { showToast } = useStore()
  const [title, setTitle] = useState('Puff puff bucket')
  const [price, setPrice] = useState('2200')
  const [stock, setStock] = useState('15')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('Food')
  const [pickup, setPickup] = useState(true)
  const [delivery, setDelivery] = useState(false)

  const handlePublish = () => {
    showToast('Listing published')
    navigate('/seller/listings')
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="New listing" />
      <div className="flex-1 px-[18px] flex flex-col gap-5 pb-[110px]">
        {/* Photos */}
        <div>
          <p className="text-sm font-bold text-ink mb-2">Photos</p>
          <div className="flex gap-3">
            <button
              aria-label="Add cover photo"
              className="w-[88px] h-[88px] rounded-[12px] border-2 border-dashed border-[#7A55F5] flex flex-col items-center justify-center gap-1 bg-violet-soft"
            >
              <Camera size={22} className="text-violet" />
              <span className="text-[10px] font-semibold text-violet">Add cover</span>
            </button>
            {[1, 2].map(i => (
              <button
                key={i}
                aria-label="Add photo"
                className="w-[88px] h-[88px] rounded-[12px] border border-line bg-white flex items-center justify-center"
              >
                <Camera size={20} className="text-mute" />
              </button>
            ))}
          </div>
        </div>

        <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="What are you selling?" />

        {/* Price + stock row */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Input label="Price (₦)" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0" />
          </div>
          <div className="flex-1">
            <Input label="In stock" type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="1" />
          </div>
        </div>

        {/* Category */}
        <div>
          <p className="text-sm font-bold text-ink mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {catChips.map(c => (
              <Chip key={c} variant={category === c ? 'on' : 'default'} onClick={() => setCategory(c)}>{c}</Chip>
            ))}
          </div>
        </div>

        <Textarea
          label="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Describe your product in detail..."
        />

        {/* Delivery toggles */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-4 border-b border-line">
            <p className="text-[14px] font-bold text-ink">Campus pickup</p>
            <Toggle checked={pickup} onChange={setPickup} ariaLabel="Campus pickup" />
          </div>
          <div className="flex items-center justify-between px-4 py-4">
            <p className="text-[14px] font-bold text-ink">Offer campus delivery</p>
            <Toggle checked={delivery} onChange={setDelivery} ariaLabel="Campus delivery" />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-line px-[18px] pt-3 pb-[26px] flex gap-3">
        <Button variant="ghost" className="flex-1" onClick={() => navigate('/seller/listings')}>
          Save draft
        </Button>
        <Button className="flex-1" onClick={handlePublish}>
          Publish listing
        </Button>
      </div>
    </div>
  )
}
