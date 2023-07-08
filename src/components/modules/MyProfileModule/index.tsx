import { Button, Tabs } from '@elements'
import React, { useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiTwotoneEdit } from 'react-icons/ai'
import Image from 'next/image'
import { TAB_OPTIONS } from './constant'
import { useAuthContext } from '@contexts'
import { ChangePasswordModal, EditProfileModal } from './module-elements'

export const MyProfileModule: React.FC = () => {
  const { user } = useAuthContext()

  const [tab, setTab] = useState<number>(0)
  const [isEditProfileModalDisplayed, setIsEditProfileModalDisplayed] =
    useState<boolean>(false)
  const [isChangePasswordModalDisplayed, setIsChangePasswordModalDisplayed] =
    useState<boolean>(false)

  const setChangePasswordModal = () => {}
  return (
    <div className="bg-mintGreen relative">
      <div className="bg-mintGreen">
        <div className="rounded-b-[200px] lg:h-64 h-60 bg-white"></div>
      </div>
      <div className="flex lg:flex-row flex-col lg:items-start items-center lg:space-x-12 lg:space-y-0 space-y-6 lg:mx-[230px] -mt-24 mx-6 ">
        <Image
          src={
            user?.profileImage
              ? user.profileImage
              : '/assets/images/hero/Hero1.png'
          }
          alt=""
          width={250}
          height={250}
          className="w-48 h-48 border-4 border-white rounded-full"
        />
        <div className="flex flex-col w-full">
          <div className="flex lg:flex-row flex-col lg:justify-between justify-center lg:mb-6 lg:space-y-0 space-y-3">
            <div className="flex flex-col space-y-2 lg:items-start items-center">
              <h1>{user?.name}</h1>
              <h2>{user?.email}</h2>
            </div>

            <div className="flex flex-col lg:items-start space-y-2">
              <Button
                variant={'greeny'}
                onClick={() => setIsEditProfileModalDisplayed(true)}
                rightIcon={<AiTwotoneEdit />}
              >
                Edit Profile
              </Button>
              <Button
                variant={'greeny'}
                onClick={() => {
                  setIsChangePasswordModalDisplayed(true)
                }}
                rightIcon={<RiLockPasswordFill />}
              >
                Change Password
              </Button>
            </div>
          </div>
          <p>{user?.bio}</p>
        </div>
      </div>
      <Tabs
        value={tab}
        setValue={setTab}
        className="flex justify-center w-full mt-12"
        items={TAB_OPTIONS}
      />
      <div className="bg-white relative"></div>
      <EditProfileModal
        user={user}
        showModal={isEditProfileModalDisplayed}
        onClose={() => setIsEditProfileModalDisplayed(false)}
      />
      <ChangePasswordModal
        showModal={isChangePasswordModalDisplayed}
        onClose={() => setIsChangePasswordModalDisplayed(false)}
      />
    </div>
  )
}
