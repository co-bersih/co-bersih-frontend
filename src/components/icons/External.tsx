import React from 'react'
import { IconProps } from './interface'

export const External: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  return (
    <svg
      className={`${size} ${fill} ${stroke} ${className}`}
      viewBox="0 0 14 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0044 3.414L2.3974 12.021L0.983398 10.607L9.5894 2H2.0044V0H13.0044V11H11.0044V3.414V3.414Z"
        fill={fill === 'fill-current' ? `white` : fill}
      />
    </svg>
  )
}
