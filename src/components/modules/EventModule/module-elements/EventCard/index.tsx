import { Button, Icon } from '@elements'
import { Calendar, External, Participant } from '@icons'
import { formatter } from '@utils'
import Image from 'next/image'
import { format } from 'path'

const EventCard: React.FC<IEvent> = (event) => (
  <div className=" bg-lightGray p-4 md:p-6 rounded-3xl flex flex-col sm:flex-row gap-4 h-[330px] w-[100%] sm:w-[90%] md:w-[40vw] lg:h-[300px] lg:w-[35vw]">
    <Image
      src={event.image_url}
      height={200}
      width={120}
      alt={event.name}
      className="h-[30%] sm:h-[100%] w-[100%] sm:w-[120px] object-cover rounded-2xl md:rounded-2xl"
    />
    <div>
      <h3 className="mb-2 md:mb-4">{event.name}</h3>
      <p className="mb-2 md:mb-4">
        {formatter.trimLongText(event.description)}...
      </p>
      <div className="flex flex-row gap-x-2 mb-2">
        <Participant size={''} />
        <p>{1231231} peserta</p>
      </div>
      <div className="flex flex-row gap-x-2 md:mb-4 lg:mb-8">
        <Calendar size={''} />
        <p>
          Starts {formatter.formatDateTimeWIB(event.start_date)}
          {/* -{' '}
          {formatter.formatDateTimeWIB(event.end_date)} */}
        </p>
      </div>
      <div className="flex justify-end">
        <Button className={''} variant={'greeny'}>
          <h4>View Detail</h4>
          <External size={''} />
        </Button>
      </div>
    </div>
  </div>
)

export default EventCard
