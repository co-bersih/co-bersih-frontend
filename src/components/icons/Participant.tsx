import React from 'react'
import { IconProps } from './interface'

export const Participant: React.FC<IconProps> = ({
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
        d="M12.3673 11.2829V17.4167H3.96094C3.96068 16.45 4.19541 15.496 4.64715 14.628C5.09889 13.7599 5.75564 13.0007 6.56709 12.4086C7.37854 11.8165 8.32314 11.4073 9.32853 11.2121C10.3339 11.017 11.3734 11.0412 12.3673 11.2829ZM10.686 10.2917C7.89932 10.2917 5.64221 8.16606 5.64221 5.54169C5.64221 2.91731 7.89932 0.791687 10.686 0.791687C13.4727 0.791687 15.7298 2.91731 15.7298 5.54169C15.7298 8.16606 13.4727 10.2917 10.686 10.2917ZM16.9219 13.4584H19.9364V15.0417H16.9219L18.4594 16.4889L17.2707 17.6091L13.7039 14.25L17.2707 10.891L18.4594 12.0112L16.9219 13.4584Z"
        fill="black"
      />
    </svg>
  )
}
