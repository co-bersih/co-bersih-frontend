import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapProps } from './interface'
import EventPopup from './Popup/EventPopup'
import ReportPopup from './Popup/ReportPopup'
import { useMemo, useRef } from 'react'

const defaultIcon = L.icon({
  iconUrl: '/assets/icons/leaflet/marker-icon.png',
  shadowUrl: '/assets/icons/leaflet/marker-shadow.png',
})
const eventIcon = L.icon({
  iconUrl: '/assets/icons/leaflet/marker-event.svg',
  shadowUrl: '/assets/icons/leaflet/marker-shadow-lg.png',
  crossOrigin: false,
})

const reportIcon = L.icon({
  iconUrl: '/assets/icons/leaflet/marker-report.svg',
  shadowUrl: '/assets/icons/leaflet/marker-shadow-lg.png',
  crossOrigin: false,
})

const options = {
  minWidth: 200,
  maxWidth: 500,
}

export const Map: React.FC<MapProps> = (props: MapProps) => {
  const markerRef = useRef(null)
  const eventHandler = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          props.draggable?.setLocationState((marker as any).getLatLng())
        }
      },
    }),
    []
  )

  return (
    <MapContainer
      center={props.center}
      zoom={11}
      scrollWheelZoom={true}
      className={`z-20 ${props.className} rounded-lg`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.events?.map((event, idx) => (
        <Marker
          position={{ lat: event.latitude, lng: event.longitude }}
          icon={eventIcon}
          key={idx}
        >
          {props.disablePopup ? (
            <></>
          ) : (
            <EventPopup event={event} {...options} />
          )}
        </Marker>
      ))}
      {props.reports?.map((report, idx) => (
        <Marker
          position={{ lat: report.latitude, lng: report.longitude }}
          icon={reportIcon}
          key={idx}
        >
          {props.disablePopup ? (
            <></>
          ) : (
            <ReportPopup report={report} {...options} />
          )}
        </Marker>
      ))}
      {props.draggable ? (
        <Marker
          position={{
            lat: props.draggable.locationState.lat,
            lng: props.draggable.locationState.lng,
          }}
          icon={defaultIcon}
          draggable={true}
          eventHandlers={eventHandler}
          ref={markerRef}
        >
          {props.disablePopup ? (
            <></>
          ) : (
            <Popup>Event akan dimulai disini!</Popup>
          )}
        </Marker>
      ) : (
        <></>
      )}
    </MapContainer>
  )
}

export default Map
