import { LatLngLiteral } from 'leaflet'

export type MapProps = {
  center: LatLngLiteral
  events: IEvent[]
}
