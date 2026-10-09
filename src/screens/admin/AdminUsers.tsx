import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import SearchBar from '../../components/ui/SearchBar'
import Chip from '../../components/ui/Chip'
import Avatar from '../../components/ui/Avatar'
import Tag from '../../components/ui/Tag'
import { useStore } from '../../store/useStore'

const roleVariant: Record<string, string> = {
  'Verified student': 'teal',
  'Verified seller': 'teal',
  'Suspended': 'coral',
  'Pending verification': 'gold',
  'User': 'grey',
}

export default function AdminUsers() {
  const navigate = useNavigate()
  const { adminUsersState, showToast } = useStore()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const filters = ['All', 'Sellers', 'Pending', 'Suspended']

  const filtered = adminUsersState.filter(u => {
    const matchQ = u.name.toLowerCase().includes(query.toLowerCase())
    const matchF = filter === 'All'
      || (filter === 'Sellers' && u.role === 'Verified seller')
      || (filter === 'Pending' && u.status === 'pending')
      || (filter === 'Suspended' && u.status === 'suspended')
    return matchQ && matchF
  })

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="User management" />
      <div className="px-[18px] mb-3 flex flex-col gap-3">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by name or email" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map(f => (
            <Chip key={f} variant={filter === f ? 'on' : 'default'} onClick={() => setFilter(f)}>{f}</Chip>
          ))}
        </div>
      </div>

      <div className="flex-1 px-[18px] pb-6">
        <div className="bg-white border border-line rounded-lg overflow-hidden divide-y divide-line">
          {filtered.map(user => (
            <div key={user.id} className="flex items-center gap-3 px-4 py-4">
              <Avatar name={user.name} color={user.avatarColor} size={42} />
              <div className="flex-1">
                <p className="text-[14px] font-bold text-ink">{user.name}</p>
                <Tag variant={roleVariant[user.role] as any} className="mt-1">{user.role}</Tag>
              </div>
              <button
                aria-label="More options"
                onClick={() => showToast('Account options')}
                className="w-[34px] h-[34px] rounded-full bg-bg flex items-center justify-center"
              >
                <MoreHorizontal size={16} className="text-mute" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
