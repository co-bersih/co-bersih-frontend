import React, { useEffect, useRef, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useAuthContext } from '@contexts'
import { Modal, TextInput, Textarea } from 'flowbite-react'
import { CreateForumForm, createForumModalProps } from './interface'
import { AiFillSave, AiOutlineCloseCircle } from 'react-icons/ai'
import { Button } from '@elements'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { cfg } from 'src/config'

export const CreateForumModal: React.FC<createForumModalProps> = ({
  onClose,
  showModal,
}) => {
  const { user, tokens } = useAuthContext()
  const rootRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateForumForm>()

  const handleClose = () => {
    onClose()
  }

  const onSubmit = async (data: CreateForumForm) => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)

    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
        'Content-Type': 'multipart/form-data',
      },
    }

    axios
      .post(`${cfg.API}/api/v1/reports/`, formData, options)
      .then((res) => {
        toast.success('Anda berhasil membuat forum.')
        router.push(`/reports/${res.data.id}`)
      })
      .catch((err) => {
        console.log(err.response.data)
        if (err.response?.status === 401) {
          toast.error('Mohon untuk me-refresh halaman ini.')
        } else if (err.response.data.errors.length > 0) {
          toast.error(
            `${err.response.data.errors[0].attr} error: ${err.response.data.errors[0].detail}`
          )
        } else {
          toast.error('Telah terjadi kesalahan.')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
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
            <h2>Buat Forum</h2>
            <AiOutlineCloseCircle
              size="28"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="gap-4 justify-items-stretch w-full">
                <div className="col-span-2">
                  <h4>Judul Forum</h4>
                </div>
                <TextInput
                  className="w-full col-span-3"
                  {...register('title', {
                    required: true,
                    maxLength: 100,
                    minLength: 1,
                  })}
                />
                <div className="col-span-2">
                  <h4>Deskripsi Forum</h4>
                </div>
                <Textarea
                  className="w-full col-span-3 lg:text-[14px] text-[13px] "
                  rows={5}
                  {...register('description', { required: true })}
                />

                <div className="flex col-span-5 w-[100%] mx-auto justify-end gap-x-4 mt-3">
                  <Button
                    variant={'deserted'}
                    isLoading={isLoading}
                    type="button"
                    onClick={() => {
                      onClose()
                    }}
                  >
                    <h4>Batalkan</h4>
                  </Button>
                  <Button variant={'greeny'} isLoading={isLoading}>
                    <h4>Buat Forum</h4>
                  </Button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
