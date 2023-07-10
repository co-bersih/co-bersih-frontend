import { Button } from '@elements'
import { Calendar, External, Participant } from '@icons'
import { formatter } from '@utils'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IReport } from './interface'

const ReportCard: React.FC<IReport> = (report) => {
  const router = useRouter()

  return (
    <>
      <div className=" bg-lightGray p-4 md:p-6 rounded-3xl flex flex-col sm:flex-row gap-4 h-fit w-[100%] md:w-[40vw] lg:h-[300px] lg:w-[35vw]">
        <Image
          src={report.image_url || '/assets/images/placeholder/image.png'}
          height={200}
          width={120}
          alt={report.title}
          className="h-[30%] sm:h-[100%] w-[100%] sm:w-[120px] object-cover rounded-2xl md:rounded-2xl"
        />
        <div className="flex flex-col w-full">
          <h3 className="mb-2 md:mb-4">{report.title}</h3>
          <p className="mb-2 md:mb-4">
            {formatter.trimLongText(report.description)}...
          </p>
          <div className="flex justify-end grow">
            <Button
              className={'mt-auto'}
              variant={'greeny'}
              onClick={() => {
                router.push(`/reports/${report.id}`)
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

export default ReportCard
