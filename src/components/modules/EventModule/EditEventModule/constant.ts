import IEvent from '../module-elements/EventCard/interface'

export const EMPTY_EVENT = {
  id: '',
  host: {
    id: '',
    email: '',
    name: '',
    bio: '',
    profile_image_url: '',
    date_joined: '',
  },
  name: '',
  description: '',
  preparation: '',
  image_url: '',
  image: '',
  latitude: 0,
  longitude: 0,
  start_date: new Date(),
  end_date: new Date(),
  // panitia_ids: [],
  support_ids: [],
  is_verified: true
}
