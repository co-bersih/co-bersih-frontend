import Image from 'next/image'
import React from 'react'

export const HeroModule: React.FC = () => {
  return (
    <div className="h-screen bg-mintGreen">
      <div className="h-screen flex flex-col items-center justify-center rounded-b-[200px] bg-white">
        <h1 className="px-32 text-center ">
          Mari bergabung dalam misi kami untuk <br /> menciptakan lingkungan
          yang bersih dan sehat <br /> bagi{' '}
          <span className="font-poppinsMedium bg-paleGreen rounded-full px-2 bg-opacity-80">
            Indonesia
          </span>
        </h1>
        <div className="flex items-center justify-center space-x-[900px] pb-5 -mt-12">
          <div className="inline-block">
            <Image
              src="/assets/images/hero/decoration1.png"
              alt={''}
              width={80}
              height={0}
            />
          </div>
          <div className="inline-block">
            <Image
              src="/assets/images/hero/decoration2.png"
              alt={''}
              width={80}
              height={0}
            />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-5">
          <div className="inline-block">
            <Image
              src="/assets/images/hero/Hero1.png"
              alt={''}
              width={180}
              height={0}
            />
          </div>
          <div className="inline-block">
            <Image
              src="/assets/images/hero/Hero2.png"
              alt={''}
              width={250}
              height={0}
            />
          </div>
          <div className="inline-block">
            <Image
              src="/assets/images/hero/Hero3.png"
              alt={''}
              width={300}
              height={0}
            />
          </div>
          <div className="inline-block">
            <Image
              src="/assets/images/hero/Hero4.png"
              alt={''}
              width={250}
              height={0}
            />
          </div>
          <div className="inline-block">
            <Image
              src="/assets/images/hero/Hero5.png"
              alt={''}
              width={180}
              height={0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
