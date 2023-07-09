import { Button, Icon } from '@elements'
import { formatter } from '@utils'
import { Popup } from 'react-leaflet'
import Image from 'next/image'
import { EventPopupProps } from '../interface'
import { Calendar, External, Participant } from '@icons'
import Link from 'next/link'

const EventPopup: React.FC<EventPopupProps> = (props: EventPopupProps) => (
  <Popup maxWidth={props.maxWidth} minWidth={props.minWidth}>
    <div className="">
      <span className=" bg-mintGreen py-1 px-3 w-fit rounded-xl">Event</span>
      <Image
        src={props.event.image_url}
        width={200}
        height={100}
        alt={props.event.name}
        className="mt-1 object-cover w-full h-[80px] rounded-xl"
      />
      <h3>{props.event.name}</h3>
      <div className="flex gap-x-2">
        <Participant size={''} />
        <span>{props.event.total_participant} participants</span>
      </div>
      <div className="flex gap-x-1">
        <Calendar size={''} />
        <span>Starts on {formatter.formatDate(props.event.start_date)}</span>
      </div>
      <div className="flex flex-row justify-end">
        <Link href={`/events/${props.event.id}`}>
          <Button
            className={'w-fit'}
            variant={'greeny'}
            rightIcon={<External size={'w-[10px] h-[10px]'} />}
          >
            View
          </Button>
        </Link>
      </div>
    </div>
  </Popup>
)

export default EventPopup
