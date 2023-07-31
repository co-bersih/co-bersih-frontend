import { Button, Skeleton, Tabs, TipCard } from '@elements'
import { Clock, Enter, Money } from '@icons'
import { formatter } from '@utils'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { cfg } from 'src/config'
import IEvent from '../module-elements/EventCard/interface'
import dynamic from 'next/dynamic'
import { MESSAGES } from './constant'
import { useAuthContext } from '@contexts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {
  AiFillDashboard,
  AiOutlineDashboard,
  AiOutlineEdit,
} from 'react-icons/ai'
import { LoginGuardModal } from '../../AuthModule/module-elements/LoginGuardModal'
import { Breadcrumb } from 'flowbite-react'
import { BiSolidExit } from 'react-icons/bi'

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const EventDetailModule: React.FC = () => {
  const [tab, setTab] = useState<number>(0)
  const router = useRouter()
  const [data, setData] = useState<IEvent>()
  const [tipMessage, setTipMessage] = useState<string>('')
  const { id } = router.query
  const { user, tokens, loading } = useAuthContext()
  const [isLoginGuardModal, setIsLoginGuardModal] = useState<boolean>(false)
  const [isJoined, setIsJoined] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      axios
        .get(`${cfg.API}/api/v1/events/${id}/`)
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [id, isJoined])

  useEffect(() => {
    if (!data || !data?.end_date) {
      return
    } else if (!data.is_verified) {
      setTipMessage(MESSAGES.UNVERIFIED)
    } else if (new Date(Date.now()) > new Date(data.end_date)) {
      setTipMessage(MESSAGES.FINISHED)
    }
  }, [data?.end_date])

  useEffect(() => {
    if (user && id) {
      axios
        .head(`${cfg.API}/api/v1/user/${user.id}/events/${id}`)
        .then((response) => {
          const statusCode = response.request.status
          if (statusCode === 200) {
            setIsJoined(true)
          }
        })
        .catch((error) => {})
    }
  }, [user, id, isJoined])

  function handleJoin() {
    if (!loading && !user) {
      setIsLoginGuardModal(true)
    } else {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${cfg.API}/api/v1/events/${id}/join/`,
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
      }

      axios
        .request(config)
        .then((response) => {
          toast.success('Berhasil bergabung dalam kegiatan!', {
            position: toast.POSITION.TOP_CENTER,
          })
          setIsJoined(true)
        })
        .catch((error) => {
          console.log(error.response.data)
          toast.error('Gagal bergabung, silakan coba lagi.', {
            position: toast.POSITION.TOP_CENTER,
          })
        })
    }
  }

  function handleLeave() {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${cfg.API}/api/v1/events/${id}/leave/`,
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
      },
    }

    axios
      .request(config)
      .then((response) => {
        toast.success('Berhasil keluar dari kegiatan!', {
          position: toast.POSITION.TOP_CENTER,
        })
        router.push('/events')
      })
      .catch((error) => {
        console.log(error.response.data)
        toast.error('Gagal keluar, silakan coba lagi.', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  function handleSupport() {
    if (!loading && !user) {
      setIsLoginGuardModal(true)
    } else {
      window.open(`https://${data?.payment_url!}`, '_blank')
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-mintGreen">
        <div className="relative min-h-[105vh] px-3 sm:px-8 md:px-32 lg:px-40  pt-28 pb-8 flex flex-col gap-4 items-center justify-center lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] bg-white">
          <Breadcrumb className="mr-auto">
            <Breadcrumb.Item href="/events">Kegiatan</Breadcrumb.Item>
            <Breadcrumb.Item href={`/events/${id}`}>
              Detail Kegiatan
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="flex ml-auto gap-x-2">
            <div className="flex ml-auto gap-x-2">
              {data?.host.email === user?.email ? (
                <Button
                  variant="primary"
                  className="ml-auto px-4"
                  onClick={() => {
                    router.push(`/events/${id}/edit`)
                  }}
                  rightIcon={
                    <AiOutlineEdit size="20" className="cursor-pointer" />
                  }
                >
                  Edit
                </Button>
              ) : (
                <></>
              )}
              {user?.email && data?.staffs?.includes(user.email) ? (
                <Button
                  variant="primary"
                  className="ml-auto px-4"
                  onClick={() => {
                    router.push(`/events/${id}/dashboard`)
                  }}
                  rightIcon={
                    <AiOutlineDashboard size="20" className="cursor-pointer" />
                  }
                >
                  Dashboard
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>

          {data ? <h2>{data?.name}</h2> : <Skeleton />}
          {data && tipMessage && (
            <TipCard type={'information'} content={tipMessage} />
          )}
          <div className="flex lg:flex-row flex-col gap-x-4 md:gap-x-12 w-full h-fit">
            {data ? (
              <Image
                src={data?.image_url || '/assets/images/placeholder/image.png'}
                height={400}
                width={400}
                alt={data?.name}
                className="object-cover lg:w-[36vw] w-[95vw] sm:w-full rounded-xl"
                placeholder="empty"
              />
            ) : (
              <Skeleton className="h-[300px] w-full" />
            )}
            <div className="w-full flex flex-col gap-y-2">
              <div className="flex flex-col sm:flex-row justify-between w-full lg:items-start items-center">
                <div className="flex gap-x-2 min-w-[25%] items-center">
                  <Clock size="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                  <h4>Tanggal & Waktu Mulai</h4>
                </div>
                {data ? (
                  <p>{formatter.formatDateTime(new Date(data.start_date))}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-between w-full lg:items-start items-center">
                <div className="flex gap-x-2 min-w-[25%] items-center">
                  <Clock size="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                  <h4>Tanggal & Waktu Selesai</h4>
                </div>
                {data ? (
                  <p>{formatter.formatDateTime(new Date(data.end_date))}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-between w-full lg:items-start items-center">
                <h4>Diselenggarakan oleh </h4>
                {data ? (
                  <div
                    className="flex items-center gap-x-2 cursor-pointer hover:underline"
                    onClick={() => {
                      router.push(`/profile/${data.host.id}`)
                    }}
                  >
                    <Image
                      src={
                        data.host.profile_image_url
                          ? data.host.profile_image_url
                          : '/assets/images/hero/Hero1.png'
                      }
                      alt=""
                      width={10}
                      height={10}
                      className="w-6 h-6 border-white rounded-full"
                    />
                    <p>{data.host.name}</p>
                  </div>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div
                className="bg-paleGreen rounded-2xl justify-between flex flex-row w-full p-3 px-5 items-center hover:bg-gradient-to-r from-lightGreen via-paleGreen to-lightGreen shiny cursor-pointer"
                onClick={() => router.push(`/forum/${id}`)}
              >
                <h3>Forum Kegiatan</h3>
                <div className="bg-coral rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <h3>3</h3>
                </div>
              </div>
              <hr />
              <br />
              {user?.email &&
              (data?.host?.id === user?.id ||
                data?.staffs?.includes(user.email)) ? (
                <></>
              ) : isJoined ? (
                <Button
                  variant={'solid'}
                  rightIcon={
                    <BiSolidExit
                      size={'18'}
                      fill={data && tipMessage === '' ? 'white' : '#ACACAC'}
                    />
                  }
                  className="py-[0.4rem] text-red-50 bg-red-800"
                  disabled={!data || tipMessage !== ''}
                  onClick={handleLeave}
                >
                  <h4>Keluar</h4>
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row justify-center gap-y-2 gap-x-[4%]">
                  <Button
                    variant={'greeny'}
                    rightIcon={
                      <Enter
                        size={'w-[20px] h-[20px]'}
                        fill={data && tipMessage === '' ? 'white' : '#ACACAC'}
                      />
                    }
                    className="py-[0.4rem]"
                    disabled={!data || tipMessage !== ''}
                    onClick={handleJoin}
                  >
                    <h4>Bergabung</h4>
                  </Button>
                  <Button
                    variant={'deserted'}
                    rightIcon={
                      <Money
                        size={'w-[20px] h-[20px]'}
                        fill={data && tipMessage === '' ? '#458549' : '#ACACAC'}
                      />
                    }
                    disabled={!data || tipMessage !== ''}
                    onClick={handleSupport}
                  >
                    <h4>Dukung</h4>
                  </Button>
                </div>
              )}

              {/* only display participants if non-null and > 0 */}
              {data?.total_participant ? (
                <h4 className="mx-auto">
                  {data?.total_participant} pengguna telah bergabung!
                </h4>
              ) : (
                <></>
              )}

              <br />

              {data ? (
                <DynamicMap
                  center={{ lat: data.latitude, lng: data.longitude }}
                  className="w-full h-[280px] "
                  events={[data]}
                  disablePopup
                  hideMapWrapper={true}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="px-3 sm:px-8 md:px-32 lg:px-40 ">
          <Tabs
            value={tab}
            setValue={setTab}
            className="flex justify-center w-full mt-12"
            items={['Informasi', 'Forum Kegiatan']}
          />
          {tab === 0 && data ? (
            <div className="bg-white rounded-b-lg rounded-tr-lg p-12">
              <h3>Deskripsi</h3>
              <p>{data.description}</p>
              <br className="mt-4 mb-2" />
              <h3>Persiapan yang Diperlukan</h3>
              <p>{data.preparation}</p>
            </div>
          ) : (
            <></>
          )}
          {tab === 1 && data ? (
            <div>
              <h3>Forum (TODO)</h3>
              {/* todo */}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <LoginGuardModal
        showModal={isLoginGuardModal}
        onClose={() => setIsLoginGuardModal(false)}
      />
    </>
  )
}
