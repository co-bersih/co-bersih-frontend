import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '@contexts'
import { Modal, TextInput } from 'flowbite-react'
import { changePasswordModalProps } from './interface'
import { AiFillSave, AiOutlineCloseCircle } from 'react-icons/ai'
import { Button } from '@elements'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { cfg } from 'src/config'

export const ChangePasswordModal: React.FC<changePasswordModalProps> = ({
  onClose,
  showModal,
}) => {
  const { user, tokens } = useAuthContext()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    setOldPassword('')
    setNewPassword('')
    onClose()
  }

  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOldPassword(event.target.value)
  }

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('old_password', oldPassword || '')
    formData.append('new_password', newPassword || '')

    try {
      const config = {
        method: 'patch',
        url: `${cfg.API}/api/v1/user/${user?.id}`,
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
        data: formData,
      }

      await axios
        .request(config)
        .then((response) => {
          toast.success('Successfully change password.', {
            position: toast.POSITION.TOP_CENTER,
          })
          onClose()
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
        .catch((error) => {
          const errorMessage = JSON.stringify(error.response.data)
          toast.error(`${errorMessage}`, {
            position: toast.POSITION.TOP_CENTER,
          })
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div ref={rootRef}>
        <Modal
          show={showModal}
          root={rootRef.current ?? undefined}
          className="h-screen"
        >
          <div className="flex justify-between px-6 pt-5 items-center">
            <h2>Ganti Kata Sandi</h2>
            <AiOutlineCloseCircle
              size="28"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <h3>Kata Sandi Lama</h3>
              <TextInput
                required
                type="password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
              />
              <h3>Kata Sandi Baru</h3>
              <TextInput
                required
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <Button
                variant="greeny"
                className="w-full mt-6"
                rightIcon={<AiFillSave size={16} color="white" />}
              >
                Simpan
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
