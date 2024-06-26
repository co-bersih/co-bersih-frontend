import React from 'react'
import { IconProps } from './interface'

export const Calendar: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8898 2.37502H18.2524C18.4753 2.37502 18.6891 2.45843 18.8468 2.60689C19.0044 2.75536 19.093 2.95672 19.093 3.16669V15.8334C19.093 16.0433 19.0044 16.2447 18.8468 16.3931C18.6891 16.5416 18.4753 16.625 18.2524 16.625H3.12091C2.89796 16.625 2.68414 16.5416 2.52649 16.3931C2.36884 16.2447 2.28027 16.0433 2.28027 15.8334V3.16669C2.28027 2.95672 2.36884 2.75536 2.52649 2.60689C2.68414 2.45843 2.89796 2.37502 3.12091 2.37502H6.48345V0.791687H8.16472V2.37502H13.2085V0.791687H14.8898V2.37502ZM3.96155 7.12502V15.0417H17.4117V7.12502H3.96155ZM5.64282 10.2917H9.846V13.4584H5.64282V10.2917Z"
        fill="black"
      />
    </svg>
  )
}
