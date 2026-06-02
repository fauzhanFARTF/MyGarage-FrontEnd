import { formatKm } from '../../lib/format'
import type { Vehicle } from '../../types/vehicle'
import { useDeleteVehicle } from './useVehicleMutations'

interface Props {
  vehicle: Vehicle
  onEdit: (vehicle: Vehicle) => void
}

const CATEGORY_LABEL: Record<Vehicle['vehicle_type_detail']['category'], string> = {
  car: 'Mobil',
  motorcycle: 'Motor',
}

export function VehicleCard({ vehicle, onEdit }: Props) {
  const deleteMutation = useDeleteVehicle()

  function handleDelete() {
    if (window.confirm(`Hapus kendaraan "${vehicle.name}" beserta seluruh riwayatnya?`)) {
      deleteMutation.mutate(vehicle.id)
    }
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{vehicle.name}</h3>
          <p className="text-sm text-slate-500">
            {vehicle.plate} · {vehicle.vehicle_type_detail.name} · {vehicle.year}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {CATEGORY_LABEL[vehicle.vehicle_type_detail.category]}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        Odometer: <span className="font-medium text-slate-700">{formatKm(vehicle.current_odometer)}</span>
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(vehicle)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
        >
          {deleteMutation.isPending ? 'Menghapus…' : 'Hapus'}
        </button>
      </div>
    </article>
  )
}
