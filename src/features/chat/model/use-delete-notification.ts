import { useMutation } from '@tanstack/react-query'
import { deleteNotification } from './delete-notification'

export const useDeleteNotification = () => {
  return useMutation({
    mutationFn: deleteNotification
  })
}