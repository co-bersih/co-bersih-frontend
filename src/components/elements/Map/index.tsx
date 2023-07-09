import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapProps } from './interface'
import EventPopup from './Popup/EventPopup'
import ReportPopup from './Popup/ReportPopup'
import { useMemo, useRef, useEffect } from 'react'
import { Button } from '../Button'
import { BiCurrentLocation } from 'react-icons/bi'

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

  const MapWrapper = () => {
    const map = useMap()
    /* eslint-disable react/prop-types */
    useEffect(() => {
      props.onMapReady && props.onMapReady(map)
    }, [props.onMapReady, map])

    const locateUser = () => {
      map.locate({ setView: true, maxZoom: 16 })
    }

    return (
      <div>
        <Button
          variant={'ghost'}
          type="button"
          className="absolute top-4 right-4 z-[400] bg-[#CFE4A5] hover:bg-[#CFE4A5]/80 text-black hover:text-black/80"
          rightIcon={<BiCurrentLocation size="22" />}
          onClick={locateUser}
        >
          <h4>Ambil Dari Lokasi Saya</h4>
        </Button>
      </div>
    )
  }

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
      <MapWrapper /> {/* Add MapWrapper component */}
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
            <Popup>Kegiatan akan dimulai disini!</Popup>
          )}
        </Marker>
      ) : (
        <></>
      )}
    </MapContainer>
  )
}

export default Map
