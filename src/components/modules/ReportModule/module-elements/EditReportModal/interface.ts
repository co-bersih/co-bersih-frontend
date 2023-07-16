import { IReport } from '../ReportCard/interface'

export interface editReportModalProps {
  report: IReport | null
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
