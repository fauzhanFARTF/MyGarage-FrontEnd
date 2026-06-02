const idID = 'id-ID'

/** 10600 -> "10.600 km" */
export function formatKm(value: number): string {
  return `${value.toLocaleString(idID)} km`
}

export function formatNumber(value: number): string {
  return value.toLocaleString(idID)
}

/** 400000 -> "Rp400.000" */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat(idID, {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

/** "2026-05-31" -> "31 Mei 2026" */
export function formatDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString(idID, { day: 'numeric', month: 'short', year: 'numeric' })
}
