import { Button, Icon } from "@elements";
import { formatter } from "@utils";
import { Popup } from "react-leaflet";
import Image from "next/image";
import { EventPopupProps } from "../interface";

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
        <Icon src="assets/icons/participate.svg"/>
        <span>{props.event.total_participant} participants</span>
      </div>
      <div className="flex gap-x-1">
        <Icon src="assets/icons/calendar.svg"/>
        <span>Starts on {formatter.formatDate(props.event.start_date)}</span>
      </div>
      <div className="flex flex-row justify-end">
        <Button className={"w-fit"} variant={4}>
          View
          <Icon src="assets/icons/external.svg" />
        </Button>
      </div>
    </div>
  </Popup>
)

export default EventPopup