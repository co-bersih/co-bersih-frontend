import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '@contexts'
import { FileInput, Modal, TextInput, Textarea } from 'flowbite-react'
import { CreateEventForm, createReportModalProps } from './interface'
import { AiFillSave, AiOutlineCloseCircle } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'
import { Button } from '@elements'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { LatLngLiteral } from 'leaflet'
import { useRouter } from 'next/router'

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const CreateReportModal: React.FC<createReportModalProps> = ({
  onClose,
  showModal,
}) => {
  const { user, tokens } = useAuthContext()
  const rootRef = useRef<HTMLDivElement>(null)
  const [loc, setLoc] = useState<LatLngLiteral | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateEventForm>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setLoc({ lat: geo.coords.latitude, lng: geo.coords.longitude })
    })
  }, [])

  const handleClose = () => {
    onClose()
  }

  const handleGetLocation = () => {
    setIsGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      (geo) => {
        setLoc({ lat: geo.coords.latitude, lng: geo.coords.longitude })
        setIsGettingLocation(false)
      },
      (error) => {
        console.log(error)
        setIsGettingLocation(false)
      }
    )
  }

  return (
    <>
      <div ref={rootRef} className="h-screen">
        <Modal
          show={showModal}
          root={rootRef.current ?? undefined}
          className="h-screen"
        >
          <div className="flex justify-between px-6 pt-5 items-center">
            <h2>Buat Laporan</h2>
            <AiOutlineCloseCircle
              size="28"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <Modal.Body>
            <div className="lg:grid lg:grid-rows-1 gap-4 justify-items-stretch w-full">
              <div className="col-span-2">
                <h4>Judul Laporan</h4>
              </div>
              <TextInput
                className="w-full col-span-3"
                {...register('name', {
                  required: true,
                  maxLength: 100,
                  minLength: 1,
                })}
              />
              <div className="col-span-2">
                <h4>Deskripsi</h4>
              </div>
              <Textarea
                className="w-full col-span-3 lg:text-[14px] text-[13px] "
                rows={4}
                {...register('description', { required: true })}
              />
              <div className="col-span-2">
                <h4>Foto Cover</h4>
              </div>
              <FileInput
                className="col-span-3"
                {...register('image', { required: true })}
                accept="image/*"
              />
              <div className="col-span-2">
                <h4>Lokasi Mulai</h4>
              </div>
              {loc?.lat && loc.lng ? (
                <div className="col-span-3 flex flex-col justify-end items-end">
                  <DynamicMap
                    center={loc}
                    draggable={{
                      locationState: loc,
                      setLocationState: setLoc,
                    }}
                    className="w-full min-h-[350px] col-span-3 rounded-3xl"
                  />
                  <p className="pt-1 font-extralight">
                    ({loc.lat}, {loc.lng})
                  </p>
                  <input hidden {...register('latitude')} value={loc.lat} />
                  <input hidden {...register('longitude')} value={loc.lng} />
                  <Button
                    variant={'ghost'}
                    className="bg-[#CFE4A5] hover:bg-[#CFE4A5]/80 text-black hover:text-black/80 w-fit justify-end"
                    rightIcon={<MdLocationOn />}
                    onClick={handleGetLocation}
                    disabled={isGettingLocation}
                  >
                    <h4>Ambil Dari Lokasi Saya</h4>
                  </Button>
                </div>
              ) : (
                <p className=" bg-red-300 p-2 rounded-md">
                  Pastikan lokasi Anda menyala dan browser dapat menggunakan
                  lokasi tersebut.
                </p>
              )}

              <div className="flex col-span-5 w-[100%] mx-auto justify-end gap-x-4 mt-3">
                <Button
                  variant={'deserted'}
                  isLoading={isLoading}
                  type="button"
                  onClick={() => {
                    router.push('/events')
                  }}
                >
                  <h4>Batalkan</h4>
                </Button>
                <Button variant={'greeny'} isLoading={isLoading}>
                  <h4>Ajukan Laporan</h4>
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
