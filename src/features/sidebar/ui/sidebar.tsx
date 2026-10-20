
import { useState } from 'react'
import clsx from 'clsx'
import { FabButton } from '@/shared/ui/FabButton'
import { Popup } from '@/shared/ui/Popup'
import { useGetChatId } from '../model/use-get-chat-id'
import { useMainStore } from '@/entities/chat/model/store'
import { PhoneInput } from '@/shared/ui/PhoneInput'
import { DEFAULT_ERROR } from '@/shared/constants'
import { BUTTON_ADD_CHAT, ERROR, SEARCH_PHONE, SIDEBAR_TITLE } from './constants'
import styles from './sidebar.module.scss'

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenError, setIsOpenError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const updateStore = useMainStore(state => state.updateStore)
  const chats = useMainStore(state => state.chats) || []
  const lastMessageData  = useMainStore((state) => state.lastMessageData)
  const selectedChat = useMainStore((state) => state.selectedChat)
  const { mutate: addChat } = useGetChatId()
  const handleConfirm = () => {
    if (!phoneNumber) return

    addChat(Number(phoneNumber.replaceAll(' ', '')), {
      onSuccess: (data) => {
        if (data?.exist && !chats.includes(String(data.chatId))) {
          updateStore({chats: [...chats, String(data.chatId)]})
        } else {
          setIsOpenError(true)
          setErrorMessage(ERROR)
        }
      },
      onError: () => {
        setErrorMessage(DEFAULT_ERROR)
        setIsOpenError(true)
      },
      onSettled: () => {
        setPhoneNumber('')
      }
    })
  }

  const handleSetSelectedChat = (chatId: string) => {
    updateStore({selectedChat: chatId})
  }

  return (
    <aside className={styles.sidebar}>
      <header className={styles.sidebarHeader}>
          <h1 className={styles.sidebarTitle}>{SIDEBAR_TITLE}</h1>
          <FabButton
            onClick={() => setIsOpen(true)}
            aria-label={BUTTON_ADD_CHAT}
            title={BUTTON_ADD_CHAT} />
      </header>
      <div className={styles.sidebarContent}>
          {
            chats?.map((chatId: string) => {
              const infoChat = lastMessageData?.[chatId]
              const classes = [styles.chat]
              if (chatId === selectedChat) {
                classes.push(styles['chat-selected'])
              }
              return(<div
                className={clsx([...classes].join(' '))}
                key={chatId}
                onClick={() => handleSetSelectedChat(chatId)}>
                  { infoChat ? (
                    <>
                      <div className={styles['chat-description']}>
                        <div className={styles['name']}>{infoChat.name}</div>
                        <div>{infoChat.lastMessageTime}</div>
                      </div>
                      <div className={styles['color-secondary']}>{infoChat.lastMessage}</div>
                    </>) :  chatId
                  }
              </div>)
              }
            )
          }
      </div>
      <Popup
        title={SEARCH_PHONE}
        onConfirm={handleConfirm}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}>
        <PhoneInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={styles.input}
        /> 
      </Popup>
      <Popup
        isOpen={isOpenError}
        title={errorMessage}
        onClose={() => setIsOpenError(false)}
        onConfirm={() => setIsOpenError(false)}
      />
    </aside>
  )
}
