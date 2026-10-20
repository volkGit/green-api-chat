import { forwardRef, useCallback } from 'react'
import clsx from 'clsx'
import styles from './phone-input.module.scss'
import type { PhoneInputProps } from './types'


const formatPhone = (value: string): string => {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('8')) digits = '7' + digits.slice(1)
  if (!digits.startsWith('7')) digits = '7' + digits
  digits = digits.slice(0, 11)

  const parts = [
    '+7',
    digits.slice(1, 4),
    digits.slice(4, 7),
    digits.slice(7, 9),
    digits.slice(9, 11),
  ]

  return parts.filter(Boolean).join(' ')
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value)
        e.target.value = formatted
        onChange?.(e)
      },
      [onChange],
    )

    const formattedValue = typeof value === 'string' ? formatPhone(value) : value

    return (
      <input
        ref={ref}
        type='tel'
        className={clsx(styles.input, className)}
        value={formattedValue}
        onChange={handleChange}
        {...props}
      />
    )
  },
)