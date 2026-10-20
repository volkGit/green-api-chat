import { forwardRef } from 'react'
import clsx from 'clsx'
import styles from './input-label.module.scss'
import type { InputLabelProps } from './types'

export const InputLabel = forwardRef<HTMLInputElement, InputLabelProps>(
  (
    { 
      label,
      error,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`

    const inputClasses = clsx(
      styles.input,
      error && styles.error,
      className,
    )

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          {...rest}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    )
  },
)
