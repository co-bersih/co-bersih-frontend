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
import { Breadcrumb, Spinner } from 'flowbite-react'
import { BreadcrumbItem } from 'flowbite-react/lib/esm/components/Breadcrumb/BreadcrumbItem'
import { BiLock } from 'react-icons/bi'
import { SaldoDashboardMenu } from './module-elements/SaldoMenu'

export const EventDashboardModule: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const [tab, setTab] = useState<DashboardTabs>(DashboardTabs.token)
  const [data, setData] = useState<IEvent>()
  const { tokens, loading: authLoading, user } = useAuthContext()

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
    if (
      data &&
      data.host.id !== user?.id &&
      !data.staffs?.includes(user?.email || '')
    ) {
      toast.error('Anda tidak memiliki akses ke halaman tersebut.')
      router.push('/events')
    }
  }, [data])

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-white relative gap-x-12 pt-24 pb-8 px-4 sm:px-12 md:px-32 lg:px-40 gap-y-2 h-screen">
        <Breadcrumb>
          <Breadcrumb.Item href="/events">Kegiatan</Breadcrumb.Item>
          <Breadcrumb.Item href={`/events/${id}`}>
            Detail Kegiatan
          </Breadcrumb.Item>
          <Breadcrumb.Item href={`/events/${id}/dashboard`}>
            Dashboard
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="relative h-full flex flex-col md:flex-row">
          {/* sidebar */}
          <div className="border border-black p-4 rounded-xl flex flex-col gap-y-4">
            <h2>Dashboard Kegiatan</h2>
            <Button
              variant={tab === DashboardTabs.staff ? 'greeny' : 'primary'}
              onClick={() => {
                setTab(DashboardTabs.staff)
              }}
              disabled={data?.host.id !== user?.id}
              rightIcon={data?.host.id !== user?.id ? <BiLock /> : undefined}
            >
              Staff
            </Button>
            <Button
              variant={tab === DashboardTabs.saldo ? 'greeny' : 'primary'}
              onClick={() => {
                setTab(DashboardTabs.saldo)
              }}
              disabled={data?.host.id !== user?.id}
              rightIcon={data?.host.id !== user?.id ? <BiLock /> : undefined}
            >
              Donasi
            </Button>
            <Button
              variant={tab === DashboardTabs.token ? 'greeny' : 'primary'}
              onClick={() => {
                setTab(DashboardTabs.token)
              }}
            >
              Peserta
            </Button>
          </div>

          <div className="rounded-xl bg-neutral-50 w-full p-4">
            {/* staff */}
            {tab === DashboardTabs.staff ? (
              data ? (
                <StaffDashboardMenu {...data} />
              ) : (
                <Spinner />
              )
            ) : (
              <></>
            )}

            {/* token */}
            {tab === DashboardTabs.token ? <TokenDashboardMenu /> : <></>}

            {/* saldo / donasi */}
            {tab === DashboardTabs.saldo ? (
              data ? (
                <SaldoDashboardMenu {...data} />
              ) : (
                <Spinner />
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
