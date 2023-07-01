import React from 'react'
import { IconProps } from './interface'

export const MagnifyingGlass: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.4553 19.6723L17.1675 14.384C18.0659 12.9537 18.5874 11.2631 18.5874 9.44879C18.5874 4.31584 14.4262 0.155304 9.29348 0.155304C4.16073 0.155304 0 4.31584 0 9.44879C0 14.5819 4.16054 18.7421 9.29348 18.7421C11.2679 18.7421 13.0968 18.1248 14.6017 17.0759L19.8266 22.3012C20.1896 22.6639 20.6656 22.8445 21.141 22.8445C21.6169 22.8445 22.0923 22.6639 22.4559 22.3012C23.1814 21.5749 23.1814 20.3984 22.4553 19.6723ZM9.29348 15.7311C5.82421 15.7311 3.01153 12.9186 3.01153 9.44918C3.01153 5.97971 5.82421 3.16703 9.29348 3.16703C12.763 3.16703 15.5754 5.97971 15.5754 9.44918C15.5754 12.9186 12.763 15.7311 9.29348 15.7311Z"
        fill="black"
      />
    </svg>
  )
}
