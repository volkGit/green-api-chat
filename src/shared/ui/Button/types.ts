import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'warning' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = {
  variant?: ButtonVariant
  className?: string
  disabled?: boolean
  size?: ButtonSize
  children: ReactNode,
  onClick?: () => void
}