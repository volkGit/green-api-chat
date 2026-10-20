import { useMainStore } from '@/entities/chat/model/store'
import type { ResponseDeleteNotification } from './types'
import { BASE_URL } from '@/shared/api/base-url'

export const deleteNotification = async (receiptId: number | undefined) => {
  const authData = useMainStore.getState().authData

  const response = await fetch(
    `${BASE_URL}/waInstance${authData?.idInstance}/deleteNotification/${authData?.apiTokenInstance}/${receiptId}`,
    {
      method: 'DELETE'
    }
  )

  return response.json() as Promise<ResponseDeleteNotification>
}
  
