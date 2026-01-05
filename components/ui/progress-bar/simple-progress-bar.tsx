// components/ui/progress-bar/simple-progress-bar.tsx
'use client'

interface SimpleProgressBarProps {
  value: number
  max: number
  label: string
  currentAmount: number
  currency?: string
}

export function SimpleProgressBar({ value, max, label, currentAmount, currency = 'R$' }: SimpleProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100)

  return (
    <div className="w-full bg-[#1A1A1A] rounded-xs overflow-hidden border border-[#2D2D2D]">
      {/* Barra de progresso principal */}
      <div className="flex items-center p-2 gap-2">
        {/* Barra de progresso */}
        <div className="flex-1 h-6 bg-[#F3F4F6] rounded-md overflow-hidden relative">
          <div
            className="h-full bg-[#6B46C1] transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
          {/* Texto da meta dentro da barra */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-black text-sm font-medium truncate px-2">{label}</span>
          </div>
        </div>

        {/* Valor atual à direita */}
        <span className="text-white text-sm font-bold whitespace-nowrap">
          {currency} {currentAmount.toFixed(2)}
        </span>
      </div>
    </div>
  )
}
