import React from 'react'

import { TabsProps } from './interface'

export const Tabs: React.FC<TabsProps> = ({
  items,
  value = 0,
  setValue,
  className,
}) => {
  return (
    <div className={`flex ${className}`}>
      {items.map((item: any, index: any) => (
        <div
          onClick={() => setValue(index)}
          className={`flex cursor-pointer select-none items-center justify-center w-full ${
            index === value ? 'bg-white' : ''
          } rounded-t-full py-4`}
          key={item}
        >
          {index === value ? (
            <div className="">
              <h3>{item}</h3>
            </div>
          ) : (
            <div className="flex w-full justify-center font-semibold">
              <h3>{item}</h3>
            </div>
          )}

          <div
            className={`
              absolute -bottom-0.5 -mr-0.5 rounded-sm transition-all group-hover:h-0.5 group-hover:w-full
              ${index === value ? 'h-0.5 w-full' : 'h-0 w-0'}
            `}
          ></div>
        </div>
      ))}
    </div>
  )
}
