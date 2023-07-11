import { Button, Icon } from '@elements'
import { formatter } from '@utils'
import { Popup } from 'react-leaflet'
import Image from 'next/image'
import { ReportPopupProps } from '../interface'
import { External, Participant } from '@icons'
import { GrCircleInformation } from 'react-icons/gr'
import Link from 'next/link'

const ReportPopup: React.FC<ReportPopupProps> = (props: ReportPopupProps) => (
  <Popup maxWidth={props.maxWidth} minWidth={props.minWidth}>
    <span className=" bg-coral py-1 px-3 w-fit rounded-xl text-white">
      Laporan
    </span>
    <div className="flex flex-col sm:flex-row gap-4 h-[200px] w-[25vw] mt-1">
      <Image
        src={props.report.image_url || '/assets/images/placeholder/image.png'}
        height={200}
        width={120}
        alt={props.report.title}
        className="h-[30%] sm:h-[100%] w-[100%] sm:w-1/3 object-cover rounded-2xl md:rounded-2xl"
      />
      <div className="flex flex-col w-full overflow-y-auto">
        <h4>{props.report.title}</h4>
        <div className="flex flex-row gap-x-2 items-center">
          <Participant size={''} />
          <span className="whitespace-nowrap">
            Dilaporkan oleh {props.report.reporter.name}
          </span>
        </div>
        <div className="flex flex-row gap-x-2 items-start">
          <GrCircleInformation className="w-5 h-5" />
          <span>{formatter.trimLongText(props.report.description)}...</span>
        </div>

        <div className="flex justify-end grow">
          <Link href={`/reports/${props.report.id}`}>
            <Button
              className={'mt-auto'}
              variant={'greeny'}
              rightIcon={<External size={'w-[10px] h-[10px]'} />}
            >
              <h4>Lihat</h4>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </Popup>
)

export default ReportPopup
