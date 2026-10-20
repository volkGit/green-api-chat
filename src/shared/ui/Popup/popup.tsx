import { useEffect } from 'react'
import clsx from 'clsx'
import styles from './popup.module.scss'
import type { PopupProps } from './types'
import { Button } from '../Button'

export const Popup = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}: PopupProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <div
      className={clsx(styles.overlay, isOpen && styles.isOpen)}
      onClick={handleOverlayClick}
    >
      <div className={styles.popup}>
        <h2 className={styles.title}>{title}</h2>
        {children && (
          <div className={styles.content}>
            {children}
          </div>
        )}
        <Button
          onClick={handleConfirm}
          className={styles.button}>
          Ок
        </Button>
      </div>
    </div>
  )
}
