import { api } from '../lib/api'
import type { CreateFuelLogInput, FuelLog, FuelSummary } from '../types/fuel'

export async function fetchFuelLogs(vehicleId: number): Promise<FuelLog[]> {
  const { data } = await api.get<FuelLog[]>('/fuel-logs/', { params: { vehicle: vehicleId } })
  return data
}

export async function createFuelLog(input: CreateFuelLogInput): Promise<FuelLog> {
  const { data } = await api.post<FuelLog>('/fuel-logs/', input)
  return data
}

export async function deleteFuelLog(id: number): Promise<void> {
  await api.delete(`/fuel-logs/${id}/`)
}

export async function fetchFuelSummary(vehicleId: number): Promise<FuelSummary> {
  const { data } = await api.get<FuelSummary>('/fuel/summary/', { params: { vehicle: vehicleId } })
  return data
}
