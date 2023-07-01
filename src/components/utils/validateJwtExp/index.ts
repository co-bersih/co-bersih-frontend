import { ParseJwtInterface } from './interface'

const parseJwt = (token: string): ParseJwtInterface => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

export const validateJwtExp = (token: string | undefined | null | boolean) => {
  const rawToken = (token as string).includes('Bearer')
    ? (token as string).split(' ')[1]
    : (token as string)

  const { exp, iat } = parseJwt(rawToken)

  const now = Math.round(new Date().getTime() / 1000)

  const timeElapsed = now - iat
  const timeRemaining = exp - iat

  return timeElapsed < timeRemaining
}
