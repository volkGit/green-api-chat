import { useMainStore } from '@/entities/chat/model/store'
import type { ResponseChatId } from './types'
import { BASE_URL } from '@/shared/api/base-url'

export const getChatId = async (phoneNumber: number) => {
  const authData = useMainStore.getState().authData

  const response = await fetch(
      `${BASE_URL}/waInstance${authData?.idInstance}/checkAccount/${authData?.apiTokenInstance}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        force: true
      })
    }
  )

  return await response.json() as Promise<ResponseChatId>
}
  