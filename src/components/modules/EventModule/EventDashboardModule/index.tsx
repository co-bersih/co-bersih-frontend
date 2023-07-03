import { Button } from '@elements'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { DashboardTabs } from './constant'

export const EventDashboardModule: React.FC = () => {
  const [tab, setTab] = useState<DashboardTabs>(DashboardTabs.participants)

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-white relative">
        <div className="relative min-h-screen flex flex-col gap-x-12 md:flex-row pt-24 pb-8 px-4 sm:px-12 md:px-32 lg:px-40">
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
          <div className="rounded-xl bg-neutral-50 w-full p-4">
            {/* main menu thingy */}
            <h3>insert tab name here</h3>
            {/* tab === DashboardTabs.particpants ? <ParticipantsEventDashboard /> : <></> */}
            {/* tab === DashboardTabs.stsaff ? <StaffEventDashboard /> : <></> */}
          </div>
        </div>
      </div>
    </>
  )
}
