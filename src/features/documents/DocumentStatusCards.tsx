import { formatDate } from '../../lib/format'
import type { DocumentStatus, DocumentStatusLevel } from '../../types/document'

const STATUS_STYLE: Record<DocumentStatusLevel, { label: string; cls: string }> = {
  expired: { label: 'Kedaluwarsa', cls: 'border-red-200 bg-red-50 text-red-700' },
  upcoming: { label: 'Segera', cls: 'border-amber-200 bg-amber-50 text-amber-700' },
  ok: { label: 'Aman', cls: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
}

function remainingText(item: DocumentStatus): string {
  if (item.days_remaining <= 0) return `kedaluwarsa ${Math.abs(item.days_remaining)} hari lalu`
  return `${item.days_remaining} hari lagi`
}

export function DocumentStatusCards({ items }: { items: DocumentStatus[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-400">Belum ada dokumen. Tambahkan untuk memantau masa berlaku.</p>
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const style = STATUS_STYLE[item.status]
        return (
          <div key={item.id} className={`rounded-xl border p-4 ${style.cls}`}>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">{item.name}</h3>
              <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs font-medium">{style.label}</span>
            </div>
            <p className="mt-1 text-sm">{remainingText(item)}</p>
            <p className="mt-0.5 text-xs opacity-80">
              {formatDate(item.expiry_date)}
              {item.vehicle_name ? ` · ${item.vehicle_name}` : ''}
            </p>
          </div>
        )
      })}
    </div>
  )
}
