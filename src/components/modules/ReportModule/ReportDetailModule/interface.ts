// eslint-disable-next-line no-unused-vars
export interface IReport {
  id: string
  title: string
  image_url: string
  reporter: {
    id: string
    email: string
    name: string
    date_joined: string
    bio: string
    profile_image_url: string
  }
  reported_date: Date
  description: string
  latitude: number
  longitude: number
}
