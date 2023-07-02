import React from 'react'
import { IconProps } from './interface'

export const Money: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  return (
    <svg
      className={`${size} ${fill} ${stroke} ${className}`}
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.838 0.297303C16.9647 0.296288 19.0275 1.02443 20.6823 2.36029C22.3372 3.69614 23.484 5.55896 23.9315 7.63806C24.3791 9.71716 24.1003 11.8869 23.1417 13.7853C22.1831 15.6837 20.6026 17.1961 18.6638 18.0702C18.0441 19.4403 17.1013 20.6397 15.9163 21.5654C14.7313 22.4911 13.3395 23.1155 11.8601 23.3852C10.3808 23.6549 8.8581 23.5617 7.42267 23.1137C5.98725 22.6656 4.68192 21.8761 3.61862 20.8128C2.55533 19.7495 1.76581 18.4442 1.31778 17.0088C0.869744 15.5733 0.776566 14.0507 1.04623 12.5713C1.3159 11.092 1.94037 9.70012 2.86608 8.51511C3.79179 7.3301 4.99111 6.38732 6.3612 5.7676C7.09817 4.13696 8.28991 2.75353 9.79346 1.78325C11.297 0.81297 13.0486 0.297027 14.838 0.297303V0.297303ZM11.3515 8.43244H9.0272V9.5946C8.27192 9.59276 7.54562 9.88511 7.00223 10.4097C6.45884 10.9342 6.14107 11.6498 6.11629 12.4047C6.0915 13.1595 6.36165 13.8944 6.86946 14.4535C7.37727 15.0125 8.08284 15.3519 8.8366 15.3996L9.0272 15.4054H11.3515L11.4561 15.4147C11.5901 15.439 11.7113 15.5095 11.7986 15.614C11.8859 15.7185 11.9337 15.8503 11.9337 15.9865C11.9337 16.1226 11.8859 16.2545 11.7986 16.359C11.7113 16.4635 11.5901 16.534 11.4561 16.5583L11.3515 16.5676H6.70287V18.8919H9.0272V20.0541H11.3515V18.8919C12.1068 18.8937 12.8331 18.6014 13.3765 18.0768C13.9199 17.5523 14.2376 16.8367 14.2624 16.0818C14.2872 15.327 14.0171 14.5921 13.5093 14.033C13.0014 13.474 12.2959 13.1346 11.5421 13.0869L11.3515 13.0811H9.0272L8.9226 13.0718C8.78863 13.0475 8.66742 12.977 8.58014 12.8725C8.49286 12.768 8.44505 12.6362 8.44505 12.5C8.44505 12.3639 8.49286 12.232 8.58014 12.1275C8.66742 12.023 8.78863 11.9525 8.9226 11.9282L9.0272 11.9189H13.6758V9.5946H11.3515V8.43244ZM14.838 2.62163C13.8533 2.62047 12.8796 2.82842 11.9812 3.23172C11.0829 3.63501 10.2804 4.22446 9.62687 4.96106C10.9404 4.88132 12.2559 5.08134 13.4864 5.54789C14.7169 6.01444 15.8343 6.7369 16.7648 7.66748C17.6953 8.59806 18.4176 9.71558 18.884 10.9461C19.3504 12.1767 19.5503 13.4922 19.4704 14.8057C20.527 13.8663 21.2731 12.6278 21.6097 11.2545C21.9463 9.88128 21.8575 8.43815 21.355 7.11655C20.8525 5.79494 19.9602 4.65732 18.7963 3.85454C17.6323 3.05177 16.2519 2.62179 14.838 2.62163V2.62163Z"
        fill="#458549"
      />
    </svg>
  )
}