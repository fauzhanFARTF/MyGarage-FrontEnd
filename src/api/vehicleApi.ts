import { api } from '../lib/api'
import type { Vehicle } from '../types/vehicle'

/** Daftar kendaraan milik user yang sedang login. */
export async function fetchVehicles(): Promise<Vehicle[]> {
  const { data } = await api.get<Vehicle[]>('/vehicles/')
  return data
}
