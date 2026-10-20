import { useEffect, useState } from 'react'
import { MessageInput } from '@/shared/ui/MessageInput'
import { useSendMessage } from '../model/use-send-message'
import { useMainStore } from '@/entities/max/model/store'
import { useReceiveNotification } from '../model/use-receive-notification'
import { useDeleteNotification } from '../model/use-delete-notification'
import { WindowChat } from '@/shared/ui/WindowChat'
import { formatTimeFromTimestamp } from '@/shared/utils/format-time'
import { Popup } from '@/shared/ui/Popup'
import { DEFAULT_ERROR } from '@/shared/constants'
import { TITLE } from './constants'
import styles from './chat.module.scss'

export const Chat = () => {
  const [isOpenError, setIsOpenError] = useState(false)
  const selectedChat = useMainStore((state) => state.selectedChat)
  const chatMessages = useMainStore((state) => state.chatMessages)
  const lastMessageData  = useMainStore((state) => state.lastMessageData)
  const addMessage = useMainStore((state) => state.addMessage)
  const updateStore = useMainStore((state) => state.updateStore)
  const mainTitle = selectedChat && lastMessageData?.[selectedChat] ?
   `${TITLE} ${lastMessageData[selectedChat]?.name}` :
      selectedChat ? 
        `${TITLE} ${selectedChat}` :
          TITLE
  const {mutate: sendMessage, isPending} = useSendMessage()
  const {refetch: receiveNotification, data: receiverData,
    isSuccess: isSuccessReceiver} = useReceiveNotification()
  const { mutate: deleteNotification } = useDeleteNotification()
  const isDisabledSendMessage = isPending || !selectedChat

  const handleSendMessage = (message: string) => {
    if (!selectedChat) return

    sendMessage(message, {
      onSuccess: (data) => {
        addMessage(selectedChat, {
          id: Number(data.idMessage),
          message,
          isMe: true
        })
      },
      onError: () => {
        setIsOpenError(true)
      }
    })
  }

  useEffect(() => {
    if (selectedChat) {
      receiveNotification()
    }
  }, [selectedChat])

  useEffect(() => {
    if (isSuccessReceiver) {
      if (receiverData?.receiptId && selectedChat) {
        const body = receiverData.body
        const sender = body.senderData
        if (sender.sender === selectedChat && body.messageData.textMessageData) {
          const message = body.messageData.textMessageData.textMessage
          addMessage(selectedChat, {
            id: Number(body.idMessage),
            message,
            isMe: false
          })
          updateStore({lastMessageData: {
            ...lastMessageData,
            [selectedChat]: {
              name: sender.chatName,
              lastMessageTime: formatTimeFromTimestamp(body.timestamp * 1000),
              lastMessage: message
            }
          }})
        }
        if (sender.chatId === selectedChat || sender.chatType !== 'user') {
          deleteNotification(receiverData?.receiptId)
        }
      }
    }
  }, [isSuccessReceiver, deleteNotification, receiverData, selectedChat])

  return (
    <main className={styles.main}>
      <header className={styles.mainHeader}>
        <h1 className={styles.mainTitle}>{mainTitle}</h1>
      </header>
      <div className={styles.mainContent}>
        <WindowChat
          messages={chatMessages && selectedChat ? chatMessages[selectedChat] : []}
        />
      </div>
      <div className={styles.message}>
        <MessageInput
          onSend={handleSendMessage}
          disabled={isDisabledSendMessage}
        />
      </div>
      <Popup
        isOpen={isOpenError}
        title={DEFAULT_ERROR}
        onClose={() => setIsOpenError(false)}
        onConfirm={() => setIsOpenError(false)}
      />
    </main>
  )
}
