import { LatLng, LatLngLiteral } from 'leaflet'
import IEvent from 'src/components/modules/EventModule/module-elements/EventCard/interface'

export type MapProps = {
  center: LatLngLiteral
  disablePopup?: boolean
  events?: IEvent[]
  draggable?: {
    locationState: LatLngLiteral
    setLocationState: React.Dispatch<React.SetStateAction<any>>
  }
  // reports?: ...
  className?: string
}
