import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  AuthContextInterface,
  UserInterface,
  TokensInterface,
  AuthContextProviderProps,
} from './interface'
import axios from 'axios'
import { useRouter } from 'next/router'
import { validateJwtExp } from '@utils'
import { cfg } from 'src/config'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInterface | null>(null)
  const [tokens, setTokens] = useState<TokensInterface | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  function saveTokens(refresh: string, access: string) {
    localStorage.setItem('refreshToken', refresh)
    localStorage.setItem('accessToken', access)
    setTokens({ refresh, access })
  }

  useEffect(() => {
    const storedRefreshToken = localStorage.getItem('refreshToken')
    const storedAccessToken = localStorage.getItem('accessToken')

    if (storedRefreshToken && storedAccessToken) {
      setTokens({ refresh: storedRefreshToken, access: storedAccessToken })
    }
    setLoading(false)
  }, [])

  const getUser = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${cfg.API}/api/v1/user/`,
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
      }

      const response = await axios.request(config)
      const userData = response.data

      const user: UserInterface = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        bio: userData.bio,
        profileImage: userData.profile_image_url,
        dateJoined: userData.date_joined,
      }

      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (tokens) {
      getUser()
    }
  }, [tokens])

  useEffect(() => {
    const handleRefreshToken = async () => {
      if (tokens && !validateJwtExp(tokens.access)) {
        try {
          axios
            .post(`${cfg.API}/api/v1/token/refresh/`, {
              refresh: tokens.refresh,
            })
            .then((response) => {
              localStorage.setItem('accessToken', response.data.access)
              saveTokens(tokens.refresh, response.data.access)
              console.log('yes')
            })
            .catch((error) => {
              handleTokenRefreshError()
            })
        } catch (error) {
          handleTokenRefreshError()
        }
      }
    }

    handleRefreshToken()
  }, [tokens])

  const handleTokenRefreshError = () => {
    setUser(null)
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    router.push('/auth/login')
  }

  const contextValue: AuthContextInterface = {
    user,
    setUser,
    tokens,
    setTokens,
    saveTokens,
    loading,
    setLoading,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
