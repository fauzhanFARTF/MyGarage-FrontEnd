import { useState } from 'react'

import { formatRupiah } from '../../lib/format'
import type { MonthlyCost } from '../../types/dashboard'
import { useCostSummary } from './useCostSummary'

const MONTH_OPTIONS = [3, 6, 12] as const
const MONTH_LABEL = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function monthLabel(key: string): string {
  const [year, month] = key.split('-')
  return `${MONTH_LABEL[Number(month) - 1]} ${year.slice(2)}`
}

export function CostSummarySection() {
  const [months, setMonths] = useState<number>(6)
  const { data, isLoading, isError } = useCostSummary(months)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Biaya Bulanan (BBM + Servis)</h2>
        <div className="flex gap-1 rounded-lg border border-slate-200 p-1">
          {MONTH_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setMonths(opt)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                months === opt ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {opt} bln
            </button>
          ))}
        </div>
      </div>

      {isLoading && <p className="text-sm text-slate-400">Memuat…</p>}
      {isError && <p className="text-sm text-red-600">Gagal memuat data biaya.</p>}

      {data && (
        <>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <Total label="BBM" value={data.total_fuel} cls="text-emerald-600" />
            <Total label="Servis" value={data.total_maintenance} cls="text-indigo-600" />
            <Total label="Total" value={data.total} cls="text-slate-900" />
          </div>
          <CostBars series={data.series} />
          <div className="mt-3 flex gap-4 text-xs text-slate-500">
            <Legend cls="bg-emerald-500" label="BBM" />
            <Legend cls="bg-indigo-500" label="Servis" />
          </div>
        </>
      )}
    </section>
  )
}

function CostBars({ series }: { series: MonthlyCost[] }) {
  const max = Math.max(...series.map((s) => s.total), 1)
  if (series.every((s) => s.total === 0)) {
    return <p className="text-sm text-slate-400">Belum ada data biaya pada rentang ini.</p>
  }
  return (
    <div className="flex items-end gap-2 h-40">
      {series.map((s) => (
        <div key={s.month} className="flex flex-1 flex-col items-center justify-end gap-1">
          <div className="flex w-full flex-col justify-end" style={{ height: '100%' }}>
            <div
              className="w-full rounded-t bg-indigo-500"
              style={{ height: `${(s.maintenance / max) * 100}%` }}
              title={`Servis: ${formatRupiah(s.maintenance)}`}
            />
            <div
              className="w-full bg-emerald-500"
              style={{ height: `${(s.fuel / max) * 100}%` }}
              title={`BBM: ${formatRupiah(s.fuel)}`}
            />
          </div>
          <span className="text-[10px] text-slate-400">{monthLabel(s.month)}</span>
        </div>
      ))}
    </div>
  )
}

function Total({ label, value, cls }: { label: string; value: number; cls: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-base font-semibold ${cls}`}>{formatRupiah(value)}</p>
    </div>
  )
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`inline-block h-2.5 w-2.5 rounded-sm ${cls}`} />
      {label}
    </span>
  )
}
