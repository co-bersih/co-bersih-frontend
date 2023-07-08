import { Button } from '@elements'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { DashboardTabs } from './constant'
import IEvent from 'src/components/modules/EventModule/module-elements/EventCard/interface'
import {
  ParticipantDashboardMenu,
  StaffDashboardMenu,
  TokenDashboardMenu,
} from './module-elements'
import { useAuthContext } from '@contexts'
import axios from 'axios'
import { cfg } from 'src/config'
import { useRouter } from 'next/router'
import { Spinner } from 'flowbite-react'

export const EventDashboardModule: React.FC = () => {
  const [tab, setTab] = useState<DashboardTabs>(DashboardTabs.participants)
  const [data, setData] = useState<IEvent>()
  const { tokens, loading: authLoading, user } = useAuthContext()

  const router = useRouter()
  const { id } = router.query

  function fetchEvent() {
    axios
      .get(`${cfg.API}/api/v1/events/${id}/`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (!authLoading && router.isReady) {
      fetchEvent()
    }
  }, [tokens, authLoading, router.isReady])

  useEffect(() => {
    if (data && data.host.id !== user?.id) {
      toast.error('Anda tidak memiliki akses ke halaman tersebut.')
      router.push('/events')
    }
  }, [data])

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-white relative">
        <div className="relative min-h-screen flex flex-col gap-x-12 md:flex-row pt-24 pb-8 px-4 sm:px-12 md:px-32 lg:px-40">
          {/* sidebar */}
          <div className="border border-black p-4 rounded-xl flex flex-col gap-y-4">
            <h2>Event Dashboard</h2>
            <Button
              variant={
                tab === DashboardTabs.participants ? 'greeny' : 'primary'
              }
              onClick={() => {
                setTab(DashboardTabs.participants)
              }}
            >
              Participants
            </Button>
            <Button
              variant={tab === DashboardTabs.staff ? 'greeny' : 'primary'}
              onClick={() => {
                setTab(DashboardTabs.staff)
              }}
            >
              Staff
            </Button>
            <Button
              variant={tab === DashboardTabs.token ? 'greeny' : 'primary'}
              onClick={() => {
                setTab(DashboardTabs.token)
              }}
            >
              Token
            </Button>
          </div>

          {/* sidebar */}
          <div className="rounded-xl bg-neutral-50 w-full p-4">
            {tab === DashboardTabs.participants ? (
              <ParticipantDashboardMenu />
            ) : (
              <></>
            )}
            {tab === DashboardTabs.staff ? (
              data ? (
                <StaffDashboardMenu {...data} />
              ) : (
                <Spinner />
              )
            ) : (
              <></>
            )}
            {tab === DashboardTabs.token ? <TokenDashboardMenu /> : <></>}
          </div>
        </div>
      </div>
    </>
  )
}