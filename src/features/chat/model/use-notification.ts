import { useEffect } from 'react'
import { useMainStore } from '@/entities/chat/model/store'
import { useDeleteNotification } from './use-delete-notification'
import { useReceiveNotification } from './use-receive-notification'
import { formatTimeFromTimestamp } from '@/shared/utils/format-time'
import { MS_IN_SEC } from '../ui/constants'

export const useChatNotifications = (selectedChat?: string) => {
  const addMessage = useMainStore((state) => state.addMessage)
  const setLastMessage = useMainStore((state) => state.setLastMessage)
  const { data, isSuccess } = useReceiveNotification(Boolean(selectedChat))
  const { mutate: deleteNotification } = useDeleteNotification()

  useEffect(() => {
    if (!isSuccess || !selectedChat || !data?.receiptId) return

    const { body } = data
    const { senderData, idMessage, timestamp } = body
    const text = body.messageData.textMessageData?.textMessage

    if (senderData.sender === selectedChat && text) {
      addMessage(selectedChat, {
        id: Number(idMessage),
        message: text,
        isMe: false
      })
      setLastMessage(selectedChat, {
        name: senderData.chatName,
        lastMessageTime: formatTimeFromTimestamp(timestamp * MS_IN_SEC),
        lastMessage: text
      })
    }

    if (senderData.chatId === selectedChat || senderData.chatType !== 'user') {
      deleteNotification(data.receiptId)
    }
  }, [isSuccess, data, selectedChat, addMessage, deleteNotification])
}
