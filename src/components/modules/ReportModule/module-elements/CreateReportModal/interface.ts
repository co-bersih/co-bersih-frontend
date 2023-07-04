export interface createReportModalProps {
  showModal: boolean
  onClose: () => void
}

export interface CreateEventForm {
  name: string
  description: string
  preparation: string
  image: FileList
  latitude: number
  longitude: number
  start_date: string // ?
  end_date: string // ?
}
