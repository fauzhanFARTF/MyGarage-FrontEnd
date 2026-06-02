import { formatDate } from '../../lib/format'
import type { ConsumptionSegment } from '../../types/fuel'

interface Props {
  segments: ConsumptionSegment[]
}

/** Bar chart km/liter per segmen full-to-full (div murni, tanpa library). */
export function ConsumptionChart({ segments }: Props) {
  if (segments.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        Belum cukup data. Butuh minimal dua pengisian penuh untuk menghitung konsumsi.
      </p>
    )
  }

  const max = Math.max(...segments.map((s) => s.km_per_liter), 1)

  return (
    <div className="flex items-end gap-2 h-40" role="img" aria-label="Grafik konsumsi km per liter">
      {segments.map((s) => (
        <div key={s.date} className="flex flex-1 flex-col items-center justify-end gap-1">
          <span className="text-xs font-medium text-slate-700">{s.km_per_liter}</span>
          <div
            className="w-full rounded-t bg-emerald-500 transition-all hover:bg-emerald-600"
            style={{ height: `${Math.max((s.km_per_liter / max) * 100, 2)}%` }}
            title={`${formatDate(s.date)}: ${s.km_per_liter} km/l`}
          />
          <span className="text-[10px] text-slate-400">{formatDate(s.date)}</span>
        </div>
      ))}
    </div>
  )
}
