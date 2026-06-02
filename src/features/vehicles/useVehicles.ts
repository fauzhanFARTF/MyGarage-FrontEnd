import { useQuery } from '@tanstack/react-query'

import { fetchVehicles } from '../../api/vehicleApi'

export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  })
}
