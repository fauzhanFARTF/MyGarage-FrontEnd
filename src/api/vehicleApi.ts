import { api } from '../lib/api'
import type {
  CreateVehicleInput,
  UpdateVehicleInput,
  Vehicle,
  VehicleType,
} from '../types/vehicle'

/** Daftar kendaraan milik user yang sedang login. */
export async function fetchVehicles(): Promise<Vehicle[]> {
  const { data } = await api.get<Vehicle[]>('/vehicles/')
  return data
}

/** Master tipe kendaraan (untuk dropdown form). */
export async function fetchVehicleTypes(): Promise<VehicleType[]> {
  const { data } = await api.get<VehicleType[]>('/vehicle-types/')
  return data
}

export async function createVehicle(input: CreateVehicleInput): Promise<Vehicle> {
  const { data } = await api.post<Vehicle>('/vehicles/', input)
  return data
}

export async function updateVehicle(id: number, input: UpdateVehicleInput): Promise<Vehicle> {
  const { data } = await api.patch<Vehicle>(`/vehicles/${id}/`, input)
  return data
}

export async function deleteVehicle(id: number): Promise<void> {
  await api.delete(`/vehicles/${id}/`)
}
