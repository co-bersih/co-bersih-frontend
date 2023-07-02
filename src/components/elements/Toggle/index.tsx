import React from 'react'

import { ToggleProps } from './interface'

export const Toggle: React.FC<ToggleProps> = ({
  items,
  value = 0,
  setValue,
  className,
}) => {
  return (
    <div className={`flex rounded-full bg-black bg-opacity-10 ${className}`}>
      {items.map((item: any, index: any) => (
        <div
          onClick={() => setValue(index)}
          className="flex rounded-l-full cursor-pointer select-none items-center justify-center w-full  "
          key={item}
        >
          {index === value ? (
            <div className="flex bg-coral rounded-full text-white w-full justify-center p-1 m-1">
              <h4>{item}</h4>
            </div>
          ) : (
            <div className="flex text-black w-full justify-center font-semibold">
              <h4>{item}</h4>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
