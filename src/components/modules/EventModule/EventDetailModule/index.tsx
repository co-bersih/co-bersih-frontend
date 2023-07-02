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

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const EventDetailModule: React.FC = () => {
  const [tab, setTab] = useState<number>(0)
  const router = useRouter()
  const [data, setData] = useState<IEvent>()
  const [tipMessage, setTipMessage] = useState<string>('')
  const { id } = router.query

  useEffect(() => {
    if (id) {
      axios
        .get(`${cfg.API}/api/v1/events/${id}/`)
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [id])

  useEffect(() => {
    if (!data || !data?.end_date) {
      return
    } else if (new Date(Date.now()) > new Date(data.end_date)) {
      setTipMessage(MESSAGES.FINISHED)
    }
  }, [data?.end_date])

  return (
    <>
      <div className="flex flex-col bg-mintGreen">
        <div className="px-3 sm:px-8 md:px-32 lg:px-40 relative min-h-[105vh] flex flex-col gap-4 items-center justify-center lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] bg-white pt-28 pb-8">
          {data ? <h2>{data?.name}</h2> : <Skeleton />}
          {data && tipMessage && (
            <TipCard type={'information'} content={tipMessage} />
          )}
          <div className="flex gap-x-4 md:gap-x-12 w-full">
            {data ? (
              <Image
                src={data?.image_url}
                height={400}
                width={400}
                alt={data?.name}
                className="object-cover w-[40vw] h-[55vw] md:w-[36vw] md:h-[26vw] rounded-xl"
              />
            ) : (
              <Skeleton className="h-[300px]" />
            )}
            <div className="w-full flex flex-col gap-y-2">
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <div className="flex gap-x-2 min-w-[25%]">
                  <Clock size="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                  <h4>Start time</h4>
                </div>
                {data ? (
                  <p>
                    {formatter.formatDateTimeWIB(new Date(data.start_date))}
                  </p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <div className="flex gap-x-2 min-w-[25%]">
                  <Clock size="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                  <h4>End time</h4>
                </div>
                {data ? (
                  <p>{formatter.formatDateTimeWIB(new Date(data.end_date))}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <h4>Diselenggarakan oleh </h4>
                {data ? <p>{data.host.name}</p> : <Skeleton />}
              </div>
              <hr />
              <br />
              <div className="flex flex-col sm:flex-row justify-center gap-y-2 gap-x-[4%]">
                <Button
                  variant={'greeny'}
                  rightIcon={Enter({ size: 'w-[20px] h-[20px]' })}
                  className="py-[0.4rem]"
                  disabled={!data || tipMessage !== ''}
                >
                  <h4>Bergabung</h4>
                </Button>
                <Button
                  variant={'deserted'}
                  rightIcon={Money({ size: 'w-[20px] h-[20px]' })}
                  disabled={!data || tipMessage !== ''}
                >
                  <h4>Dukung</h4>
                </Button>
              </div>

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
            items={['Informasi', 'Forum Event']}
          />
          {tab === 0 && data ? (
            <div className="bg-white rounded-b-lg rounded-tr-lg p-12">
              <h3>Description</h3>
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
    </>
  )
}
