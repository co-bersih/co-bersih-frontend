import Image from 'next/image'
import React from 'react'
import { Carousel } from 'flowbite-react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'

export const HeroModule: React.FC = () => {
  return (
    <div className="h-screen bg-mintGreen">
      <div className="h-screen flex flex-col items-center justify-center lg:rounded-b-[200px] md:rounded-b-[150px] rounded-b-[50px] bg-white">
        <h1 className="lg:px-64 px-5 text-center ">
          Mari bergabung dalam misi kami untuk menciptakan lingkungan yang
          bersih dan sehat bagi{' '}
          <span className="font-poppinsMedium bg-paleGreen rounded-full px-2 bg-opacity-80">
            Indonesia
          </span>
        </h1>

        <div className="flex flex-row items-center justify-center lg:space-x-[800px] lg:-mt-10 md:space-x-[500px] space-x-40 md:-mt-10 -mt-2">
          <div className="inline-block">
            <Image
              src="/assets/images/hero/decoration1.png"
              alt={''}
              width={90}
              height={0}
              className="w-16 md:w-20"
            />
          </div>
          <div className="inline-block">
            <Image
              src="/assets/images/hero/decoration2.png"
              alt={''}
              width={90}
              height={0}
              className="w-16 md:w-20"
            />
          </div>
        </div>

        <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center space-x-5">
          <div className="inline-block">
            <Image
              src="/assets/images/hero/Hero1.png"
              alt={''}
              width={180}
              height={0}
              className="lg:block md:block hidden"
            />
          </div>
          <div className="inline-block">
            <Image
              src="/assets/images/hero/Hero2.png"
              alt={''}
              width={250}
              height={0}
              className="lg:block md:block hidden"
            />
          </div>
          <div className="inline-block">
            <Image
              src="/assets/images/hero/Hero3.png"
              alt={''}
              width={300}
              height={0}
              className="lg:block md:block hidden"
            />
          </div>
          <div className="inline-block">
            <Image
              src="/assets/images/hero/Hero4.png"
              alt={''}
              width={250}
              height={0}
              className="lg:block md:block hidden"
            />
          </div>
          <div className="inline-block">
            <Image
              src="/assets/images/hero/Hero5.png"
              alt={''}
              width={180}
              height={0}
              className="lg:block md:block hidden"
            />
          </div>
        </div>

        <Carousel
          leftControl={<BsArrowLeftCircle size={30} color="darkGreen" />}
          rightControl={<BsArrowRightCircle size={30} color="darkGreen" />}
          className="lg:hidden md:hidden block h-64"
        >
          <Image
            src="/assets/images/hero/Hero2.png"
            alt={''}
            width={250}
            height={0}
            className="w-52 sm:w-auto"
          />
          <Image
            src="/assets/images/hero/Hero3.png"
            alt={''}
            width={250}
            height={0}
            className="w-52 sm:w-auto"
          />
          <Image
            src="/assets/images/hero/Hero4.png"
            alt={''}
            width={250}
            height={0}
            className="w-52 sm:w-auto"
          />
        </Carousel>
      </div>
    </div>
  )
}
