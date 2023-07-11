import { Carousel } from 'flowbite-react'
import Image from 'next/image'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'

export const Action: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-mintGreen space-y-3">
      <div className="flex flex-row items-center lg:justify-between justify-center lg:px-0 px-10 lg:-mb-0 -mb-12 ">
        <div className="inline-block">
          <Image
            src="/assets/images/action/decoration1.png"
            alt={''}
            width={30}
            height={0}
            className="md:w-10 w-5"
          />
        </div>
        <h1 className="text-center lg:px-5 px-0">
          Temukan, Tindak, Transformasi
        </h1>
        <div className="inline-block">
          <Image
            src="/assets/images/action/decoration1.png"
            alt={''}
            width={30}
            height={0}
            className="md:w-10 w-5"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="items-center card p-5 bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl lg:w-1/2 space-y-2 relative z-10 lg:block md:block hidden">
          <h2>Temukan</h2>
          <p>
            Eksplorasi sekitar Anda dan temukan dengan mudah daerah-daerah yang
            memerlukan pembersihan mendesak. Dengan bantuan peta interaktif
            kami, Anda dapat dengan mudah mengidentifikasi lokasi-lokasi dengan
            tingkat polusi tinggi di sekitar Anda. Mari kita temukan keindahan
            tersembunyi di balik tumpukan sampah!
          </p>
        </div>
        <div className="relative lg:-ml-8">
          <Image
            src="/assets/images/action/temukan.png"
            alt={''}
            width={400}
            height={0}
            className="lg:block md:block hidden"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center ">
        <div className="relative lg:-mr-8">
          <Image
            src="/assets/images/action/transformasi.png"
            alt={''}
            width={400}
            height={0}
            className="lg:block md:block hidden"
          />
        </div>
        <div className="items-center card p-5 bg-white rounded-tl-3xl rounded-tr-3xl rounded-br-3xl lg:w-1/2 space-y-2 relative z-10 lg:block md:block hidden">
          <h2>Tindak</h2>
          <p>
            Bergabunglah dengan individu-individu yang penuh semangat dan ikut
            serta dalam acara pembersihan yang terorganisir. Terlibatlah secara
            langsung, kumpulkan sampah, dan pulihkan keindahan lanskap alam
            kita. Setiap tindakan memiliki dampak!
          </p>{' '}
        </div>
      </div>
      <div className="flex flex-row justify-center ">
        <div className="items-center card p-5 bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl lg:w-1/2  space-y-2 relative z-10 lg:block md:block hidden">
          <h2>Transformasi</h2>
          <p>
            Jadilah penggerak perubahan dengan menciptakan acara pembersihan
            Anda sendiri. Bagikan informasi, unggah foto, dan inspirasi orang
            lain untuk bergabung dalam perjuangan Anda. Mari kita ubah area yang
            tercemar menjadi tempat yang hidup, bebas dari sampah.{' '}
          </p>
        </div>
        <div className="relative lg:-ml-8">
          <Image
            src="/assets/images/action/transformasi.png"
            alt={''}
            width={400}
            height={0}
            className="lg:block md:block hidden"
          />
        </div>
      </div>
      <Carousel
        leftControl={<BsArrowLeftCircle size={30} color="darkGreen" />}
        rightControl={<BsArrowRightCircle size={30} color="darkGreen" />}
        className="lg:hidden md:hidden block h-[300px]"
      >
        <div className="bg-white w-2/3 text-center rounded-3xl ">
          <p className="p-3">
            Eksplorasi sekitar Anda dan temukan daerah-daerah yang memerlukan
            pembersihan sampah. Dengan bantuan peta interaktif kami, Anda dapat
            dengan mudah mengidentifikasi lokasi-lokasi dengan polusi tinggi di
            sekitar Anda.
          </p>
        </div>

        <div className="bg-white w-2/3 text-center rounded-3xl ">
          <p className="p-3">
            Bergabunglah dengan individu-individu yang penuh semangat dan ikut
            serta dalam acara pembersihan yang terorganisir. Terlibatlah secara
            langsung, kumpulkan sampah, dan pulihkan keindahan lanskap alam
            kita. Setiap tindakan memiliki dampak!
          </p>
        </div>

        <div className="bg-white w-2/3 text-center rounded-3xl ">
          <p className="p-3">
            Jadilah penggerak perubahan dengan menciptakan acara pembersihan
            Anda sendiri. Bagikan informasi, unggah foto, dan inspirasi orang
            lain untuk bergabung dalam perjuangan Anda. Mari kita ubah area yang
            tercemar menjadi tempat yang hidup, bebas dari sampah.{' '}
          </p>
        </div>
      </Carousel>
      <Image
        src="/assets/images/action/tindak.png"
        alt={''}
        width={250}
        height={0}
        className="w-64 sm:w-auto rounded-full lg:hidden md:hidden block"
      />
    </div>
  )
}
