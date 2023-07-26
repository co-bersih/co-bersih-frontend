import { Avatar, Breadcrumb } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { BsFillChatRightTextFill, BsFillPeopleFill } from 'react-icons/bs'
import { ForumCard, StaffProfileCard } from './module-elements'
import axios from 'axios'
import IEvent from '../EventModule/module-elements/EventCard/interface'
import { useRouter } from 'next/router'
import { cfg } from 'src/config'
import { useAuthContext } from '@contexts'
import { Button } from '@elements'
import { LoginGuardModal } from '../AuthModule/module-elements'
import { CreateForumModal } from './module-elements/CreateForumModal'

export const ForumModule: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState<IEvent>()
  const { tokens, loading, user } = useAuthContext()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // modal state
  const [isCreateForumModal, setIsCreateForumModal] = useState<boolean>(false)
  const [isLoginGuardModal, setIsLoginGuardModal] = useState<boolean>(false)

  const handleButtonClick = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  function fetchEvent() {
    axios
      .get(`${cfg.API}/api/v1/events/${id}/`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }

  function handleCreateForum() {
    if (!loading && !user) {
      setIsLoginGuardModal(true)
    } else {
      setIsCreateForumModal(true)
    }
  }

  useEffect(() => {
    if (!loading && router.isReady) {
      fetchEvent()
    }
  }, [tokens, loading, router.isReady])

  return (
    <>
      <div className="overflow-x-hidden relative h-screen px-3 sm:px-8 md:px-32 lg:px-32 pt-20 pb-8 flex flex-row gap-4 items-center justify-center">
        <div className="flex flex-col h-full space-y-5">
          <Breadcrumb className="mr-auto">
            <Breadcrumb.Item href="/events">Kegiatan</Breadcrumb.Item>
            <Breadcrumb.Item href={`/events/${id}`}>
              Detail Kegiatan
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/forum/${id}`}>Forum</Breadcrumb.Item>
          </Breadcrumb>
          <Button
            variant={'deserted'}
            rightIcon={<BsFillPeopleFill />}
            className="w-full"
            onClick={handleButtonClick}
          >
            <h4>Daftar Panitia</h4>
          </Button>{' '}
          <div className="flex w-full justify-between items-center">
            <h1>Forum</h1>
            <div
              className="bg-paleGreen rounded-2xl justify-between flex flex-row w-fit lg:p-3 p-1 px-5 items-center hover:bg-gradient-to-r from-lightGreen via-paleGreen to-lightGreen shiny cursor-pointer"
              onClick={handleCreateForum}
            >
              <h3>Buat Forum</h3>
            </div>
          </div>
          <div className="forum-list relative flex flex-col space-y-3 overflow-y-scroll h-full">
            <ForumCard />
            <ForumCard />
            <ForumCard />
            <ForumCard />
            <ForumCard />
          </div>
        </div>

        <aside
          id="slider"
          className={`bg-mintGreen rounded-2xl h-full lg:w-[20%] md:w-[60%] w-[80%] space-y-2 p-4 ${
            isSidebarOpen ? 'slide-in-from-right' : 'slide-out-to-right'
          } absolute top-0 right-0 z-50`}
        >
          <div className="flex space-x-3 items-center justify-center bg-white w-full rounded-xl p-2 h-[15%]">
            <Avatar
              alt="User settings"
              img={'/assets/images/hero/Hero1.png'}
              rounded
            />
            <div className="flex flex-col">
              <h4 className="text-sm">Penyelenggara Kegiatan</h4>
              <div
                className="flex items-center gap-x-2 cursor-pointer hover:underline"
                onClick={() => {
                  router.push(`/profile/2bc88d2b-faf5-4b03-b6ef-3a463e42a747`)
                }}
              >
                <p>michaelsinanta</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white w-full rounded-2xl space-y-2 p-3 h-[85%] overflow-y-scroll">
            <h4 className="text-sm">Panitia</h4>
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
            <StaffProfileCard />
          </div>
        </aside>
      </div>
      <LoginGuardModal
        showModal={isLoginGuardModal}
        onClose={() => setIsLoginGuardModal(false)}
      />
      <CreateForumModal
        showModal={isCreateForumModal}
        onClose={() => setIsCreateForumModal(false)}
      />
    </>
  )
}
