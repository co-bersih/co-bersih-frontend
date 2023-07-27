import { UserInterface } from 'src/components/contexts/AuthContext/interface'
// eslint-disable-next-line no-unused-vars
interface IEvent {
  id: string
  host: {
    id: string
    email: string
    name: string
    date_joined: string
    bio: string
    profile_image_url: string
  }
  name: string
  total_participant?: number
  description: string
  preparation: string
  image_url: string
  latitude: number
  longitude: number
  start_date: Date
  end_date: Date
  is_verified: boolean
  staffs?: string[]
  support_ids: string[]
  payment_url?: string
  total_donation?: number
}

export default IEvent
