import React from 'react'
import { FilterButtonProps } from './interface'

export const FilterButton: React.FC<FilterButtonProps> = ({
  className,
  rightIconL,
  rightIconR,
  childrenL,
  childrenR,
  onClickL,
  onClickR,
  disabledL,
  disabledR,
}) => {
  return (
    <>
      <div className={`flex ${className}`}>
        <button
          onClick={onClickL}
          disabled={disabledL}
          className="flex h-fit select-none items-center justify-center gap-1 rounded-l-full transition-all p-1 px-5 w-full
         bg-seaGreen hover:bg-seaGreen/90 disabled:bg-seaGreen text-white"
        >
          {childrenL}

          {rightIconL && (
            <span className="stroke-current ml-1">{rightIconL}</span>
          )}
        </button>
        <button
          onClick={onClickR}
          disabled={disabledR}
          className="flex h-fit select-none items-center justify-center gap-1 rounded-r-full tracking-wider transition-all p-1 px-5 w-full
         bg-darkGreen hover:bg-darkGreen/90 disabled:bg-seaGreen text-white"
        >
          {childrenR}

          {rightIconR && (
            <span className="stroke-current ml-1">{rightIconR}</span>
          )}
        </button>
      </div>
    </>
  )
}
