import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { enableMapSet } from 'immer'
import { devtools } from 'zustand/middleware'
import type { ChatMessage, MainStore, ChatData } from './types'

const initialState = {
  messagesMap: new Map<number, ChatMessage>()
}

enableMapSet()

export const useMainStore = create<MainStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        updateStore: (arg) => set(arg),
        addMessage: (chatId: string, message: ChatMessage) => {
          const { messagesMap } = get()

          if (!messagesMap || !messagesMap.get(message.id)) {
            set((state) => ({
              chatMessages: {
                ...state.chatMessages,
                [chatId]: [
                  ...(state.chatMessages?.[chatId] || []),
                  message,
                ],
              }
            }))

            set((state) => ({
                messagesMap: new Map(state.messagesMap).set(message.id, message)
            }))
          }
        },
        setLastMessage: (chatId: string, message: ChatData) => set((state) => (
          {
            lastMessageData: {
              ...state.lastMessageData,
              [chatId]: message,
            }
          }
        )),
      })),
      {
        name: 'max-storage',
        partialize: (state: MainStore) => ({
          authData: state.authData,
          chats: state.chats,
          chatMessages: state.chatMessages,
          lastMessageData: state.lastMessageData
        }),
      }
    )
  )
)
