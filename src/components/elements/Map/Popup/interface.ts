interface PopupProps {
  minWidth: number
  maxWidth: number
}

export interface EventPopupProps extends PopupProps {
  event: IEvent
}