import React from 'react'
import { TipCardProps } from './interface'
import { Information } from '@icons'

export const TipCard: React.FC<TipCardProps> = ({ className, content }) => {
  return (
    <div
      className={`${className} rounded-2xl bg-lightGray p-1 flex gap-x-2 w-full`}
    >
      <div className="p-2 bg-gray-300 rounded-xl">
        <Information size={'w-[2.5rem] h-[2.5rem]'} />
      </div>
      <div className=" align-middle my-auto px-2 md:px-4">
        <p>{content}</p>
      </div>
    </div>
  )
}
