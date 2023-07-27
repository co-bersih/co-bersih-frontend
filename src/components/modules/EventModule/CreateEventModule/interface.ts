export interface CreateEventForm {
  name: string
  description: string
  preparation: string
  image: FileList
  latitude: number
  longitude: number
  start_date: Date
  end_date: Date
  bank_code?: string
  account_number?: string
}
