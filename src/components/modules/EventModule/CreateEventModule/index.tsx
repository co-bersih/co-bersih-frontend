import {
  FileInput,
  Label,
  Pagination,
  TextInput,
  Textarea,
} from 'flowbite-react'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import EventCard from '../module-elements/EventCard'
import { LatLngLiteral } from 'leaflet'
import { dummyLoc } from '../constant'
import { CreateEventForm } from './interface'
import { useForm } from 'react-hook-form'
import { Button } from '@elements'
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const CreateEventModule: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateEventForm>()
  const [loc, setLoc] = useState<LatLngLiteral | undefined>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setLoc({ lat: geo.coords.latitude, lng: geo.coords.longitude })
    })
  }, [])

  const onSubmit = async (data: CreateEventForm) => {
    data.latitude = loc?.lat || 0
    data.longitude = loc?.lng || 0
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('preparation', data.preparation)
    formData.append(
      'start_date',
      new Date(data.start_date).toISOString().split('T')[0] || data.start_date
    )
    formData.append(
      'end_date',
      new Date(data.end_date).toISOString().split('T')[0] || data.end_date
    )
    formData.append('image', data.image[0])
    formData.append('latitude', String(data.latitude))
    formData.append('longitude', String(data.longitude))

    alert('submitting')
    // TODO
  }

  return (
    <>
      <div className="flex flex-col bg-white">
        <div className="relative min-h-screen flex flex-col items-center py-8 lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] px-4 sm:px-12 md:px-32 lg:px-40">
          <h1>Data Event Baru.</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-items-stretch w-full">
              <div className="col-span-2">
                <h4>Judul Event</h4>
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
              <FileInput
                className="col-span-3"
                {...register('image', { required: true })}
                accept="image/*"
              />
              <div className="col-span-2">
                <h4>Tanggal & Waktu Mulai</h4>
              </div>
              <TextInput
                className="w-full col-span-3"
                {...register('start_date', { required: true })}
                type="datetime-local"
              />
              <div className="col-span-2">
                <h4>Tanggal & Waktu Selesai</h4>
              </div>
              <TextInput
                className="w-full col-span-3"
                {...register('end_date', { required: true })}
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
                <Button variant={'deserted'}>
                  <h4>Batalkan</h4>
                </Button>
                <Button variant={'greeny'}>
                  <h4>Ajukan</h4>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
