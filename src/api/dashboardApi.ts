import { api } from '../lib/api'
import type { CostSummary, UsageDashboard } from '../types/dashboard'

/** Ambil ringkasan penggunaan kendaraan dalam jendela `days` hari terakhir. */
export async function fetchUsageDashboard(days: number): Promise<UsageDashboard> {
  const { data } = await api.get<UsageDashboard>('/dashboard/usage/', {
    params: { days },
  })
  return data
}

/** Ambil agregasi biaya bulanan (BBM + servis) dalam `months` bulan terakhir. */
export async function fetchCostSummary(months: number): Promise<CostSummary> {
  const { data } = await api.get<CostSummary>('/dashboard/costs/', {
    params: { months },
  })
  return data
}
