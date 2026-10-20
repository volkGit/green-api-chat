import { TITLE } from '../ui/constants'
import type { ChatTitleSource } from './types'

export const getChatTitle = ({ selectedChat, displayName }: ChatTitleSource): string => {
  if (displayName) return `${TITLE} ${displayName}`
  if (selectedChat) return `${TITLE} ${selectedChat}`
  return TITLE
}