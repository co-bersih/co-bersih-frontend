import IEvent from 'src/components/modules/EventModule/module-elements/EventCard/interface'

interface PopupProps {
  minWidth: number
  maxWidth: number
}

export interface EventPopupProps extends PopupProps {
  event: IEvent
}
