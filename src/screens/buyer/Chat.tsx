import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Phone, Send } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import { sellers, products } from '../../data/seed'
import { fmt } from '../../store/useStore'

interface Message {
  id: string
  mine: boolean
  text: string
}

const initialMessages: Message[] = [
  { id: 'm1', mine: false, text: 'Hi! Is the size 42 still available?' },
  { id: 'm2', mine: true, text: 'Yes it is. Can you bring it to Hall C tonight?' },
  { id: 'm3', mine: false, text: 'Yes. Delivery by 7pm. I can also show you the soles first.' },
  { id: 'm4', mine: true, text: "Great, I'll order now." },
]

const quickReplies = ["Is it negotiable?", "Where can we meet?", "Send more photos"]

export default function Chat() {
  const navigate = useNavigate()
  const { id } = useParams()
  const seller = sellers.find(s => s.id === id) || sellers[1]
  const product = products[0]
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [
      ...prev,
      { id: `m${Date.now()}`, mine: true, text },
    ])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-bg flex items-center gap-3 px-[18px] py-3">
        <button aria-label="Back" onClick={() => navigate(-1)} className="w-[40px] h-[40px] rounded-full bg-white border border-line flex items-center justify-center shrink-0">
          <span className="text-ink text-xl">←</span>
        </button>
        <Avatar name={seller.name} color={seller.avatarColor} size={42} />
        <div className="flex-1">
          <p className="text-[15px] font-bold text-ink">{seller.name}</p>
          <p className="text-xs text-teal font-semibold">● Online</p>
        </div>
        <button aria-label="Call seller" className="w-[40px] h-[40px] rounded-full bg-white border border-line flex items-center justify-center">
          <Phone size={18} className="text-ink" />
        </button>
      </div>

      {/* Pinned listing */}
      <div className="mx-[18px] mb-2">
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full flex items-center gap-3 bg-white border border-line rounded-[14px] p-3"
        >
          <div className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center text-[26px] shrink-0" style={{ backgroundColor: product.tileColor }}>
            {product.emoji}
          </div>
          <div className="flex-1 text-left">
            <p className="text-[13px] font-bold text-ink">{product.title}</p>
            <p className="text-[13px] font-bold text-violet">{fmt(product.price)}</p>
          </div>
          <span className="text-xs text-mute bg-[#EEECF6] rounded-full px-2 py-[2px]">Listing</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 px-[18px] py-4 flex flex-col gap-3 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] px-4 py-3 text-[14px] leading-snug ${
                msg.mine
                  ? 'bg-violet text-white rounded-[18px] rounded-br-[5px]'
                  : 'bg-white border border-line text-ink rounded-[18px] rounded-bl-[5px]'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="overflow-x-auto no-scrollbar px-[18px]">
        <div className="flex gap-2 pb-2">
          {quickReplies.map(r => (
            <button
              key={r}
              onClick={() => setInput(r)}
              className="shrink-0 bg-white border border-line rounded-full px-3 py-[6px] text-[13px] font-semibold text-ink whitespace-nowrap"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-line px-[18px] pt-3 pb-[26px] flex gap-3 items-center">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 h-[46px] rounded-full bg-bg border border-line px-4 text-[14px] outline-none text-ink placeholder:text-mute"
        />
        <button
          aria-label="Send message"
          onClick={sendMessage}
          disabled={!input.trim()}
          className="w-[46px] h-[46px] rounded-full bg-violet flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  )
}
