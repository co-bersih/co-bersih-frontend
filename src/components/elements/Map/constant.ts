import L from 'leaflet'

export namespace PopupConfig {
  export const DEFAULT_ICON = L.icon({
    iconUrl: '/assets/icons/leaflet/marker-icon.png',
    shadowUrl: '/assets/icons/leaflet/marker-shadow.png',
  })
  export const EVENT_ICON = L.icon({
    iconUrl: '/assets/icons/leaflet/marker-event.svg',
    shadowUrl: '/assets/icons/leaflet/marker-shadow-lg.png',
    crossOrigin: false,
  })

  export const REPORT_ICON = L.icon({
    iconUrl: '/assets/icons/leaflet/marker-report.svg',
    shadowUrl: '/assets/icons/leaflet/marker-shadow-lg.png',
    crossOrigin: false,
  })

  export const POPUP_OPTIONS = {
    minWidth: 200,
    maxWidth: 500,
  }
}
