import { useAuthContext } from '@contexts'
import axios, { AxiosRequestConfig } from 'axios'
import { TextInput, Textarea, FileInput } from 'flowbite-react'
import { LatLngLiteral } from 'leaflet'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { cfg } from 'src/config'
import { CreateEventForm } from '../CreateEventModule/interface'
import { Button } from '@elements'
import { EMPTY_EVENT } from './constant'
import IEvent from '../module-elements/EventCard/interface'

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const EditEventModule: React.FC = () => {
  const [defaultData, setDefaultData] = useState<any>(EMPTY_EVENT)
  const [data, setData] = useState<any>(EMPTY_EVENT)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateEventForm>({ values: data })
  const [loc, setLoc] = useState<LatLngLiteral | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const { id } = router.query
  const { tokens, user } = useAuthContext()

  const onDelete = () => {
    setIsLoading(true)
    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
        'Content-Type': 'application/json',
      },
    }

    axios
      .delete(`${cfg.API}/api/v1/events/${id}/`, options)
      .then((res) => {
        toast.success('Anda berhasil menghapus event.')
        router.push(`/events/`)
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

  const onSubmit = async (data: CreateEventForm) => {
    setIsLoading(true)

    data.latitude = loc?.lat || 0
    data.longitude = loc?.lng || 0
    const formData = new FormData()
    data.name &&
      data.name !== defaultData.name &&
      formData.append('name', data.name)
    data.description &&
      data.description !== defaultData.description &&
      formData.append('description', data.description)
    data.preparation &&
      data.preparation !== defaultData.preparation &&
      formData.append('preparation', data.preparation)
    data.start_date &&
      data.start_date !== defaultData.start_date &&
      formData.append('start_date', data.start_date)
    data.end_date &&
      data.end_date !== defaultData.end_date &&
      formData.append('end_date', data.end_date)
    data.image &&
      data.image.length > 0 &&
      formData.append('image', data.image[0])
    data.latitude &&
      data.latitude !== defaultData.latitude &&
      formData.append('latitude', String(data.latitude))
    data.longitude &&
      data.longitude !== defaultData.longitude &&
      formData.append('longitude', String(data.longitude))

    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
        'Content-Type': 'multipart/form-data',
      },
    }

    axios
      .patch(`${cfg.API}/api/v1/events/${id}/`, formData, options)
      .then((res) => {
        toast.success('Anda berhasil memperbarui event.')
        router.push(`/events/${res.data.id}`)
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

  useEffect(() => {
    if (id) {
      axios
        .get(`${cfg.API}/api/v1/events/${id}/`)
        .then((res) => {
          res.data.start_date = res.data.start_date
          res.data.end_date = res.data.end_date
          setData(res.data)
          setDefaultData(res.data)
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [id])

  function authorize(user: any, event: any) {
    if (user?.email !== event.host.email) {
      console.log(user?.email + ' // ' + event.host.email)
      toast.error('Anda tidak bisa mengakses halaman tersebut.')
      router.push('/events')
    } else {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isLoading && data) {
      authorize(user, data)
    }
  }, [isLoading, user, data])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setLoc({ lat: geo.coords.latitude, lng: geo.coords.longitude })
    })
  }, [])

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-white relative">
        <div className="relative min-h-screen flex flex-col items-center pb-8 pt-20 lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] px-4 sm:px-12 md:px-32 lg:px-40">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <h2>Edit Event</h2>
            <br />
            <div className="flex flex-col md:grid md:grid-cols-5 gap-4 justify-items-stretch w-full">
              <div className="col-span-2">
                <h4>Judul Event</h4>
              </div>
              <TextInput
                className="w-full col-span-3"
                {...register('name', {
                  required: false,
                  maxLength: 100,
                  minLength: 1,
                })}
              />
              <div className="col-span-2">
                <h4>Deskripsi</h4>
              </div>
              <Textarea
                className="w-full col-span-3 text-base"
                rows={8}
                {...register('description', { required: false })}
              />
              <div className="col-span-2">
                <h4>Persiapan yang Diperlukan</h4>
                <p className="text-xs font-extralight">
                  Jelaskan apa saja yang perlu disiapkan peserta! <br />
                  Contoh: Payung, Sarung tangan, Masker
                </p>
              </div>
              <Textarea
                className="w-full col-span-3"
                rows={8}
                {...register('preparation', { required: false })}
              />
              <div className="col-span-2">
                <h4>Foto Cover</h4>
              </div>
              <FileInput
                className="col-span-3"
                {...register('image', { required: false })}
                accept="image/*"
              />
              <div className="col-span-2">
                <h4>Tanggal & Waktu Mulai</h4>
                <p className="text-xs font-extralight">Timezone: GMT+0 (UTC)</p>
              </div>
              <TextInput
                className="w-full col-span-3"
                {...register('start_date', { required: false })}
                type="datetime-local"
              />
              <div className="col-span-2">
                <h4>Tanggal & Waktu Selesai</h4>
                <p className="text-xs font-extralight">Timezone: GMT+0 (UTC)</p>
              </div>
              <TextInput
                className="w-full col-span-3"
                {...register('end_date', { required: false })}
                type="datetime-local"
              />
              <div className="col-span-2">
                <h4>Lokasi Mulai</h4>
              </div>
              {loc?.lat && loc.lng ? (
                <div className="col-span-3">
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
                </div>
              ) : (
                <p className=" bg-red-300 p-2 rounded-md">
                  Pastikan lokasi Anda menyala dan browser dapat menggunakan
                  lokasi tersebut.
                </p>
              )}

              <div className="flex col-span-5 w-[100%] mx-auto justify-end gap-x-4">
                <Button
                  variant={'solid'}
                  className={`text-red-50 bg-red-800`}
                  isLoading={isLoading}
                  type="button"
                  onClick={() => {
                    onDelete()
                  }}
                >
                  <h4>Hapus Event</h4>
                </Button>
                <Button variant={'deserted'} isLoading={isLoading}>
                  <h4>Batalkan Edit</h4>
                </Button>
                <Button variant={'greeny'} isLoading={isLoading}>
                  <h4>Selesai Edit</h4>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
