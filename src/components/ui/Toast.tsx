import React from 'react'
import { Check } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function ToastContainer() {
  const { toasts } = useStore()
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-[86px] left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-[430px] px-[18px]">
      {toasts.map(t => (
        <div
          key={t.id}
          className="flex items-center gap-2 bg-ink text-white rounded-full px-4 py-[11px] animate-slide-up text-[14px] font-semibold shadow-lg mx-auto"
        >
          <Check size={15} className="text-teal shrink-0" />
          {t.message}
        </div>
      ))}
    </div>
  )
}
