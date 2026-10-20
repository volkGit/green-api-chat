import type { InputHTMLAttributes} from 'react'

export interface InputLabelProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
}