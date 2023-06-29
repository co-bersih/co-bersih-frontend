import { ReactNode } from 'react'

export interface ButtonProps {
  className?: string
  rightIcon?: any
  leftIcon?: any
  variant: string
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  isLoading?: boolean
}
