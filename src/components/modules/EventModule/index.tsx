import React, { ChangeEvent, useEffect, useState } from 'react'
import EventCard from './module-elements/EventCard'
import { Pagination, TextInput } from 'flowbite-react'
import { LatLngLiteral, map } from 'leaflet'
import dynamic from 'next/dynamic'
import { dummyEvent, dummyEvent2, dummyLoc } from './constant'
import { Button, FilterButton, Toggle } from '@elements'
import { useRouter } from 'next/router'
import { cfg } from 'src/config'
import { useAuthContext } from '@contexts'
import axios from 'axios'
import { Pages } from './interface'
import IEvent from './module-elements/EventCard/interface'
import { BiSolidLeaf } from 'react-icons/bi'
import { MdReport } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiGroupFill, RiHome2Line, RiTreasureMapFill } from 'react-icons/ri'
import { CreateReportModal } from '../ReportModule/module-elements/CreateReportModal'
import { LoginGuardModal } from '../AuthModule/module-elements'

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const EventModule: React.FC = () => {
  const { tokens, loading, user } = useAuthContext()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const router = useRouter()
  const [mapData, setMapData] = useState<IEvent[]>([dummyEvent, dummyEvent2]) // TODO
  const [catalogData, setCatalogData] = useState<IEvent[]>([])
  const [loc, setLoc] = useState<LatLngLiteral | undefined>(dummyLoc)
  const [pages, setPages] = useState<Pages>({})
  const [toggleValue, setToggleValue] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [isLoginGuardModal, setIsLoginGuardModal] = useState<boolean>(false)
  const [isReportModal, setIsReportModal] = useState<boolean>(false)

  const onPageChange = (page: number) => {
    setPages((prev) => ({ ...prev, current: page }))
  }

  const onScrollOut = () => {
    // TODO: refetch for new range
  }

  function fetchEvents() {
    axios
      .get(`${cfg.API}/api/v1/events/`, {
        params: { page: pages.current },
      })
      .then((res) => {
        setPages((prev) => ({
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
          current: prev.current,
        }))
        setCatalogData(res.data.results)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchEvents()
  }, [pages.current, tokens])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setLoc({ lat: geo.coords.latitude, lng: geo.coords.longitude })
    })
  }, [])

  function onSearchQueryChange(e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    setSearchQuery(e.target.value)
    // TODO
  }

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value)
  }

  const handleSearchInputSubmit = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      // find the event
    }
  }

  const handleSearchIconClick = () => {
    // find the event
  }

  const handleClickCreateEvent = () => {
    if (!loading && !user) {
      setIsLoginGuardModal(true)
    } else {
      router.push('/events/new')
    }
  }

  const handleClickCreateReport = () => {
    if (!loading && !user) {
      setIsLoginGuardModal(true)
    } else {
      setIsReportModal(true)
    }
  }

  return (
    <>
      <div className="flex flex-col bg-white">
        <div className="relative h-screen flex flex-col items-center justify-end lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] bg-mintGreen space-y-5">
          <h1>Temukan Event Terdekat</h1>
          {loc?.lat && loc.lng ? (
            <DynamicMap
              center={loc}
              events={mapData}
              className="min-w-[80vw] lg:h-[500px] h-[400px] rounded-full"
            />
          ) : (
            <p className=" bg-red-300 p-2 rounded-md">
              Pastikan lokasi Anda menyala dan browser dapat menggunakan lokasi
              tersebut.
            </p>
          )}
          <div className="flex justify-between items-center space-x-3">
            <Button
              variant={'greeny'}
              className="h-full"
              onClick={handleClickCreateEvent}
              rightIcon={<BiSolidLeaf />}
            >
              <h4>Buat Event</h4>
            </Button>
            <Button
              variant={'deserted'}
              onClick={handleClickCreateReport}
              rightIcon={<MdReport />}
            >
              <h4>Buat Report</h4>
            </Button>
          </div>
          <br />
        </div>
        <div className="relative min-h-screen flex flex-col items-center py-8 lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] px-4 sm:px-10 md:px-20 space-y-5">
          <Toggle
            items={['Events', 'Reports']}
            value={toggleValue}
            setValue={setToggleValue}
            className="w-full"
          />
          <div className="flex lg:flex-row md:flex-row flex-col w-full lg:items-center md:items-center items-end lg:space-x-4 md:space-x-4 space-x-0 lg:space-y-0 md:space-y-0 space-y-4">
            <form className="w-full">
              <div className="flex h-fit select-none items-center justify-center rounded-full tracking-wider transition-all border-2 border-darkGreen text-black bg-white">
                <input
                  id="Search"
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-full bg-transparent border-transparent focus:border-transparent focus:ring-0 lg:text-[14px] text-[13px]"
                  value={searchValue}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleSearchInputSubmit}
                />
                <span
                  className="stroke-current bg-mintGreen p-2 justify-center flex rounded-full mr-1 cursor-pointer"
                  onClick={handleSearchIconClick}
                >
                  <AiOutlineSearch color="black" size="18" />
                </span>
              </div>
            </form>
            <FilterButton
              className="h-full"
              childrenL={<h4>Popularity</h4>}
              rightIconL={<RiGroupFill color="white" size={18} />}
              childrenR={<h4>Distance</h4>}
              rightIconR={<RiTreasureMapFill color="white" size={18} />}
            />
          </div>
          {/* <TextInput 
            className='mb-4 w-[90vw] sm:w-[75vw] md:w-[50vw]'
            placeholder='Cari event berdasarkan judul...'
            rightIcon={MagnifyingGlass as React.FC<React.SVGProps<SVGSVGElement>>}
            value={searchQuery}
            onChange={onSearchQueryChange}
          /> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {catalogData.map((event, idx) => (
              <EventCard {...event} key={idx} />
            ))}
          </div>
          <br />

          {/* https://www.flowbite-react.com/docs/components/pagination */}
          <Pagination
            currentPage={pages.current || 1}
            onPageChange={onPageChange}
            totalPages={Math.ceil(pages.count! / 10) || 1}
            className="text-sm"
          />
        </div>
      </div>
      <CreateReportModal
        showModal={isReportModal}
        onClose={() => setIsReportModal(false)}
      />
      <LoginGuardModal
        showModal={isLoginGuardModal}
        onClose={() => setIsLoginGuardModal(false)}
      />
    </>
  )
}
