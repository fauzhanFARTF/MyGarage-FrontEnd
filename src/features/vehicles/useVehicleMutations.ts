import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createVehicle, deleteVehicle, updateVehicle } from '../../api/vehicleApi'
import type { CreateVehicleInput, UpdateVehicleInput } from '../../types/vehicle'

function useInvalidateVehicles() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    queryClient.invalidateQueries({ queryKey: ['usage-dashboard'] })
  }
}

export function useCreateVehicle() {
  const invalidate = useInvalidateVehicles()
  return useMutation({
    mutationFn: (input: CreateVehicleInput) => createVehicle(input),
    onSuccess: invalidate,
  })
}

export function useUpdateVehicle() {
  const invalidate = useInvalidateVehicles()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateVehicleInput }) =>
      updateVehicle(id, input),
    onSuccess: invalidate,
  })
}

export function useDeleteVehicle() {
  const invalidate = useInvalidateVehicles()
  return useMutation({
    mutationFn: (id: number) => deleteVehicle(id),
    onSuccess: invalidate,
  })
}
