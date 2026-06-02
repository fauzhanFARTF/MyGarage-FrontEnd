import { useQuery } from '@tanstack/react-query'

import { fetchVehicleTypes } from '../../api/vehicleApi'

export function useVehicleTypes() {
  return useQuery({
    queryKey: ['vehicle-types'],
    queryFn: fetchVehicleTypes,
    staleTime: 5 * 60_000, // data master jarang berubah
  })
}
