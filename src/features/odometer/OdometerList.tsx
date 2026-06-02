import { formatDate, formatKm } from '../../lib/format'
import type { OdometerLog } from '../../types/odometer'

export function OdometerList({ logs }: { logs: OdometerLog[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Riwayat Odometer</h2>
      {logs.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">Belum ada catatan.</p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100">
          {logs.map((log) => (
            <li key={log.id} className="flex items-center justify-between gap-2 py-2 text-sm">
              <span className="text-slate-600">{formatDate(log.recorded_at)}</span>
              <span className="font-medium text-slate-900">{formatKm(log.value)}</span>
              <span className="text-xs uppercase text-slate-400">{log.source}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
