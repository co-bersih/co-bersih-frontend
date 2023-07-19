import { useAuthContext } from '@contexts'
import axios, {
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  HttpStatusCode,
} from 'axios'
import { useEffect, useState } from 'react'
import IEvent from 'src/components/modules/EventModule/module-elements/EventCard/interface'
import { cfg } from 'src/config'
import { Button } from '@elements'
import Link from 'next/link'
import { External } from '@icons'
import { toast } from 'react-toastify'
import { Pagination } from 'flowbite-react'
import { Pages } from '../../EventModule/interface'

export const VerifKegiatanAdminMenu: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>()
  const [page, setPage] = useState<Pages>()
  const { tokens, loading: isAuthLoading } = useAuthContext()

  function handleVerifyEvent(eventId: string) {
    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
      },
    }
    axios
      .post(`${cfg.API}/api/v1/events/${eventId}/verify/`, {}, options)
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          toast.success('Event berhasil diverifikasi.')
          setEvents((prev) => {
            return prev?.filter((val, i) => val.id !== eventId) || []
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleRejectEvent(eventId: string) {
    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
      },
    }
    // todo logic
    // axios.post(...)
  }

  function fetchUnverifiedEvents(page: number) {
    axios
      .get(`${cfg.API}/api/v1/events/?page=${page}&is_verified=False`)
      .then((res) => {
        setEvents(res.data.results)
        setPage(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (!isAuthLoading) {
      fetchUnverifiedEvents(1)
    }
  }, [isAuthLoading])

  return (
    <>
      <h3>Kegiatan yang Belum Terverifikasi</h3>
      <table className="border-spacing-1 md:border-spacing-2 border-separate text-center">
        <thead>
          <tr className="">
            <th className=" bg-mintGreen rounded-full w-[30%]">Judul</th>
            <th className=" bg-mintGreen rounded-full w-[20%]">Pembuat</th>
            <th className=" bg-mintGreen rounded-full w-[20%]">Detail</th>
            <th className=" bg-mintGreen rounded-full w-[30%]">Perintah</th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event, idx) => (
            <tr key={idx}>
              <td>
                <p>{event.name}</p>
              </td>
              <td>
                <Link
                  href={`/profile/${event.host.id}`}
                  className="flex gap-x-1 md:gap-x-2 w-fit mx-auto hover:underline items-center"
                >
                  <p>{event.host.name}</p>
                  <External
                    size={'min-w-[12px] max-w-[12px] min-h-[12px] max-h-[12px]'}
                    fill="black"
                  />
                </Link>
              </td>
              <td>
                <Link
                  href={`/events/${event.id}`}
                  className="flex gap-x-2 w-fit mx-auto hover:underline items-center"
                >
                  <p>Lihat Detail</p>
                  <External
                    size={'min-w-[12px] max-w-[12px] min-h-[12px] max-h-[12px]'}
                    fill="black"
                  />
                </Link>
              </td>
              <td>
                <div className="flex flex-col xl:flex-row gap-1 md:gap-2 mx-auto w-fit">
                  <Button
                    variant={'deserted'}
                    className=" border-red-500 text-red-500 hover:bg-red-300"
                    onClick={() => {
                      handleRejectEvent(event.id)
                    }}
                  >
                    <p>Tolak</p>
                  </Button>
                  <Button
                    variant={'deserted'}
                    onClick={() => {
                      handleVerifyEvent(event.id)
                    }}
                  >
                    <p>Terima</p>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={page?.current || 1}
        onPageChange={() => {
          fetchUnverifiedEvents((page?.current || 0) + 1)
        }}
        totalPages={Math.ceil(page?.count! / 10) || 1}
        className="mx-auto mt-4"
      />
    </>
  )
}
