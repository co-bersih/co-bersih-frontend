import { Button, Icon } from '@elements'
import { Calendar, External, Participant } from '@icons'
import { formatter } from '@utils'
import Image from 'next/image'
import { useRouter } from 'next/router'
import IEvent from './interface'

const EventCard: React.FC<IEvent> = (event) => {
  const router = useRouter()

  return (
    <>
      <div className=" bg-lightGray p-4 md:p-6 rounded-3xl flex flex-col sm:flex-row gap-4 h-fit w-[100%] md:w-[40vw] lg:h-[300px] lg:w-[35vw]">
        <Image
          src={event.image_url || '/assets/images/placeholder/image.png'}
          height={200}
          width={120}
          alt={event.name}
          className="h-[30%] sm:h-[100%] w-[100%] sm:w-[120px] object-cover rounded-2xl md:rounded-2xl"
        />
        <div className="flex flex-col w-full">
          <h3 className="mb-2 md:mb-4">{event.name}</h3>
          <p className="mb-2 md:mb-4">
            {formatter.trimLongText(event.description)}...
          </p>
          <div className="flex flex-row gap-x-2 mb-2">
            <Participant size={''} />
            <p>{event.total_participant!} orang peserta</p>
          </div>
          <div className="flex flex-row gap-x-2 md:mb-4 lg:mb-8">
            <Calendar size={''} />
            <p>
              Dimulai pada{' '}
              {formatter.formatDateTimeWIB(new Date(event.start_date))}
              {/* -{' '}
            {formatter.formatDateTimeWIB(event.end_date)} */}
            </p>
          </div>
          <div className="flex justify-end grow">
            <Button
              className={'mt-auto'}
              variant={'greeny'}
              onClick={() => {
                router.push(`/events/${event.id}`)
              }}
              rightIcon={<External size={'w-[10px] h-[10px]'} />}
            >
              <h4>Lihat Detail</h4>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventCard
