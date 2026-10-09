import React from 'react'
import { Check } from 'lucide-react'

type StepStatus = 'done' | 'current' | 'pending'

interface Step {
  label: string
  time?: string
  status: StepStatus
}

interface VerticalStepperProps {
  steps: Step[]
}

export default function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          {/* Line + circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                step.status === 'done' ? 'bg-teal' :
                step.status === 'current' ? 'bg-violet ring-[5px] ring-violet-soft' :
                'bg-[#CFC9EA]'
              }`}
            >
              {step.status === 'done' && <Check size={13} className="text-white" strokeWidth={2.5} />}
              {step.status === 'current' && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-[2px] flex-1 min-h-[28px] ${step.status === 'done' ? 'bg-teal' : 'bg-[#E6E1F7]'}`} />
            )}
          </div>
          {/* Label */}
          <div className="pb-6 pt-[2px]">
            <p className={`text-[14px] font-bold ${step.status === 'pending' ? 'text-mute' : 'text-ink'}`}>{step.label}</p>
            {step.time && <p className="text-xs text-mute mt-[2px]">{step.time}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
