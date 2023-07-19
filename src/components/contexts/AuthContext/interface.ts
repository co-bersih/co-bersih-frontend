import { ReactNode } from 'react'

export interface AuthContextProviderProps {
  children: ReactNode
}

export interface AuthContextInterface {
  user: UserInterface | null
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
  tokens: TokensInterface | null
  setTokens: React.Dispatch<React.SetStateAction<TokensInterface | null>>
  saveTokens: (refresh: string, access: string) => void
  loading: boolean
  setLoading: React.Dispatch<any>
}

export interface TokensInterface {
  refresh: string
  access: string
}

export interface UserInterface {
  id: string
  email: string
  name: string
  bio: string
  profileImage: string
  dateJoined: Date
  is_admin?: boolean
}
