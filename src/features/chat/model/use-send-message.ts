import { useMutation } from '@tanstack/react-query'
import { sendMessage } from './send-message'

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage
  })
}