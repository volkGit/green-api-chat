import { useQuery } from '@tanstack/react-query'
import { useMainStore } from '@/entities/chat/model/store'
import type { ReceiveNotification } from './types'
import { BASE_URL } from '@/shared/api/base-url'

export const useReceiveNotification = (enabled: boolean) => {
  const authData = useMainStore.getState().authData

  return useQuery({
    queryKey: ['RECEIVE_NOTIFICATION', authData?.idInstance],
    queryFn: async () => {
      const receiveUrl = `${BASE_URL}/waInstance${authData?.idInstance}/receiveNotification`
      const response = await fetch(`${receiveUrl}/${authData?.apiTokenInstance}?receiveTimeout=15`)
      return response.json() as Promise<ReceiveNotification>
    },
    staleTime: 0,
    gcTime: 0,
    retry: true,
    enabled,
    refetchInterval: 6000,
  })
}