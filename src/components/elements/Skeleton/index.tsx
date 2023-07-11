import React from 'react'
import { SkeletonProps } from './interface'

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={` ${className} w-full max-h-[80%] py-auto my-auto bg-gray-400 rounded-3xl dark:bg-gray-700 pulse`}
    >
      <br />
    </div>
  )
}
