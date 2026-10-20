import type { ReactNode } from 'react'

export type PopupProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  children?: ReactNode
}
