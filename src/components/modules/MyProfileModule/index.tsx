import { Button, Tabs, Toggle } from '@elements'
import React, { useEffect, useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiTwotoneEdit } from 'react-icons/ai'
import Image from 'next/image'
import { TAB_OPTIONS } from './constant'
import { useAuthContext } from '@contexts'
import { ChangePasswordModal, EditProfileModal } from './module-elements'
import { cfg } from 'src/config'
import axios from 'axios'
import IEvent from '../EventModule/module-elements/EventCard/interface'
import { IReport } from '../ReportModule/module-elements/ReportCard/interface'
import EventCard from '../EventModule/module-elements/EventCard'
import { useRouter } from 'next/router'
import { Pages } from '../EventModule/interface'
import { Pagination, Spinner } from 'flowbite-react'
import ReportCard from '../ReportModule/module-elements/ReportCard'
import { UserInterface } from 'src/components/contexts/AuthContext/interface'

export const MyProfileModule: React.FC = () => {
  const { user } = useAuthContext()
  const [profile, setProfile] = useState<UserInterface | null>(null)
  const router = useRouter()
  const { id } = router.query
  const [tab, setTab] = useState<number>(0)
  const [isEditProfileModalDisplayed, setIsEditProfileModalDisplayed] =
    useState<boolean>(false)
  const [isChangePasswordModalDisplayed, setIsChangePasswordModalDisplayed] =
    useState<boolean>(false)
  const [toggleValue, setToggleValue] = useState(0)

  const [joinedEventsData, setJoinedEventsData] = useState<IEvent[]>([])
  const [createdEventsData, setCreatedEventsData] = useState<IEvent[]>([])
  const [reportsData, setReportsData] = useState<IReport[]>([])
  const [joinedEventsPages, setJoinedEventsPages] = useState<Pages>({})
  const [createdEventsPages, setCreatedEventsPages] = useState<Pages>({})

  const fetchJoinedEvents = (params: any) => {
    axios
      .get(`${cfg.API}/api/v1/user/${id}/events/`, { params })
      .then((res) => {
        setJoinedEventsPages((prev) => ({
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
          current: prev.current,
        }))
        setJoinedEventsData(res.data.results)
      })
      .catch((err) => console.log(err))
  }

  const fetchCreatedEvents = (params: any) => {
    axios
      .get(`${cfg.API}/api/v1/user/${id}/events-staff/`, { params })
      .then((res) => {
        setCreatedEventsData(res.data.results)
        setCreatedEventsPages((prev) => ({
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
          current: prev.current,
        }))
        setCreatedEventsData(res.data.results)
      })
      .catch((err) => console.log(err))
  }

  const fetchReports = () => {
    axios
      .get(`${cfg.API}/api/v1/reports/`)
      .then((res) => {
        const filteredResults = res.data.results.filter(
          (report: any) => report.reporter.email === user?.email
        )
        setReportsData(filteredResults)
        setJoinedEventsPages((prev) => ({
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
          current: prev.current,
        }))
      })
      .catch((err) => console.log(err))
  }

  const onPageChange = (page: number) => {
    setJoinedEventsPages((prev) => ({ ...prev, current: page }))
  }

  const getProfile = () => {
    axios
      .get(`${cfg.API}/api/v1/user/${id}`)
      .then((res) => {
        const user: UserInterface = {
          id: res.data.id,
          email: res.data.email,
          name: res.data.name,
          bio: res.data.bio,
          profileImage: res.data.profile_image_url,
          dateJoined: res.data.date_joined,
        }
        setProfile(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (id) {
      getProfile()
      fetchJoinedEvents({ page: joinedEventsPages.current || 0 + 1 })
      fetchCreatedEvents({ page: createdEventsPages.current || 0 + 1 })
      fetchReports()
    }
  }, [id])

  useEffect(() => {
    fetchJoinedEvents({ page: joinedEventsPages.current || 0 + 1 })
    fetchCreatedEvents({ page: createdEventsPages.current || 0 + 1 })
    fetchReports()
  }, [tab, toggleValue])

  return (
    <div className="bg-mintGreen relative">
      <div className="bg-mintGreen">
        <div className="rounded-b-[200px] lg:h-64 h-60 bg-white"></div>
      </div>
      <div className="flex justify-center items-center w-full ">
        <div className="flex lg:flex-row flex-col lg:items-start items-center lg:space-x-12 lg:space-y-0 space-y-6 -mt-24 mx-6 w-full lg:w-[60%]">
          <Image
            src={
              profile?.profileImage
                ? profile.profileImage
                : '/assets/images/hero/Hero1.png'
            }
            alt=""
            width={250}
            height={250}
            className="w-48 h-48 border-4 border-white rounded-full"
          />
          <div className="flex flex-col w-full">
            <div className="flex lg:flex-row flex-col lg:justify-between justify-center lg:mb-6 lg:space-y-0 space-y-3">
              <div className="flex flex-col space-y-2 lg:items-start items-center">
                <h1>{profile?.name}</h1>
                <h2>{profile?.email}</h2>
              </div>
              {user?.email === profile?.email ? (
                <div className="flex flex-col lg:items-start space-y-2">
                  <Button
                    variant={'greeny'}
                    onClick={() => setIsEditProfileModalDisplayed(true)}
                    rightIcon={<AiTwotoneEdit />}
                  >
                    Edit Profil
                  </Button>
                  <Button
                    variant={'greeny'}
                    onClick={() => {
                      setIsChangePasswordModalDisplayed(true)
                    }}
                    rightIcon={<RiLockPasswordFill />}
                  >
                    Ganti Kata Sandi
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <p className="break-words">{profile?.bio}</p>
          </div>
        </div>
      </div>
      <Tabs
        value={tab}
        setValue={setTab}
        className="flex justify-center w-full mt-12"
        items={TAB_OPTIONS}
      />
      {tab === 0 ? (
        <div className="bg-white rounded-b-lg rounded-tr-lg flex flex-col items-center py-8 px-4 sm:px-10 md:px-20 space-y-5 min-h-screen md:min-h-[50vh] h-fit">
          <Toggle
            items={['Diikuti', 'Dipimpin']}
            value={toggleValue}
            setValue={setToggleValue}
            className="w-full"
          />
          {toggleValue === 0 ? (
            <>
              {joinedEventsData.length === 0 ? (
                <h2>Belum ada kegiatan yang diikuti!</h2>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                  {joinedEventsData.map((event, idx) => (
                    <EventCard {...event} key={idx} />
                  ))}
                </div>
              )}
              <br />

              <Pagination
                currentPage={joinedEventsPages.current || 1}
                onPageChange={onPageChange}
                totalPages={Math.ceil(joinedEventsPages.count! / 10) || 1}
                className="text-sm mt-auto"
              />
            </>
          ) : (
            <>
              {createdEventsData.length === 0 ? (
                <h2>Belum ada kegiatan yang dibuat!</h2>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                  {createdEventsData.map((event, idx) => (
                    <EventCard {...event} key={idx} />
                  ))}
                </div>
              )}
              <br />

              <Pagination
                currentPage={createdEventsPages.current || 1}
                onPageChange={onPageChange}
                totalPages={Math.ceil(createdEventsPages.count! / 10) || 1}
                className="text-sm mt-auto"
              />
            </>
          )}
        </div>
      ) : (
        <></>
      )}
      {tab === 1 ? (
        <div className="bg-white rounded-b-lg rounded-tr-lg flex flex-col items-center py-8 px-4 sm:px-10 md:px-20 space-y-5">
          {reportsData.length === 0 ? (
            <h2>Belum ada laporan yang dibuat!</h2>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
              {reportsData.map((report, idx) => (
                <ReportCard {...report} key={idx} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}

      <div className="bg-white relative"></div>
      <EditProfileModal
        user={profile}
        showModal={isEditProfileModalDisplayed}
        onClose={() => setIsEditProfileModalDisplayed(false)}
      />
      <ChangePasswordModal
        showModal={isChangePasswordModalDisplayed}
        onClose={() => setIsChangePasswordModalDisplayed(false)}
      />
    </div>
  )
}
