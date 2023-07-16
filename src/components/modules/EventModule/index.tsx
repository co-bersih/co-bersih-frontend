import React, { ChangeEvent, useEffect, useState } from 'react'
import EventCard from './module-elements/EventCard'
import { Pagination, TextInput } from 'flowbite-react'
import L, { LatLngLiteral, map } from 'leaflet'
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
import { MdNewReleases, MdReport } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiGroupFill, RiHome2Line, RiTreasureMapFill } from 'react-icons/ri'
import { CreateReportModal } from '../ReportModule/module-elements/CreateReportModal'
import { LoginGuardModal } from '../AuthModule/module-elements'
import { IReport } from '../ReportModule/module-elements/ReportCard/interface'
import ReportCard from '../ReportModule/module-elements/ReportCard'
import { ToastContainer, toast } from 'react-toastify'

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const EventModule: React.FC = () => {
  const { tokens, loading, user } = useAuthContext()
  const router = useRouter()

  // data states
  const [eventsData, setEventsData] = useState<IEvent[]>([])
  const [mapEventsData, setMapEventsData] = useState<IEvent[]>()
  const [reportsData, setReportsData] = useState<IReport[]>([])
  const [mapReportsData, setMapReportsData] = useState<IReport[]>()
  const [reportEventsData, setReportEventsData] = useState<IReport[]>()
  // other states
  const [loc, setLoc] = useState<LatLngLiteral | undefined>(dummyLoc)
  const [pages, setPages] = useState<Pages>({})
  const [minimumZoom, setMinimumZoom] = useState<number>(12)
  const [toggleValue, setToggleValue] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const [isLoginGuardModal, setIsLoginGuardModal] = useState<boolean>(false)
  const [isReportModal, setIsReportModal] = useState<boolean>(false)

  // data fetching

  const fetchEvents = (params: any) => {
    return axios.get(`${cfg.API}/api/v1/events/`, { params })
  }

  const fetchReports = (params: any) => {
    return axios.get(`${cfg.API}/api/v1/reports/`, { params })
  }

  const fetchPagedEvents = (params: any) => {
    fetchEvents(params)
      .then((res) => {
        setPages((prev) => ({
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
          current: prev.current,
        }))
        setEventsData(res.data.results)
      })
      .catch((err) => console.log(err))
  }

  const fetchPagedReports = (params: any) => {
    fetchReports(params)
      .then((res) => {
        setPages((prev) => ({
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
          current: prev.current,
        }))
        setReportsData(res.data.results)
      })
      .catch((err) => console.log(err))
  }

  const fetchMappedEvents = (params: any) => {
    fetchEvents(params)
      .then((res) => {
        addToMapEventsData(res.data.results)
      })
      .catch((err) => console.log(err))
  }

  const fetchMappedReports = (params: any) => {
    fetchReports(params)
      .then((res) => {
        addToMapReportsData(res.data.results)
      })
      .catch((err) => console.log(err))
  }

  const addToMapEventsData = (events: IEvent[]) => {
    const toAppend: IEvent[] = []
    const mapEventIds: string[] = mapEventsData?.map((event) => event.id) || []

    events.forEach((event, idx) => {
      if (!mapEventIds.includes(event.id)) {
        toAppend.push(event)
      }
    })
    setMapEventsData((prev) => (prev ? [...prev, ...toAppend] : toAppend))
  }

  const addToMapReportsData = (reports: IReport[]) => {
    const toAppend: IReport[] = []
    const mapReportIds: string[] =
      mapReportsData?.map((report) => report.id) || []

    reports.forEach((report, idx) => {
      if (!mapReportIds.includes(report.id)) {
        toAppend.push(report)
      }
    })
    setMapReportsData((prev) => (prev ? [...prev, ...toAppend] : toAppend))
  }

  // event handlers

  const onPageChange = (page: number) => {
    setPages((prev) => ({ ...prev, current: page }))
  }

  const handleZoomChange = (newZoom: number) => {
    if (newZoom < minimumZoom) {
      setMinimumZoom(newZoom)
    }
  }

  const handleMove = (newCenter: LatLngLiteral) => {
    try {
      setLoc({ lat: newCenter.lat, lng: newCenter.lng })
    } catch {
      console.log('could not get new center: ', JSON.stringify(newCenter))
    }
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
      event.preventDefault()
      const params = { search: searchValue }
      fetchPagedEvents(params)
    }
  }

  const handleSearchIconClick = () => {
    const params = { search: searchValue }
    fetchPagedEvents(params)
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

  // use effects

  useEffect(() => {
    const params = { page: pages.current }
    fetchPagedEvents(params)
    fetchPagedReports(params)
  }, [pages.current, tokens])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setLoc({ lat: geo.coords.latitude, lng: geo.coords.longitude })
    })
    setMinimumZoom(11)
  }, [])

  useEffect(() => {
    if (minimumZoom < 0 || minimumZoom > 30) {
      return
    }
    console.log(minimumZoom)
    fetchMappedEvents({
      lon: loc?.lng,
      lat: loc?.lat,
      min: 0,
      max: 5 * minimumZoom,
    })
    fetchMappedReports({
      lon: loc?.lng,
      lat: loc?.lat,
      min: 0,
      max: 5 * minimumZoom,
    })
  }, [minimumZoom, loc])

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-white">
        <div className="relative h-screen flex flex-col items-center justify-end lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] bg-mintGreen space-y-5">
          <h1>Temukan Acara Co-Bersih Terdekat</h1>
          {loc?.lat && loc.lng ? (
            <div>
              <DynamicMap
                center={loc}
                events={mapEventsData}
                reports={mapReportsData}
                className="min-w-[80vw] lg:h-[500px] h-[400px] rounded-full"
                onZoomChange={handleZoomChange}
                onMove={handleMove}
              />
            </div>
          ) : (
            <p className=" bg-red-300 p-2 rounded-md my-auto">
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
              <h4>Buat Kegiatan</h4>
            </Button>
            <Button
              variant={'deserted'}
              onClick={handleClickCreateReport}
              rightIcon={<MdReport />}
            >
              <h4>Buat Laporan</h4>
            </Button>
          </div>
          <br />
        </div>

        <div className="relative min-h-screen flex flex-col items-center py-8 lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] px-4 sm:px-10 md:px-20 space-y-5">
          <Toggle
            items={['Kegiatan', 'Laporan']}
            value={toggleValue}
            setValue={setToggleValue}
            className="w-full"
          />
          {toggleValue === 0 ? (
            <>
              <div className="flex lg:flex-row md:flex-row flex-col w-full lg:items-center md:items-center items-end lg:space-x-4 md:space-x-4 space-x-0 lg:space-y-0 md:space-y-0 space-y-4">
                <div className="w-full flex h-fit select-none items-center justify-center rounded-full tracking-wider transition-all border-2 border-darkGreen text-black bg-white">
                  <input
                    id="Search"
                    type="text"
                    placeholder="Cari kegiatan ..."
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
                <FilterButton
                  className="h-full"
                  childrenL={<h4>Terbaru</h4>}
                  rightIconL={<MdNewReleases color="white" size={18} />}
                  childrenR={<h4>Terdekat</h4>}
                  rightIconR={<RiTreasureMapFill color="white" size={18} />}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                {eventsData.map((event, idx) => (
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
            </>
          ) : (
            <>
              <div className="flex lg:flex-row md:flex-row flex-col w-full lg:items-center md:items-center items-end lg:space-x-4 md:space-x-4 space-x-0 lg:space-y-0 md:space-y-0 space-y-4">
                <form className="w-full">
                  <div className="flex h-fit select-none items-center justify-center rounded-full tracking-wider transition-all border-2 border-darkGreen text-black bg-white">
                    <input
                      id="Search"
                      type="text"
                      placeholder="Cari laporan ..."
                      className="w-full rounded-full bg-transparent border-transparent focus:border-transparent focus:ring-0 lg:text-[14px] text-[13px]"
                      value={searchValue}
                      onChange={handleSearchInputChange}
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
                  childrenL={<h4>Terbaru</h4>}
                  rightIconL={<MdNewReleases color="white" size={18} />}
                  childrenR={<h4>Terdekat</h4>}
                  rightIconR={<RiTreasureMapFill color="white" size={18} />}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                {reportsData.map((report, idx) => (
                  <ReportCard {...report} key={idx} />
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
            </>
          )}
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
