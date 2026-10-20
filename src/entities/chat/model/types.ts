export type AuthData = {
  idInstance: string
  apiTokenInstance: string
}

export type ChatMessage = {
  id: number
  message: string
  isMe: boolean
}

type ChatMessages = {
  [key: string]: ChatMessage[]
}

export type ChatData = {
  name: string
  lastMessageTime: string
  lastMessage: string
}

type LastMessageData = {
  [key: string]: ChatData
}

type StoreMax = {
  authData?: AuthData
  chats?: string[]
  lastMessageData?: LastMessageData
  chatMessages?: ChatMessages
  selectedChat?: string
}

export type MainStore = StoreMax & {
  updateStore: (arg: Partial<StoreMax> | ((state: MainStore) => void)) => void
  addMessage: (chatId: string, message: ChatMessage) => void
  setLastMessage: (chatId: string, message: ChatData) => void
}
