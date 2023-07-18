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
      <div className="flex flex-col sm:flex-row gap-4 bg-lightGray p-4 rounded-3xl h-[100%] w-[100%] lg:w-full">
        <div className="relative flex-shrink-0 lg:w-[40%] w-full lg:h-full h-40 ">
          <Image
            src={event.image_url || '/assets/images/placeholder/image.png'}
            layout="fill"
            objectFit="cover"
            alt={event.name}
            className="rounded-2xl md:rounded-2xl"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex space-x-2">
            <h4 className=" bg-mintGreen py-1 px-3 mb-2 w-fit rounded-xl text-sm">
              Kegiatan
            </h4>
            {event.is_verified ? (
              <h4 className="bg-paleGreen py-1 px-3 mb-2 w-fit rounded-xl text-sm">
                Terverifikasi
              </h4>
            ) : (
              <h4 className="bg-teal py-1 px-3 mb-2 w-fit rounded-xl text-sm">
                Tidak Terverifikasi
              </h4>
            )}
          </div>
          <h3 className="mb-2">{event.name}</h3>
          <p className="mb-2">{formatter.trimLongText(event.description)}...</p>
          <div className="flex flex-row gap-x-2 mb-2">
            <Participant size={''} />
            <p>{event.total_participant!} orang peserta</p>
          </div>
          <div className="flex flex-row gap-x-2 lg:pb-8">
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
