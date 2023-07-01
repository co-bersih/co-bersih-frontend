import { LatLng, LatLngLiteral } from 'leaflet'

export type MapProps = {
  center: LatLngLiteral
  events?: IEvent[]
  draggable?: {
    locationState: LatLngLiteral
    setLocationState: React.Dispatch<React.SetStateAction<any>> 
  }
  // reports?: ...
  className?: string
}
