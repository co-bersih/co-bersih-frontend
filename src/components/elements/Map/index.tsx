import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapProps } from './interface'
import EventPopup from './Popup/EventPopup'

const eventIcon = L.icon({
  iconUrl: 'assets/icons/leaflet/marker-event.svg',
  shadowUrl: 'assets/icons/leaflet/marker-shadow-lg.png',
  crossOrigin: false,
})

const options = {
  minWidth: 200,
  maxWidth: 500,
}

const Map: React.FC<MapProps> = (props: MapProps) => (
  <MapContainer
    center={props.center}
    zoom={11}
    scrollWheelZoom={true}
    className="
    min-w-[90vw] min-h-[500px] 
    md:w-[80vw]
    lg:w-[65vw]
    z-20 rounded-3xl"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {props.events.map((event, idx) => (
      <Marker
        position={{ lat: event.latitude, lng: event.longitude }}
        icon={eventIcon}
        key={idx}
      >
        <EventPopup event={event} {...options} />
      </Marker>
    ))}
  </MapContainer>
)

export default Map
