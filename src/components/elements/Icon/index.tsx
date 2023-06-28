import Image from 'next/image'
import React from 'react'
import { IconProps } from './interface'

export const Icon: React.FC<IconProps> = ({ src, className, size }) => {
  let sizeNum: number
  switch (size) {
    case 'S':
      sizeNum = 12
    case 'M':
      sizeNum = 18
    case 'L':
      sizeNum = 24
    default:
      sizeNum = 18
  }

  return (
    <Image
      src={src}
      height={sizeNum}
      width={sizeNum}
      alt={src.split('.', 1)[0]}
      className={` ${className}`}
    />
  )
}
