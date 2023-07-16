import React, { useEffect, useRef, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useAuthContext } from '@contexts'
import { FileInput, Modal, TextInput, Textarea } from 'flowbite-react'
import { CreateReportForm, editReportModalProps } from './interface'
import { AiFillSave, AiOutlineCloseCircle } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'
import { Button } from '@elements'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { LatLngLiteral } from 'leaflet'
import { useRouter } from 'next/router'
import { cfg } from 'src/config'

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const EditReportModal: React.FC<editReportModalProps> = ({
  report,
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
    setValue,
    formState: { errors },
  } = useForm<CreateReportForm>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setLoc({ lat: geo.coords.latitude, lng: geo.coords.longitude })
    })
  }, [])

  useEffect(() => {
    if (report) {
      setValue('title', report.title)
      setValue('description', report.description)
      if (report?.latitude && report?.longitude) {
        navigator.geolocation.getCurrentPosition((geo) => {
          setLoc({ lat: report.latitude, lng: report.longitude })
        })
      }
    }
  }, [showModal, report])

  const handleClose = () => {
    onClose()
  }

  const onDelete = () => {
    setIsLoading(true)
    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
        'Content-Type': 'application/json',
      },
    }

    axios
      .delete(`${cfg.API}/api/v1/reports/${report?.id}/`, options)
      .then((res) => {
        toast.success('Anda berhasil menghapus laporan.')
        router.push(`/events/`)
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          toast.error('Mohon untuk me-refresh halaman ini.')
        } else if (err.response.data.errors?.length > 0) {
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

  const onSubmit = async (data: CreateReportForm) => {
    setIsLoading(true)

    data.latitude = loc?.lat || 0
    data.longitude = loc?.lng || 0
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    if (data.image[0]) {
      formData.append('image', data.image[0])
    }
    formData.append('latitude', String(data.latitude))
    formData.append('longitude', String(data.longitude))

    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
        'Content-Type': 'multipart/form-data',
      },
    }

    axios
      .patch(`${cfg.API}/api/v1/reports/${report?.id}/`, formData, options)
      .then((res) => {
        toast.success('Anda berhasil mengedit laporan.')
        onClose()
        setTimeout(() => {
          window.location.reload()
        }, 500)
      })
      .catch((err) => {
        console.log(err.response)
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

  const onMapReady = (map: L.Map) => {
    setTimeout(() => {
      map.invalidateSize()
    }, 0)
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
      <div ref={rootRef}>
        <Modal
          show={showModal}
          root={rootRef.current ?? undefined}
          className="h-screen"
        >
          <div className="flex justify-between px-6 pt-5 items-center">
            <h2>Edit Laporan</h2>
            <AiOutlineCloseCircle
              size="28"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="lg:grid lg:grid-rows-1 gap-4 justify-items-stretch w-full">
                <div className="col-span-2">
                  <h4>Judul Laporan</h4>
                </div>
                <TextInput
                  className="w-full col-span-3"
                  defaultValue={report?.title}
                  {...register('title', {
                    required: false,
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
                  defaultValue={report?.description}
                  {...register('description', { required: false })}
                />
                <div className="col-span-2">
                  <h4>Foto Cover</h4>
                </div>
                <FileInput
                  className="col-span-3"
                  defaultValue={report?.image_url}
                  {...register('image', { required: false })}
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
                        icon: 'report',
                      }}
                      className="w-full min-h-[350px] col-span-3 rounded-3xl"
                      onMapReady={onMapReady}
                    />
                    <p className="pt-1 font-extralight">
                      ({loc.lat}, {loc.lng})
                    </p>
                    <input hidden {...register('latitude')} value={loc.lat} />
                    <input hidden {...register('longitude')} value={loc.lng} />
                    <Button
                      variant={'ghost'}
                      className="bg-[#CFE4A5] hover:bg-[#CFE4A5]/80 text-black hover:text-black/80 w-fit justify-end mt-2"
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

                <div className="flex col-span-5 w-[100%] mx-auto lg:justify-end justify-center lg:gap-x-4 gap-x-1 mt-3">
                  <Button
                    variant={'solid'}
                    className={`text-red-50 bg-red-800`}
                    isLoading={isLoading}
                    type="button"
                    onClick={() => {
                      onDelete()
                    }}
                  >
                    <h4>Hapus</h4>
                  </Button>
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
                    <h4>Simpan</h4>
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
