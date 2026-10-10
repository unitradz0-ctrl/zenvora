import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Button from '../../components/ui/Button'
import BottomActionBar from '../../components/ui/BottomActionBar'
import Tag from '../../components/ui/Tag'
import Avatar from '../../components/ui/Avatar'
import StarRating from '../../components/ui/StarRating'
import RadioOptionCard from '../../components/ui/RadioOptionCard'
import { services, sellers } from '../../data/seed'
import { fmt } from '../../store/useStore'

export default function ServiceDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const svc = services.find(s => s.id === id) || services[1]
  const seller = sellers.find(s => s.id === svc.sellerId) || sellers[7]
  const defaultPkg = svc.packages.find(p => p.selected) || svc.packages[0]
  const [selectedPkg, setSelectedPkg] = useState(defaultPkg.name)
  const activePkg = svc.packages.find(p => p.name === selectedPkg) || svc.packages[0]

  const recentWork = ['#E7E2FF', '#FFE9C7', '#DDF6F3']

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div
        className="h-[210px] flex items-center justify-center relative"
        style={{ backgroundColor: svc.tileColor }}
      >
        <span className="text-[100px] leading-none">{svc.emoji}</span>
        <button
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-[40px] h-[40px] rounded-full bg-white/90 border border-line flex items-center justify-center"
        >
          <span className="text-ink text-lg">←</span>
        </button>
      </div>

      <div className="flex-1 px-[18px] pb-[100px] overflow-y-auto">
        {/* Tags */}
        <div className="flex gap-2 mt-4">
          <Tag variant="violet">Service</Tag>
          <Tag variant="teal">Replies in 10 min</Tag>
        </div>

        <h1 className="text-[25px] font-extrabold text-ink leading-tight mt-2">{svc.title}</h1>

        {/* Seller row */}
        <div className="flex items-center gap-2 mt-3">
          <Avatar name={seller.shopName} color={seller.avatarColor} size={34} />
          <div>
            <p className="text-[13.5px] font-bold text-ink">{seller.shopName}</p>
            <div className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-teal" />
              <span className="text-xs text-mute">Verified seller</span>
              <span className="text-xs text-mute mx-1">·</span>
              <StarRating value={svc.rating} size="sm" />
              <span className="text-xs text-mute ml-1">{svc.rating} ({svc.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Packages */}
        <h2 className="text-lg font-extrabold text-ink mt-5 mb-3">Choose a package</h2>
        <div className="flex flex-col gap-3">
          {svc.packages.map(pkg => (
            <RadioOptionCard
              key={pkg.name}
              selected={selectedPkg === pkg.name}
              onSelect={() => setSelectedPkg(pkg.name)}
              title={`${pkg.name} — ${fmt(pkg.price)}`}
              subtitle={pkg.description}
              priceColor="text-violet"
            />
          ))}
        </div>

        {/* Recent work */}
        <h2 className="text-lg font-extrabold text-ink mt-5 mb-3">Recent work</h2>
        <div className="flex gap-3">
          {recentWork.map((bg, i) => (
            <div
              key={i}
              className="w-[88px] h-[88px] rounded-[12px] flex items-center justify-center text-[36px]"
              style={{ backgroundColor: bg }}
            >
              {svc.emoji}
            </div>
          ))}
        </div>
      </div>

      <BottomActionBar>
        <Button className="flex-1" onClick={() => navigate('/cart')}>
          Request service · {fmt(activePkg.price)}
        </Button>
      </BottomActionBar>
    </div>
  )
}
