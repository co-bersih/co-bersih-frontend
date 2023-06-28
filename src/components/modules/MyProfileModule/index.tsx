import { Button } from '@elements'
import React from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiTwotoneEdit } from 'react-icons/ai'
import Image from 'next/image'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const MyProfileModule: React.FC = () => {
  // TODO: Write module's logic
  const updateData = () => {}

  const setChangePasswordModal = () => {}
  return (
    <div className="bg-mintGreen">
      <div className="bg-mintGreen">
        <div className="rounded-b-[200px] lg:h-64 h-36 bg-white"></div>
      </div>
      {/* photo */}
      <div className="flex flex-row items-center space-x-12 mx-[230px] -mt-28">
        <Image
          src={'/assets/images/hero/Hero1.png'}
          alt={''}
          width={250}
          height={250}
          className="w-48 h-48 border-4 border-white rounded-full"
        />
        <div className="flex flex-col  space-y-12">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col space-y-2">
              <h1>michael</h1>
              <h2>michael@gmail.com</h2>
            </div>

            <div className="flex flex-col items-start space-y-2">
              <Button
                variant={'greeny'}
                onClick={updateData}
                rightIcon={<AiTwotoneEdit />}
              >
                Edit Profile
              </Button>
              <Button
                variant={'greeny'}
                onClick={() => {
                  setChangePasswordModal
                }}
                rightIcon={<RiLockPasswordFill />}
              >
                Change Password
              </Button>
            </div>
          </div>
          <p>
            Hi this is my bio! Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc
            non blandit massa enim. Nunc sed blandit libero volutpat sed cras
            ornare. Nunc consequat interdum varius sit amet mattis vulputate
            enim. Sit amet nulla facilisi morbi tempus iaculis urna id.
          </p>
        </div>
      </div>
    </div>
  )
}
