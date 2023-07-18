import { useAuthContext } from '@contexts'
import axios, { AxiosRequestConfig } from 'axios'
import { TextInput, Textarea, FileInput, Breadcrumb } from 'flowbite-react'
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
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateEventForm>({ values: data })
  const [loc, setLoc] = useState<LatLngLiteral | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const { id } = router.query
  const { tokens, user, loading: authLoading } = useAuthContext()

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

  const onSubmit = async (data: CreateEventForm) => {
    setIsLoading(true)
    data.start_date.setTime(data.start_date.getTime() + 7 * cfg.HOURS)
    data.end_date.setTime(data.end_date.getTime() + 7 * cfg.HOURS)
    // toast.info(data.start_date.toISOString() + " // " + data.end_date.toISOString())

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
      formData.append('start_date', data.start_date.toISOString())
    data.end_date &&
      data.end_date !== defaultData.end_date &&
      formData.append('end_date', data.end_date.toISOString())
    data.image &&
      data.image.length > 0 &&
      formData.append('image', data.image[0])
    data.latitude &&
      data.latitude !== defaultData.latitude &&
      formData.append('latitude', String(loc?.lat || 0))
    data.longitude &&
      data.longitude !== defaultData.longitude &&
      formData.append('longitude', String(loc?.lng || 0))

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
          res.data.start_date = String(res.data.start_date).substring(
            0,
            res.data.start_date.length - 1
          )
          res.data.end_date = String(res.data.end_date).substring(
            0,
            res.data.end_date.length - 1
          )
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
    if (!isLoading && !authLoading && data) {
      authorize(user, data)
    }
  }, [isLoading, authLoading, user, data])

  useEffect(() => {
    setLoc({
      lat: data.latitude,
      lng: data.longitude,
    })
  }, [data.latitude, data.longitude])

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-white relative pb-8 pt-20 px-4 sm:px-12 md:px-32 lg:px-40">
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="/events">Kegiatan</Breadcrumb.Item>
          <Breadcrumb.Item href={`/events/${id}`}>
            Detail Kegiatan
          </Breadcrumb.Item>
          <Breadcrumb.Item href={`/events/${id}/edit`}>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <div className="relative min-h-screen flex flex-col items-center lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <h2>Edit Kegiatan</h2>
            <br />
            <div className="flex flex-col md:grid md:grid-cols-5 gap-4 justify-items-stretch w-full">
              <div className="col-span-2">
                <h4>Judul Kegiatan</h4>
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
                <h4>Foto Cover Baru</h4>
                <p className="text-xs font-extralight">
                  File disamping hanya menampilkan file yang baru.
                </p>
              </div>
              <FileInput
                className="col-span-3"
                {...register('image', {
                  required: false,
                  validate: (val) =>
                    val.length === 0 ||
                    val[0].size < cfg.MAX_IMG_SIZE_IN_MEGABYTE * cfg.MEGABYTE ||
                    `File tidak boleh lebih besar dari ${cfg.MAX_IMG_SIZE_IN_MEGABYTE} MB.`,
                })}
                accept="image/*"
              />
              <div className="col-span-2">
                <h4>Tanggal & Waktu Mulai</h4>
                <p className="text-xs font-extralight">
                  Menggunakan timezone setempat
                </p>
              </div>
              <div className="w-full col-span-3">
                <TextInput
                  {...register('start_date', {
                    required: false,
                    valueAsDate: true,
                    validate: (val) =>
                      val === new Date(defaultData.start_date) ||
                      val < control._formValues.end_date ||
                      'Tanggal & waktu mulai harus sebelum tanggal & waktu selesai.',
                  })}
                  type="datetime-local"
                />
                <p className="text-sm text-red-500">
                  {errors.start_date?.message}
                </p>
              </div>
              <div className="col-span-2">
                <h4>Tanggal & Waktu Selesai</h4>
                <p className="text-xs font-extralight">
                  Menggunakan timezone setempat
                </p>
              </div>
              <div className="w-full col-span-3">
                <TextInput
                  {...register('end_date', {
                    required: false,
                    valueAsDate: true,
                    validate: (val) =>
                      !val ||
                      val > new Date() ||
                      'Tanggal & waktu selesai harus di masa mendatang.',
                  })}
                  type="datetime-local"
                />
                <p className="text-sm text-red-500">
                  {errors.end_date?.message}
                </p>
              </div>
              <div className="col-span-2">
                <h4>Lokasi Mulai</h4>
                <p className="text-xs font-extralight">
                  Tarik penanda lingkaran biru di peta sesuai lokasi kegiatan.
                </p>
              </div>
              {loc?.lat && loc.lng ? (
                <div className="col-span-3">
                  <DynamicMap
                    center={loc}
                    draggable={{
                      locationState: loc,
                      setLocationState: setLoc,
                      icon: 'event',
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
                <Button
                  variant={'deserted'}
                  isLoading={isLoading}
                  type="button"
                  onClick={() => {
                    router.push('/events')
                  }}
                >
                  <h4>Batalkan Edit</h4>
                </Button>
                <Button
                  variant={'greeny'}
                  isLoading={isLoading}
                  type="submit"
                  // onClick={() => {
                  //   router.push('/events')
                  // }}
                >
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
