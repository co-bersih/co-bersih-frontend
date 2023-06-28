export interface AuthContextInterface {
  user?: UserInterface
  setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
}

export interface UserInterface {
  id: string
  email: string
  name: string
  bio: string
  profileImage: string
  dateJoined: Date
}
