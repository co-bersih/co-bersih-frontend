import { Button, Icon } from '@elements'
import { formatter } from '@utils'
import Image from 'next/image'
import { format } from 'path'

const EventCard: React.FC<IEvent> = (event) => (
  <div className=" bg-lightGray p-6 rounded-3xl flex gap-4 h-[250px] w-[600px]">
    <Image
      src={event.image_url}
      height={200}
      width={120}
      alt={event.name}
      className="h-[200px] w-[120px] object-cover rounded-2xl"
    />
    <div>
      <h3 className="mb-2">{event.name}</h3>
      <p>{formatter.trimLongText(event.description)}...</p>
      <br />
      <div className="flex flex-row gap-x-2">
        <Icon src={'/assets/icons/participate.svg'} />
        <p>{1231231} peserta</p>
      </div>
      <div className="flex flex-row gap-x-2">
        <Icon src={'/assets/icons/calendar.svg'} />
        <p>
          {formatter.formatDateTimeWIB(event.start_date)} -{' '}
          {formatter.formatDateTimeWIB(event.end_date)}
        </p>
      </div>
      <br />
      <div className="flex justify-end">
        <Button className={''} variant={4}>
          View Detail
          <Icon src={'/assets/icons/external.svg'} />
        </Button>
      </div>
    </div>
  </div>
)

export default EventCard
