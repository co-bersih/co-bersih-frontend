import React, { createContext, useContext, useState } from 'react'
import { AuthContextInterface, UserInterface } from './interface'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC = () => {
  const [user, setUser] = useState<UserInterface | undefined>()

  const contextValue = { user, setUser }

  return <AuthContext.Provider value={contextValue}></AuthContext.Provider>
}
