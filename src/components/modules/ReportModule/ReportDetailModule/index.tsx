import { Button, Skeleton, Tabs, TipCard } from '@elements'
import { Clock, Enter, Money } from '@icons'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { cfg } from 'src/config'
import dynamic from 'next/dynamic'
import { useAuthContext } from '@contexts'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import { IReport } from '../module-elements/ReportCard/interface'
import { formatter } from '@utils'
import { LoginGuardModal } from '../../AuthModule/module-elements'
import { Breadcrumb } from 'flowbite-react'
import { EditReportModal } from '../module-elements/EditReportModal'

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const ReportDetailModule: React.FC = () => {
  const [tab, setTab] = useState<number>(0)
  const router = useRouter()
  const [data, setData] = useState<IReport>()
  const [tipMessage, setTipMessage] = useState<string>('')
  const { id } = router.query
  const { user, loading } = useAuthContext()
  const [isLoginGuardModal, setIsLoginGuardModal] = useState<boolean>(false)
  const [isEditReportModal, setIsEditReportModal] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      axios
        .get(`${cfg.API}/api/v1/reports/${id}/`)
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [id])

  function handleCreateEventFromReport() {
    if (!loading && !user) {
      setIsLoginGuardModal(true)
    } else {
      router.replace(
        `/events/new?lat=${data?.latitude}&lng=${data?.longitude}&reportId=${data?.id}`
      )
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-mintGreen">
        <div className="relative min-h-[105vh] flex flex-col pt-24 pb-8 px-4 sm:px-12 md:px-32 lg:px-40  gap-4 items-center justify-center lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] bg-white">
          <Breadcrumb className="mr-auto">
            <Breadcrumb.Item href="/events">Laporan</Breadcrumb.Item>
            <Breadcrumb.Item href={`/reports/${id}`}>
              Detail Laporan
            </Breadcrumb.Item>
          </Breadcrumb>
          {data?.reporter.email === user?.email ? (
            <Button
              variant="primary"
              className="ml-auto px-4"
              onClick={() => {
                setIsEditReportModal(true)
              }}
              rightIcon={<AiOutlineEdit size="20" className="cursor-pointer" />}
            >
              <h4>Edit Report</h4>
            </Button>
          ) : (
            <></>
          )}
          {data ? <h2>{data?.title}</h2> : <Skeleton />}
          {data && tipMessage && (
            <TipCard type={'information'} content={tipMessage} />
          )}
          <div className="flex lg:flex-row flex-col gap-x-4 md:gap-x-12 w-full h-fit">
            {data ? (
              <Image
                src={data?.image_url || '/assets/images/placeholder/image.png'}
                height={400}
                width={400}
                alt={data?.title}
                className="object-cover lg:w-[36vw] w-[95vw] sm:w-full rounded-xl"
                placeholder="empty"
              />
            ) : (
              <Skeleton className="h-[300px] w-full" />
            )}
            <div className="w-full flex flex-col gap-y-2 text-center">
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <h4>Dilaporkan oleh </h4>
                {data ? (
                  <div
                    className="flex items-center gap-x-2 cursor-pointer hover:underline"
                    onClick={() => {
                      router.push(`/profile/${data.reporter.id}`)
                    }}
                  >
                    <Image
                      src={
                        data.reporter.profile_image_url
                          ? data.reporter.profile_image_url
                          : '/assets/images/hero/Hero1.png'
                      }
                      alt=""
                      width={10}
                      height={10}
                      className="w-6 h-6 border-white rounded-full"
                    />
                    <p>{data.reporter.name}</p>
                  </div>
                ) : (
                  <Skeleton />
                )}{' '}
              </div>
              <div className="flex flex-col sm:flex-row justify-between w-full items-center">
                <div className="flex gap-x-2 min-w-[25%]">
                  <Clock size="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                  <h4>Tanggal pelaporan</h4>
                </div>
                {data ? (
                  <p>
                    {formatter.formatDateTime(new Date(data.reported_date))}
                  </p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <hr />
              <br />
              {data?.reporter.email === user?.email ? (
                <></>
              ) : (
                <div className="flex flex-col sm:flex-row justify-center gap-y-2 gap-x-[4%]">
                  <Button
                    variant={'greeny'}
                    rightIcon={Enter({ size: 'w-[20px] h-[20px]' })}
                    className="py-[0.4rem]"
                    disabled={!data || tipMessage !== ''}
                    onClick={handleCreateEventFromReport}
                  >
                    <h4>Ajukan Kegiatan dari Laporan</h4>
                  </Button>
                </div>
              )}

              {data ? (
                <DynamicMap
                  center={{ lat: data.latitude, lng: data.longitude }}
                  className="w-full h-[280px] "
                  reports={[data]}
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
            items={['Informasi']}
          />
          {tab === 0 && data ? (
            <div className="bg-white rounded-b-lg rounded-tr-lg p-12">
              <h3>Deskripsi</h3>
              <p>{data.description}</p>
              <br className="mt-4 mb-2" />
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
      <EditReportModal
        report={data ?? null}
        showModal={isEditReportModal}
        onClose={() => setIsEditReportModal(false)}
      />
    </>
  )
}
