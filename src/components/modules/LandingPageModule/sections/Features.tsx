import { CoBersihLogo } from '@icons'
import { AiOutlineCloseCircle, AiOutlineHeatMap } from 'react-icons/ai'
import { BiSolidLeaf } from 'react-icons/bi'
import { FeatureCard } from '../module-elements/FeatureCard'
import {
  RiArticleLine,
  RiTreasureMapFill,
  RiTreasureMapLine,
} from 'react-icons/ri'

export const Features: React.FC<any> = () => {
  return (
    <div className="min:h-screen h-fit flex flex-col items-center justify-center bg-mintGreen space-y-3">
      <div className="flex flex-col items-center lg:justify-between justify-center lg:px-0 px-10 lg:-mb-0 -mb-12 h-fit ">
        <h1>Platform untuk Kebersihan Lingkungan</h1>
        <br />
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-10 h-fit mb-16 sm:mb-10">
          <FeatureCard
            icon={<BiSolidLeaf className="w-[40px] h-[40px]" />}
            title={'Kegiatan'}
            text={
              'Buat atau bergabung dengan kegiatan pembersihan lingkungan, baik sebagai panitia maupun sebagai sukarelawan!'
            }
          />
          <FeatureCard
            icon={<AiOutlineCloseCircle size="40" />}
            title={'Laporan'}
            text={
              'Laporkan segala pencemaran dan kontaminasi lingkungan supaya ada kesadaran di komunitasmu.'
            }
          />
          <FeatureCard
            icon={<RiArticleLine size="40" />}
            title={'Artikel'}
            text={
              'Dapatkan edukasi dan informasi dalam bentuk artikel terkait lingkungan dan penanganan sampah.'
            }
          />
          <FeatureCard
            icon={<RiTreasureMapLine size="40" />}
            title={'Peta Interaktif'}
            text={'Temukan kegiatan dan laporan yang terdekat denganmu!'}
          />
        </div>
      </div>
    </div>
  )
}
