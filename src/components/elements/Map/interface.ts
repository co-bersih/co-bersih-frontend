import { LatLng, LatLngLiteral } from 'leaflet'
import IEvent from 'src/components/modules/EventModule/module-elements/EventCard/interface'
import { IReport } from 'src/components/modules/ReportModule/module-elements/ReportCard/interface'
/* eslint-disable react/prop-types */
export type MapProps = {
  center: LatLngLiteral
  disablePopup?: boolean
  events?: IEvent[]
  reports?: IReport[]
  draggable?: {
    locationState: LatLngLiteral
    setLocationState: React.Dispatch<React.SetStateAction<any>>
  }
  className?: string
  onMapReady?: (map: L.Map) => void
  hideMapWrapper?: boolean
}
