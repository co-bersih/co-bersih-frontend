import React from 'react'
import { IconProps } from './interface'

export const CoBersihLogo: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  return (
    <svg
      width="240"
      height="48"
      viewBox="0 0 240 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} ${fill} ${stroke} ${className}`}
    >
      <path
        d="M59.5803 23.64C59.5803 21.168 60.1323 18.96 61.2363 17.016C62.3643 15.048 63.8883 13.524 65.8083 12.444C67.7523 11.34 69.9243 10.788 72.3243 10.788C75.1323 10.788 77.5923 11.508 79.7043 12.948C81.8163 14.388 83.2923 16.38 84.1323 18.924H78.3363C77.7603 17.724 76.9443 16.824 75.8883 16.224C74.8563 15.624 73.6563 15.324 72.2883 15.324C70.8243 15.324 69.5163 15.672 68.3643 16.368C67.2363 17.04 66.3483 18 65.7003 19.248C65.0763 20.496 64.7643 21.96 64.7643 23.64C64.7643 25.296 65.0763 26.76 65.7003 28.032C66.3483 29.28 67.2363 30.252 68.3643 30.948C69.5163 31.62 70.8243 31.956 72.2883 31.956C73.6563 31.956 74.8563 31.656 75.8883 31.056C76.9443 30.432 77.7603 29.52 78.3363 28.32H84.1323C83.2923 30.888 81.8163 32.892 79.7043 34.332C77.6163 35.748 75.1563 36.456 72.3243 36.456C69.9243 36.456 67.7523 35.916 65.8083 34.836C63.8883 33.732 62.3643 32.208 61.2363 30.264C60.1323 28.32 59.5803 26.112 59.5803 23.64ZM96.6811 36.564C94.7611 36.564 93.0331 36.144 91.4971 35.304C89.9611 34.44 88.7491 33.228 87.8611 31.668C86.9971 30.108 86.5651 28.308 86.5651 26.268C86.5651 24.228 87.0091 22.428 87.8971 20.868C88.8091 19.308 90.0451 18.108 91.6051 17.268C93.1651 16.404 94.9051 15.972 96.8251 15.972C98.7451 15.972 100.485 16.404 102.045 17.268C103.605 18.108 104.829 19.308 105.717 20.868C106.629 22.428 107.085 24.228 107.085 26.268C107.085 28.308 106.617 30.108 105.681 31.668C104.769 33.228 103.521 34.44 101.937 35.304C100.377 36.144 98.6251 36.564 96.6811 36.564ZM96.6811 32.172C97.5931 32.172 98.4451 31.956 99.2371 31.524C100.053 31.068 100.701 30.396 101.181 29.508C101.661 28.62 101.901 27.54 101.901 26.268C101.901 24.372 101.397 22.92 100.389 21.912C99.4051 20.88 98.1931 20.364 96.7531 20.364C95.3131 20.364 94.1011 20.88 93.1171 21.912C92.1571 22.92 91.6771 24.372 91.6771 26.268C91.6771 28.164 92.1451 29.628 93.0811 30.66C94.0411 31.668 95.2411 32.172 96.6811 32.172ZM125.506 21.264V25.512H110.242V21.264H125.506ZM144.802 23.352C146.218 23.616 147.382 24.324 148.294 25.476C149.206 26.628 149.662 27.948 149.662 29.436C149.662 30.78 149.326 31.968 148.654 33C148.006 34.008 147.058 34.8 145.81 35.376C144.562 35.952 143.086 36.24 141.382 36.24H130.546V11.112H140.914C142.618 11.112 144.082 11.388 145.306 11.94C146.554 12.492 147.49 13.26 148.114 14.244C148.762 15.228 149.086 16.344 149.086 17.592C149.086 19.056 148.69 20.28 147.898 21.264C147.13 22.248 146.098 22.944 144.802 23.352ZM135.586 21.48H140.194C141.394 21.48 142.318 21.216 142.966 20.688C143.614 20.136 143.938 19.356 143.938 18.348C143.938 17.34 143.614 16.56 142.966 16.008C142.318 15.456 141.394 15.18 140.194 15.18H135.586V21.48ZM140.662 32.136C141.886 32.136 142.834 31.848 143.506 31.272C144.202 30.696 144.55 29.88 144.55 28.824C144.55 27.744 144.19 26.904 143.47 26.304C142.75 25.68 141.778 25.368 140.554 25.368H135.586V32.136H140.662ZM171.607 25.836C171.607 26.556 171.559 27.204 171.463 27.78H156.883C157.003 29.22 157.507 30.348 158.395 31.164C159.283 31.98 160.375 32.388 161.671 32.388C163.543 32.388 164.875 31.584 165.667 29.976H171.103C170.527 31.896 169.423 33.48 167.791 34.728C166.159 35.952 164.155 36.564 161.779 36.564C159.859 36.564 158.131 36.144 156.595 35.304C155.083 34.44 153.895 33.228 153.031 31.668C152.191 30.108 151.771 28.308 151.771 26.268C151.771 24.204 152.191 22.392 153.031 20.832C153.871 19.272 155.047 18.072 156.559 17.232C158.071 16.392 159.811 15.972 161.779 15.972C163.675 15.972 165.367 16.38 166.855 17.196C168.367 18.012 169.531 19.176 170.347 20.688C171.187 22.176 171.607 23.892 171.607 25.836ZM166.387 24.396C166.363 23.1 165.895 22.068 164.983 21.3C164.071 20.508 162.955 20.112 161.635 20.112C160.387 20.112 159.331 20.496 158.467 21.264C157.627 22.008 157.111 23.052 156.919 24.396H166.387ZM179.714 19.392C180.362 18.336 181.202 17.508 182.234 16.908C183.29 16.308 184.49 16.008 185.834 16.008V21.3H184.502C182.918 21.3 181.718 21.672 180.902 22.416C180.11 23.16 179.714 24.456 179.714 26.304V36.24H174.674V16.296H179.714V19.392ZM196.249 36.564C194.617 36.564 193.153 36.276 191.857 35.7C190.561 35.1 189.529 34.296 188.761 33.288C188.017 32.28 187.609 31.164 187.537 29.94H192.613C192.709 30.708 193.081 31.344 193.729 31.848C194.401 32.352 195.229 32.604 196.213 32.604C197.173 32.604 197.917 32.412 198.445 32.028C198.997 31.644 199.273 31.152 199.273 30.552C199.273 29.904 198.937 29.424 198.265 29.112C197.617 28.776 196.573 28.416 195.133 28.032C193.645 27.672 192.421 27.3 191.461 26.916C190.525 26.532 189.709 25.944 189.013 25.152C188.341 24.36 188.005 23.292 188.005 21.948C188.005 20.844 188.317 19.836 188.941 18.924C189.589 18.012 190.501 17.292 191.677 16.764C192.877 16.236 194.281 15.972 195.889 15.972C198.265 15.972 200.161 16.572 201.577 17.772C202.993 18.948 203.773 20.544 203.917 22.56H199.093C199.021 21.768 198.685 21.144 198.085 20.688C197.509 20.208 196.729 19.968 195.745 19.968C194.833 19.968 194.125 20.136 193.621 20.472C193.141 20.808 192.901 21.276 192.901 21.876C192.901 22.548 193.237 23.064 193.909 23.424C194.581 23.76 195.625 24.108 197.041 24.468C198.481 24.828 199.669 25.2 200.605 25.584C201.541 25.968 202.345 26.568 203.017 27.384C203.713 28.176 204.073 29.232 204.097 30.552C204.097 31.704 203.773 32.736 203.125 33.648C202.501 34.56 201.589 35.28 200.389 35.808C199.213 36.312 197.833 36.564 196.249 36.564ZM210.178 13.92C209.29 13.92 208.546 13.644 207.946 13.092C207.37 12.516 207.082 11.808 207.082 10.968C207.082 10.128 207.37 9.43199 207.946 8.87999C208.546 8.30399 209.29 8.01599 210.178 8.01599C211.066 8.01599 211.798 8.30399 212.374 8.87999C212.974 9.43199 213.274 10.128 213.274 10.968C213.274 11.808 212.974 12.516 212.374 13.092C211.798 13.644 211.066 13.92 210.178 13.92ZM212.662 16.296V36.24H207.622V16.296H212.662ZM228.261 16.008C229.773 16.008 231.117 16.344 232.293 17.016C233.469 17.664 234.381 18.636 235.029 19.932C235.701 21.204 236.037 22.74 236.037 24.54V36.24H230.997V25.224C230.997 23.64 230.601 22.428 229.809 21.588C229.017 20.724 227.937 20.292 226.569 20.292C225.177 20.292 224.073 20.724 223.257 21.588C222.465 22.428 222.069 23.64 222.069 25.224V36.24H217.029V9.59999H222.069V18.78C222.717 17.916 223.581 17.244 224.661 16.764C225.741 16.26 226.941 16.008 228.261 16.008Z"
        fill="url(#paint0_linear_2035_8)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.632253 39.6312C0.0155498 38.3302 -0.69366 35.3379 1.40313 33.7766C2.68797 35.2278 6.05935 38.07 9.26621 37.8298C8.75229 33.6766 10.4688 24.079 21.4461 18.9149C23.1893 18.0949 24.8803 17.3184 26.5104 16.5699C37.7121 11.4263 46.0434 7.60074 48.7352 0C56.0945 17.5027 55.3648 46.2365 23.4504 47.4374C20.6933 47.2942 15.6958 46.4802 12.3063 44.402C12.5301 44.4192 12.6956 44.4302 12.7848 44.435C31.0542 39.7186 43.1202 20.8528 46.8695 12.0095C38.2802 27.6327 20.6525 39.256 9.40477 41.2825C9.36189 41.2903 9.31936 41.298 9.2772 41.3057C9.27352 41.298 9.26985 41.2903 9.26621 41.2825C7.5702 41.3326 3.469 41.0724 0.632253 39.6312Z"
        fill="url(#paint1_linear_2035_8)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2035_8"
          x1="259.515"
          y1="40.74"
          x2="62.8079"
          y2="40.74"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#87BE57" />
          <stop offset="1" stop-color="#458549" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2035_8"
          x1="49.028"
          y1="-1.11782e-06"
          x2="1.11386"
          y2="42.2456"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#87BE57" />
          <stop offset="1" stop-color="#458549" />
        </linearGradient>
      </defs>
    </svg>
  )
}
