import { useMutation } from '@tanstack/react-query'
import { getChatId } from './get-chat-id'

export const useGetChatId = () => {
  return useMutation({
    mutationFn: getChatId
  })
}
