import { Button, Icon } from '@elements'
import { formatter } from '@utils'
import { Popup } from 'react-leaflet'
import Image from 'next/image'
import { ReportPopupProps } from '../interface'
import { External, Participant } from '@icons'

const ReportPopup: React.FC<ReportPopupProps> = (props: ReportPopupProps) => (
  <Popup maxWidth={props.maxWidth} minWidth={props.minWidth}>
    <span className=" bg-mintGreen py-1 px-3 w-fit rounded-xl">Report</span>
    <div className="flex flex-col sm:flex-row gap-4 h-[200px] w-[25vw]">
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
          <span>Reported by {props.report.reporter.name}</span>
        </div>
        <span className="mb-2 md:mb-4">
          {formatter.trimLongText(props.report.description)}...
        </span>
        <div className="flex justify-end grow">
          <Button
            className={'mt-auto'}
            variant={'greeny'}
            rightIcon={<External size={'w-[10px] h-[10px]'} />}
          >
            <h4>View</h4>
          </Button>
        </div>
      </div>
    </div>
  </Popup>
)

export default ReportPopup
