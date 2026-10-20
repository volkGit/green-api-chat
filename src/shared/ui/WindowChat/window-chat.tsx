import clsx from 'clsx'
import styles from './window-chat.module.scss'
import type { WindowChatProps } from './types'

export const WindowChat = (
  { 
    messages
  } : WindowChatProps) => {
  return (
    <div className={styles.chat}>
      {messages && messages.map((msg) => (
        <div
          key={msg.id}
          className={clsx(styles.message, msg.isMe ? styles.me : styles.other)}
        >
          <div className={styles.bubble}>
            {msg.message}
          </div>
        </div>
      ))}
    </div>
  )
}
