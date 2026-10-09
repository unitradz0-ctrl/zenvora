import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  className?: string
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-bold text-ink">{label}</label>}
      <input
        className={`h-[50px] rounded-[14px] bg-white border border-[1.5px] border-line focus:border-violet outline-none px-4 text-[15px] text-ink placeholder:text-mute transition-colors ${className}`}
        {...props}
      />
    </div>
  )
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-bold text-ink">{label}</label>}
      <textarea
        className={`h-[96px] rounded-[14px] bg-white border border-[1.5px] border-line focus:border-violet outline-none px-4 py-3 text-[15px] text-ink placeholder:text-mute resize-none transition-colors ${className}`}
        {...props}
      />
    </div>
  )
}
