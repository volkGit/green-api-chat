import { useCallback, useState } from 'react'
import { MessageInput } from '@/shared/ui/MessageInput'
import { useSendMessage } from '../model/use-send-message'
import { useMainStore } from '@/entities/chat/model/store'
import { WindowChat } from '@/shared/ui/WindowChat'
import { Popup } from '@/shared/ui/Popup'
import { getChatTitle } from '../model/get-chat-title'
import { useChatNotifications } from '../model/use-notification'
import { DEFAULT_ERROR } from '@/shared/constants'
import styles from './chat.module.scss'

export const Chat = () => {
  const [isOpenError, setIsOpenError] = useState(false)
  const selectedChat = useMainStore((state) => state.selectedChat)
  const messages = useMainStore((state) =>
    selectedChat ? state.chatMessages?.[selectedChat] : undefined
  )
  const addMessage = useMainStore((state) => state.addMessage)
  const displayName = useMainStore((state) =>
    selectedChat ? state.lastMessageData?.[selectedChat]?.name : undefined
  )
  const mainTitle = getChatTitle({ selectedChat, displayName })
  const {mutate: sendMessage, isPending} = useSendMessage()
  const isDisabledSendMessage = isPending || !selectedChat
  useChatNotifications(selectedChat)

  const handleSendMessage = useCallback((message: string) => {
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
  }, [selectedChat, sendMessage, addMessage])

  return (
    <main className={styles.main}>
      <header className={styles.mainHeader}>
        <h1 className={styles.mainTitle}>{mainTitle}</h1>
      </header>
      <div className={styles.mainContent}>
        {messages && <WindowChat
          messages={messages}
        />}
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
