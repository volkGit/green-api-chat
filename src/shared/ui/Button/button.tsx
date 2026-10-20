import { forwardRef } from 'react'
import clsx from 'clsx'
import type { ButtonProps, ButtonSize } from './types'
import styles from './button.module.scss'

const sizeClassMap: Record<ButtonSize, string> = {
  sm: styles['size-sm'],
  md: styles['size-md'],
  lg: styles['size-lg']
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps> (
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      disabled,
      children,
      onClick,
      ...rest
    },
    ref
  ) => {
  const classes = clsx(
    styles.button,
    styles[variant],
    sizeClassMap[size],
    className,
  )

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={classes}
      onClick={onClick}
      {...rest}>
      {children}
    </button>
  )
})
