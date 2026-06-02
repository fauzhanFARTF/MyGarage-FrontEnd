import { formatDate, formatKm, formatRupiah } from '../../lib/format'
import { FUEL_TYPE_LABEL, type FuelLog } from '../../types/fuel'
import { useDeleteFuelLog } from './useFuel'

interface Props {
  logs: FuelLog[]
  vehicleId: number
}

export function FuelList({ logs, vehicleId }: Props) {
  const deleteMutation = useDeleteFuelLog(vehicleId)

  function handleDelete(id: number) {
    if (window.confirm('Hapus catatan pengisian BBM ini?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Riwayat Pengisian</h2>
      {logs.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">Belum ada catatan.</p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100">
          {logs.map((log) => (
            <li key={log.id} className="flex items-center justify-between gap-2 py-2 text-sm">
              <div>
                <p className="font-medium text-slate-900">
                  {log.liters} L · {FUEL_TYPE_LABEL[log.fuel_type]}
                  {!log.is_full_tank && <span className="ml-1 text-xs text-amber-600">(partial)</span>}
                </p>
                <p className="text-xs text-slate-500">
                  {formatDate(log.date)} · {formatKm(log.odometer)} · {formatRupiah(log.total_cost)}
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
