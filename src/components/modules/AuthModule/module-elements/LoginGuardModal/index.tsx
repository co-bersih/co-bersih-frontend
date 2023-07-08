import React, { useState } from 'react'
import { Modal } from 'flowbite-react'
import { loginGuardModalProps } from './interface'
import { HiBackspace } from 'react-icons/hi'
import { BiSolidLogInCircle } from 'react-icons/bi'
import { TbLeafOff } from 'react-icons/tb'
import { Button } from '@elements'
import { useRouter } from 'next/router'

export const LoginGuardModal: React.FC<loginGuardModalProps> = ({
  onClose,
  showModal,
}) => {
  const router = useRouter()
  return (
    <>
      <Modal show={showModal} size={'md'} className="h-screen">
        <Modal.Body>
          <div className="space-y-3 items-center flex flex-col w-full">
            <TbLeafOff size={50} color="red" />
            <h3 className="text-center">
              Silahkan login terlebih dahulu agar Anda dapat mengakses fitur ini
            </h3>

            <div className="flex justify-center items-center space-x-3">
              <Button
                variant={'greeny'}
                className="h-full"
                onClick={() => {
                  onClose()
                }}
                rightIcon={<HiBackspace />}
              >
                <h4>Nanti dulu</h4>
              </Button>
              <Button
                variant={'deserted'}
                onClick={() => {
                  router.push('/auth/login')
                }}
                rightIcon={<BiSolidLogInCircle />}
              >
                <h4>Login</h4>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
