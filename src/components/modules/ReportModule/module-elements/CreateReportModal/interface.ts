export interface createReportModalProps {
  showModal: boolean
  onClose: () => void
}

export interface CreateReportForm {
  title: string
  description: string
  image: FileList
  latitude: number
  longitude: number
}
