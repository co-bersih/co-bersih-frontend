import IEvent from 'src/components/modules/EventModule/module-elements/EventCard/interface'
import { IReport } from 'src/components/modules/ReportModule/module-elements/ReportCard/interface'

interface PopupProps {
  minWidth: number
  maxWidth: number
}

export interface EventPopupProps extends PopupProps {
  event: IEvent
}

export interface ReportPopupProps extends PopupProps {
  report: IReport
}
