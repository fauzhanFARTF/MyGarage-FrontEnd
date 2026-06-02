import type { UsagePoint } from '../../types/dashboard'
import { formatDate, formatNumber } from '../../lib/format'

interface Props {
  points: UsagePoint[]
}

/** Bar chart sederhana berbasis div (tanpa library chart) — KISS. */
export function UsageBars({ points }: Props) {
  if (points.length === 0) {
    return (
      <p className="text-sm text-slate-400">Belum ada data pemakaian pada rentang ini.</p>
    )
  }

  const max = Math.max(...points.map((p) => p.distance), 1)

  return (
    <div className="flex items-end gap-1 h-32" role="img" aria-label="Grafik pemakaian harian">
      {points.map((p) => (
        <div key={p.date} className="flex-1 flex flex-col items-center justify-end group">
          <div
            className="w-full rounded-t bg-emerald-500 transition-all group-hover:bg-emerald-600"
            style={{ height: `${Math.max((p.distance / max) * 100, 2)}%` }}
            title={`${formatDate(p.date)}: ${formatNumber(p.distance)} km`}
          />
        </div>
      ))}
    </div>
  )
}
