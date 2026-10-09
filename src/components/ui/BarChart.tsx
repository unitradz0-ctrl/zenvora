import React from 'react'
import { fmt } from '../../store/useStore'

interface BarData {
  day: string
  value: number
  highlight: boolean
}

interface BarChartProps {
  data: BarData[]
  className?: string
  showValues?: boolean
}

export default function BarChart({ data, className = '', showValues = false }: BarChartProps) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className={`flex items-end gap-[6px] h-[72px] ${className}`}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          {showValues && (
            <span className="text-[9px] text-mute">{d.value > 0 ? fmt(d.value) : ''}</span>
          )}
          <div
            className={`w-full rounded-t-[8px] transition-all ${d.highlight ? 'bg-violet' : 'bg-violet-soft'}`}
            style={{ height: `${Math.max(6, (d.value / max) * 56)}px` }}
          />
          <span className="text-[10px] text-mute font-semibold">{d.day}</span>
        </div>
      ))}
    </div>
  )
}
