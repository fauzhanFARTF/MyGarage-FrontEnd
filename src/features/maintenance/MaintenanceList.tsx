import { formatDate, formatKm, formatRupiah } from '../../lib/format'
import type { MaintenanceLog } from '../../types/maintenance'
import { useDeleteMaintenanceLog } from './useMaintenance'

interface Props {
  logs: MaintenanceLog[]
  vehicleId: number
}

export function MaintenanceList({ logs, vehicleId }: Props) {
  const deleteMutation = useDeleteMaintenanceLog(vehicleId)

  function handleDelete(id: number) {
    if (window.confirm('Hapus catatan servis ini?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Riwayat Servis</h2>
      {logs.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">Belum ada catatan.</p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100">
          {logs.map((log) => (
            <li key={log.id} className="flex items-center justify-between gap-2 py-2 text-sm">
              <div>
                <p className="font-medium text-slate-900">{log.maintenance_type_detail.name}</p>
                <p className="text-xs text-slate-500">
                  {formatDate(log.date)} · {formatKm(log.odometer)} · {formatRupiah(log.cost)}
                  {log.notes && ` · ${log.notes}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(log.id)}
                disabled={deleteMutation.isPending}
                className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
