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
      <div className="flex flex-col sm:flex-row gap-4 bg-lightGray p-4 rounded-3xl h-fit w-[100%] lg:h-[320px] lg:w-[35vw]">
        <Image
          src={report.image_url || '/assets/images/placeholder/image.png'}
          height={200}
          width={120}
          alt={report.title}
          className="h-[100%] lg:w-[40%] w-[100%] object-cover rounded-2xl md:rounded-2xl"
        />
        <div className="flex flex-col w-full">
          <h4 className=" bg-coral py-1 px-3 mb-2 w-fit rounded-xl text-white text-sm">
            Laporan
          </h4>
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
