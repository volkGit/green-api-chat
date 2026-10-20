import { useRef, useState, useEffect, type KeyboardEvent, type ChangeEvent } from 'react'
import clsx from 'clsx'
import styles from './message-input.module.scss'
import type { MessageInputProps } from './types'
import { PLACEHOLDER_CHAT, SEND_MESSAGE } from './constants'

export const MessageInput = ({
  onSend,
  disabled,
  placeholder = PLACEHOLDER_CHAT,
}: MessageInputProps) => {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hasValue = value.trim().length > 0

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    const scrollHeight = textarea.scrollHeight
    textarea.style.height = `${Math.min(scrollHeight, 200)}px`
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  const handleSend = () => {
    if (!hasValue) return
    onSend(value.trim())
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const isDisabled = disabled || !hasValue

  return (
    <div className={styles.container}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
      />
      <button
        type='button'
        className={clsx(styles.button, isDisabled && styles.disabled)}
        onClick={handleSend}
        disabled={isDisabled}
        aria-label={SEND_MESSAGE}
        title={SEND_MESSAGE}
      >
        <svg
          className={styles.icon}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
        </svg>
      </button>
    </div>
  )
}