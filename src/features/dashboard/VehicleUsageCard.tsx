import type { VehicleUsage } from '../../types/dashboard'
import { formatDate, formatKm, formatNumber } from '../../lib/format'
import { UsageBars } from './UsageBars'

interface Props {
  vehicle: VehicleUsage
  windowDays: number
}

const CATEGORY_LABEL: Record<VehicleUsage['category'], string> = {
  car: 'Mobil',
  motorcycle: 'Motor',
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-lg font-semibold text-slate-900">{value}</dd>
    </div>
  )
}

export function VehicleUsageCard({ vehicle, windowDays }: Props) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{vehicle.name}</h2>
          <p className="text-sm text-slate-500">
            {vehicle.plate} · {vehicle.type_name} · {vehicle.year}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {CATEGORY_LABEL[vehicle.category]}
        </span>
      </header>

      <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Odometer" value={formatKm(vehicle.current_odometer)} />
        <Stat label={`Jarak ${windowDays} hari`} value={formatKm(vehicle.window_distance)} />
        <Stat label="Rata-rata/hari" value={formatKm(vehicle.window_avg_daily_distance)} />
        <Stat
          label="Hari tercatat"
          value={`${formatNumber(vehicle.window_days_recorded)}/${windowDays}`}
        />
      </dl>

      <section className="mt-5">
        <h3 className="mb-2 text-sm font-medium text-slate-700">
          Pemakaian harian ({windowDays} hari terakhir)
        </h3>
        <UsageBars points={vehicle.usage_series} />
      </section>

      <section className="mt-5">
        <h3 className="mb-2 text-sm font-medium text-slate-700">Catatan terbaru</h3>
        {vehicle.recent_logs.length === 0 ? (
          <p className="text-sm text-slate-400">Belum ada catatan odometer.</p>
        ) : (
          <ul className="divide-y divide-slate-100 text-sm">
            {vehicle.recent_logs.map((log) => (
              <li key={`${log.recorded_at}-${log.value}`} className="flex justify-between py-1.5">
                <span className="text-slate-600">{formatDate(log.recorded_at)}</span>
                <span className="font-medium text-slate-900">{formatKm(log.value)}</span>
                <span className="text-xs uppercase text-slate-400">{log.source}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  )
}
