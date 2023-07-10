import {
  Breadcrumb,
  FileInput,
  Label,
  Pagination,
  Spinner,
  TextInput,
  Textarea,
} from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import EventCard from '../module-elements/EventCard'
import { LatLngLiteral } from 'leaflet'
import { dummyLoc } from '../constant'
import { CreateEventForm } from './interface'
import { useForm } from 'react-hook-form'
import { Button } from '@elements'
import dynamic from 'next/dynamic'
import axios, { AxiosRequestConfig } from 'axios'
import { cfg } from 'src/config'
import { useAuthContext } from '@contexts'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { formatter } from '@utils'

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const CreateEventModule: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateEventForm>()
  const [loc, setLoc] = useState<LatLngLiteral | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { tokens, user, loading: authLoading } = useAuthContext()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setLoc({ lat: geo.coords.latitude, lng: geo.coords.longitude })
    })
  }, [])

  const onSubmit = async (data: CreateEventForm) => {
    setIsLoading(true)

    data.start_date.setTime(data.start_date.getTime() + 7 * cfg.HOURS);
    data.end_date.setTime(data.start_date.getTime() + 7 * cfg.HOURS);

    data.latitude = loc?.lat || 0
    data.longitude = loc?.lng || 0
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('preparation', data.preparation)
    formData.append('start_date', data.start_date.toISOString())
    formData.append('end_date', data.end_date.toISOString())
    formData.append('image', data.image[0])
    formData.append('latitude', String(data.latitude))
    formData.append('longitude', String(data.longitude))

    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
        'Content-Type': 'multipart/form-data',
      },
    }

    axios
      .post(`${cfg.API}/api/v1/events/`, formData, options)
      .then((res) => {
        toast.success('Anda berhasil membuat event.')
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
    if (!authLoading && !user) {
      toast.error('Anda tidak bisa mengakses halaman tersebut')
      router.push('/auth/login')
    }
  }, [])

  // useEffect(() => {
  //   errors && toast.error(JSON.stringify(errors));
  // }, [errors])

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-white relative px-4 sm:px-12 md:px-32 lg:px-40 pt-24 pb-8">
        <Breadcrumb className='mb-4'>
          <Breadcrumb.Item href="/events">Kegiatan</Breadcrumb.Item>
          <Breadcrumb.Item href={`/events`}>Buat Kegiatan</Breadcrumb.Item>
        </Breadcrumb>
        <div className="relative min-h-screen flex flex-col items-center lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <h2>Buat Kegiatan</h2>
            <br />
            <div className="flex flex-col md:grid md:grid-cols-5 gap-4 justify-items-stretch w-full">
              <div className="col-span-2">
                <h4>Judul Kegiatan</h4>
              </div>
              <TextInput
                className="w-full col-span-3"
                {...register('name', {
                  required: "Judul kegiatan wajib diisi",
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
                {...register('description', { required: true })}
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
                {...register('preparation', { required: true })}
              />
              <div className="col-span-2">
                <h4>Foto Cover</h4>
              </div>
              <div className="col-span-3">
                <FileInput
                  {...register('image', { 
                    required: true, 
                    validate: (val => (val[0].size < cfg.MAX_IMG_SIZE_IN_MEGABYTE * cfg.MEGABYTE || `File tidak boleh lebih besar dari ${cfg.MAX_IMG_SIZE_IN_MEGABYTE} MB.` )) 
                  })}
                  accept="image/*"
                />
                <p className='text-sm text-red-500'>{errors.image?.message}</p>
              </div>
              <div className="col-span-2">
                <h4>Tanggal & Waktu Mulai</h4>
                <p className="text-xs font-extralight">Timezone: GMT+7 (WIB)</p>
              </div>
              <div className="w-full col-span-3">
                <TextInput
                  {...register('start_date', { 
                    required: true, 
                    valueAsDate: true, 
                    validate: (val) => (val < control._formValues.end_date || 'Tanggal & waktu mulai harus sebelum tanggal & waktu selesai.')
                  })}
                  type="datetime-local"
                />
                <p className='text-sm text-red-500'>{errors.start_date?.message}</p>
              </div>
              <div className="col-span-2">
                <h4>Tanggal & Waktu Selesai</h4>
                <p className="text-xs font-extralight">Timezone: GMT+7 (WIB)</p>
              </div>
              <div className="w-full col-span-3">
                <TextInput
                  {...register('end_date', { 
                    required: true, 
                    valueAsDate: true, 
                    validate: (val) => (val > new Date() || 'Tanggal & waktu selesai harus di masa mendatang.') 
                  })}
                  type="datetime-local"
                />
                <p className='text-sm text-red-500'>{errors.end_date?.message}</p>
              </div>
              <div className="col-span-2">
                <h4>Lokasi Mulai</h4>
              </div>
              {loc?.lat && loc.lng ? (
                <div className="col-span-3">
                  <p>Petunjuk: Tarik penanda biru di peta sesuai lokasi kegiatan.</p>
                  <DynamicMap
                    center={loc}
                    draggable={{
                      locationState: loc,
                      setLocationState: setLoc,
                      icon: 'event'
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
                  <h4>Ajukan Kegiatan</h4>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
