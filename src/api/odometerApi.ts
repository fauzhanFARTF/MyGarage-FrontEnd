import { api } from '../lib/api'
import type { CreateOdometerLogInput, OdometerLog } from '../types/odometer'

/** Daftar log odometer satu kendaraan. */
export async function fetchOdometerLogs(vehicleId: number): Promise<OdometerLog[]> {
  const { data } = await api.get<OdometerLog[]>('/odometer-logs/', {
    params: { vehicle: vehicleId },
  })
  return data
}

/** Catat nilai odometer baru (validasi monoton/lonjakan dilakukan backend). */
export async function createOdometerLog(input: CreateOdometerLogInput): Promise<OdometerLog> {
  const { data } = await api.post<OdometerLog>('/odometer-logs/', input)
  return data
}
