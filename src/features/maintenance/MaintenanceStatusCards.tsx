import { formatKm } from '../../lib/format'
import type { MaintenanceStatus, MaintenanceStatusLevel } from '../../types/maintenance'

const STATUS_STYLE: Record<MaintenanceStatusLevel, { label: string; cls: string }> = {
  overdue: { label: 'Lewat jatuh tempo', cls: 'border-red-200 bg-red-50 text-red-700' },
  upcoming: { label: 'Segera', cls: 'border-amber-200 bg-amber-50 text-amber-700' },
  ok: { label: 'Aman', cls: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
  unknown: { label: 'Tak diketahui', cls: 'border-slate-200 bg-slate-50 text-slate-600' },
}

function remainingText(item: MaintenanceStatus): string {
  const parts: string[] = []
  if (item.km_remaining !== null) {
    parts.push(item.km_remaining <= 0 ? `lewat ${formatKm(-item.km_remaining)}` : `${formatKm(item.km_remaining)} lagi`)
  }
  if (item.days_remaining !== null) {
    parts.push(item.days_remaining <= 0 ? `lewat ${-item.days_remaining} hari` : `${item.days_remaining} hari lagi`)
  }
  return parts.join(' · ') || '—'
}

export function MaintenanceStatusCards({ items }: { items: MaintenanceStatus[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        Belum ada data servis. Catat servis pertama untuk memunculkan status jatuh tempo.
      </p>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const style = STATUS_STYLE[item.status]
        return (
          <div key={item.maintenance_type_id} className={`rounded-xl border p-4 ${style.cls}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{item.maintenance_type_name}</h3>
              <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs font-medium">{style.label}</span>
            </div>
            <p className="mt-1 text-sm">{remainingText(item)}</p>
          </div>
        )
      })}
    </div>
  )
}
