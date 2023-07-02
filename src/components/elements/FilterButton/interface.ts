import { ReactNode } from 'react'

export interface FilterButtonProps {
  className?: string
  rightIconL?: any
  rightIconR?: any
  childrenL?: ReactNode
  childrenR?: ReactNode
  onClickL?: () => void
  onClickR?: () => void
  disabledL?: boolean
  disabledR?: boolean
}
