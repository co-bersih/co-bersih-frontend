import { UserInterface } from 'src/components/contexts/AuthContext/interface'
// eslint-disable-next-line no-unused-vars
interface IEvent {
  id: string
  host: {
    id: string
    email: string
    name: string
    bio: string
    profile_image: string
    date_joined: string
  }
  name: string
  description: string
  preparation: string
  image_url: string
  latitude: number
  longitude: number
  start_date: Date
  end_date: Date
  panitia_ids: string[]
  support_ids: string[]
  total_participant?: number
}

export default IEvent
