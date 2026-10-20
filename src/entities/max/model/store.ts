import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import type { ChatMessage, MainStore } from './types'

export const useMainStore = create<MainStore>()(
  devtools(
    persist(
      immer((set) => ({
        updateStore: (arg) => set(arg),
        addMessage: (chatId: string, message: ChatMessage) => set((state) => (
          {
            chatMessages: {
              ...state.chatMessages,
              [chatId]: [
                ...(state.chatMessages?.[chatId] || []),
                message,
              ],
            }
          }
        ))
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
