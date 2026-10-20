import { forwardRef } from 'react'
import clsx from 'clsx'
import styles from './fab-button.module.scss'
import type { ButtonProps } from './types'

export const FabButton = forwardRef<HTMLButtonElement, ButtonProps> (
  (
    {
      title,  
      className,
      onClick,
      ...rest
    },
    ref
  ) => {
  const classes = clsx(
    styles.button,
    styles.primary,
    styles['size-sm'],
    className,
  )

  return (
    <button
      ref={ref}
      type='button'
      className={classes}
      aria-label={title}
      title={title}
      onClick={onClick}
      {...rest}
    />
  )
})