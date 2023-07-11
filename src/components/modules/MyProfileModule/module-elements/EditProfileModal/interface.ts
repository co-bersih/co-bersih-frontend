import { UserInterface } from 'src/components/contexts/AuthContext/interface'

export interface editProfileModalProps {
  user: UserInterface | null
  showModal: boolean
  onClose: () => void
}
