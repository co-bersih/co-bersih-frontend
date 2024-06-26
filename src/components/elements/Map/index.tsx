import L, { LatLngLiteral } from 'leaflet'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapProps } from './interface'
import EventPopup from './Popup/EventPopup'
import ReportPopup from './Popup/ReportPopup'
import { useMemo, useRef, useEffect, useState, useCallback, Ref } from 'react'
import { Button } from '../Button'
import { BiCurrentLocation } from 'react-icons/bi'
import { PopupConfig } from './constant'

/**
 * @param {MapProps} props: MapProps of the Map component
 * @return {React.FC}: A fixed tooltip for "Lokasi Saya"
 */
const MapWrapper: React.FC<MapProps> = (props) => {
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
        <h4>Lokasi Saya</h4>
      </Button>
    </div>
  )
}

const Tile: React.FC<MapProps> = (props) => {
  const map = useMapEvents({
    zoom(e) {
      props.onZoomChange && props.onZoomChange(e.target._zoom)
    },
    moveend(e) {
      props.onMove && props.onMove(e.target._lastCenter)
    },
  })

  return (
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  )
}

export const Map: React.FC<MapProps> = (props: MapProps) => {
  const [currentLoc, setCurrentLoc] = useState<LatLngLiteral>()
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setCurrentLoc({ lat: geo.coords.latitude, lng: geo.coords.longitude })
    })
  }, [])

  return (
    <MapContainer
      center={props.center}
      zoom={11}
      scrollWheelZoom={true}
      className={`z-20 ${props.className} rounded-lg`}
    >
      <Tile {...props} />
      {props.hideMapWrapper ? null : <MapWrapper {...props} />}
      {props.events?.map((event, idx) => (
        <Marker
          position={{ lat: event.latitude, lng: event.longitude }}
          icon={PopupConfig.EVENT_ICON}
          key={idx}
        >
          {props.disablePopup ? (
            <Popup>Kegiatan dimulai disini.</Popup>
          ) : (
            <EventPopup event={event} {...PopupConfig.POPUP_OPTIONS} />
          )}
        </Marker>
      ))}
      {props.reports?.map((report, idx) => (
        <Marker
          position={{ lat: report.latitude, lng: report.longitude }}
          icon={PopupConfig.REPORT_ICON}
          key={idx}
        >
          {props.disablePopup ? (
            <Popup>Laporan dibuat disini.</Popup>
          ) : (
            <ReportPopup report={report} {...PopupConfig.POPUP_OPTIONS} />
          )}
        </Marker>
      ))}
      {props.draggable ? (
        <Marker
          position={{
            lat: props.draggable.locationState.lat,
            lng: props.draggable.locationState.lng,
          }}
          icon={
            props.draggable.icon === 'event'
              ? PopupConfig.EVENT_ICON
              : props.draggable.icon === 'report'
              ? PopupConfig.REPORT_ICON
              : PopupConfig.DEFAULT_ICON
          }
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
      {currentLoc ? (
        <Marker
          position={currentLoc}
          icon={PopupConfig.DEFAULT_ICON}
          draggable={false}
          eventHandlers={eventHandler}
        >
          <Popup>Anda disini.</Popup>
        </Marker>
      ) : (
        <></>
      )}
    </MapContainer>
  )
}

export default Map
