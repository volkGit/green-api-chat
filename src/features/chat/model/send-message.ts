import { useMainStore } from '@/entities/chat/model/store'
import type { ResponseMessage } from './types'
import { BASE_URL } from '@/shared/api/base-url'

export const sendMessage = async (message: string): Promise<ResponseMessage> => {
  const authData = useMainStore.getState().authData
  const chatId = useMainStore.getState().selectedChat

  const response = await fetch(
    `${BASE_URL}/waInstance${authData?.idInstance}/sendMessage/${authData?.apiTokenInstance}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId,
        message
      })
    }
  )

  return await response.json() as Promise<ResponseMessage>
}
  
