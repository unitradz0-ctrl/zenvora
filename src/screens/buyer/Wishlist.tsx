import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/ui/TopBar'
import ProductTile from '../../components/ui/ProductTile'
import EmptyState from '../../components/ui/EmptyState'
import { products } from '../../data/seed'
import { useStore } from '../../store/useStore'

export default function Wishlist() {
  const navigate = useNavigate()
  const { wishlist } = useStore()
  const saved = products.filter(p => wishlist.has(p.id))

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Wishlist" showBack={false} />
      <div className="flex-1 px-[18px] pb-6 overflow-y-auto">
        {saved.length === 0 ? (
          <EmptyState
            emoji="💜"
            title="Nothing saved yet"
            subtitle="Tap the heart on any listing to keep it here."
            buttonLabel="Browse listings"
            onButton={() => navigate('/home')}
          />
        ) : (
          <>
            <p className="text-sm text-mute mb-3">{saved.length} saved items</p>
            <div className="grid grid-cols-2 gap-3">
              {saved.map(p => <ProductTile key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
      <BottomTabBar />
    </div>
  )
}
