import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createFuelLog, deleteFuelLog, fetchFuelLogs, fetchFuelSummary } from '../../api/fuelApi'
import type { CreateFuelLogInput } from '../../types/fuel'

export function useFuelLogs(vehicleId: number | null) {
  return useQuery({
    queryKey: ['fuel-logs', vehicleId],
    queryFn: () => fetchFuelLogs(vehicleId as number),
    enabled: vehicleId !== null,
  })
}

export function useFuelSummary(vehicleId: number | null) {
  return useQuery({
    queryKey: ['fuel-summary', vehicleId],
    queryFn: () => fetchFuelSummary(vehicleId as number),
    enabled: vehicleId !== null,
  })
}

function useInvalidateFuel(vehicleId: number) {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['fuel-logs', vehicleId] })
    queryClient.invalidateQueries({ queryKey: ['fuel-summary', vehicleId] })
    queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    queryClient.invalidateQueries({ queryKey: ['usage-dashboard'] })
  }
}

export function useCreateFuelLog(vehicleId: number) {
  const invalidate = useInvalidateFuel(vehicleId)
  return useMutation({
    mutationFn: (input: CreateFuelLogInput) => createFuelLog(input),
    onSuccess: invalidate,
  })
}

export function useDeleteFuelLog(vehicleId: number) {
  const invalidate = useInvalidateFuel(vehicleId)
  return useMutation({
    mutationFn: (id: number) => deleteFuelLog(id),
    onSuccess: invalidate,
  })
}
