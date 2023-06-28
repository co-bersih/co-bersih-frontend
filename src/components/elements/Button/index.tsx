import React from 'react'
import { ButtonProps } from './interface'

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant,
  onClick,
  leftIcon,
  rightIcon,
  disabled,
  isLoading,
}) => {
  // TODO: Write element's logic

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`${className} flex h-fit select-none items-center justify-center gap-1 rounded-full tracking-wider transition-all p-1
        ${
          variant == 'primary' &&
          ` bg-[#EFEFEE] hover:border-darkGreen hover:border-2 pr-3 ${
            isLoading
              ? 'border-darkGreen disabled:bg-seaGreen'
              : 'disabled:bg-darkGreen'
          } disabled:text-black/50  disabled:drop-shadow-none`
        }
        ${
          variant == 'ghost' &&
          ` hover:bg-teal px-5 hover:text-white ${
            isLoading
              ? 'border-darkGreen disabled:bg-seaGreen'
              : 'disabled:bg-darkGreen'
          } disabled:text-black/50  disabled:drop-shadow-none`
        }
        ${
          variant == 'solid' &&
          ` bg-black px-5 text-white hover:bg-black/80 ${
            isLoading
              ? 'border-darkGreen disabled:bg-seaGreen'
              : 'disabled:bg-darkGreen'
          } disabled:text-black/50  disabled:drop-shadow-none`
        }
        ${
          variant == 'greeny' &&
          ` bg-seaGreen px-5 text-white hover:bg-teal ${
            isLoading
              ? 'border-darkGreen disabled:bg-seaGreen'
              : 'disabled:bg-darkGreen'
          } disabled:text-black/50  disabled:drop-shadow-none`
        }
        ${
          variant == 'deserted' &&
          ` px-5 border-2 border-darkGreen text-darkGreen bg-white hover:bg-mintGreen ${
            isLoading
              ? 'border-darkGreen disabled:bg-seaGreen'
              : 'disabled:bg-darkGreen'
          } disabled:text-black/50  disabled:drop-shadow-none`
        }`}
      >
        {leftIcon && (
          <span className="stroke-current bg-white p-2 justify-center flex rounded-full mr-1">
            {leftIcon}
          </span>
        )}
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-inherit"></div>
        ) : (
          children
        )}
        {rightIcon && <span className="stroke-current">{rightIcon}</span>}
      </button>
    </>
  )
}
