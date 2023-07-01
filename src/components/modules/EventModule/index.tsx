import React, { ChangeEvent, useEffect, useState } from 'react'
import EventCard from './module-elements/EventCard'
import { Pagination, TextInput } from 'flowbite-react'
import axios from 'axios'
import { LatLngLiteral, map } from 'leaflet'
import dynamic from 'next/dynamic'
import { MagnifyingGlass, Plus } from '@icons'
import { dummyEvent, dummyEvent2, dummyLoc } from './constant'
import { Button } from '@elements'
import { useRouter } from 'next/router'

const DynamicMap = dynamic(() => import('src/components/elements/Map'), {
  ssr: false,
})

export const EventModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const router = useRouter()
  const [mapData, setMapData] = useState<IEvent[]>([dummyEvent, dummyEvent2])
  const [catalogData, setCatalogData] = useState<IEvent[]>([
    dummyEvent,
    dummyEvent,
    dummyEvent2,
    dummyEvent2,
  ])
  const [loc, setLoc] = useState<LatLngLiteral | undefined>(dummyLoc)
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page: number) => {
    // TODO: re-fetch catalog on new page
    setCurrentPage(page)
  }

  const onScrollOut = () => {
    // TODO: refetch for new range
  }

  function fetchEvents() {
    axios
      .get(`/events?page=${currentPage}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

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

  return (
    <>
      <div className="flex flex-col bg-white">
        <div className="relative min-h-[105vh] flex flex-col items-center justify-center lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] bg-mintGreen py-4">
          <h1>Temukan event terdekat.</h1>
          {loc?.lat && loc.lng ? (
            <DynamicMap
              center={loc}
              events={mapData}
              className="min-w-[90vw] min-h-[500px] md:w-[80vw] lg:w-[65vw] rounded-3xl"
            />
          ) : (
            <p className=" bg-red-300 p-2 rounded-md">
              Pastikan lokasi Anda menyala dan browser dapat menggunakan lokasi
              tersebut.
            </p>
          )}
        </div>
        <div className="relative min-h-screen flex flex-col items-center py-8 lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] px-4 sm:px-10 md:px-20">
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
          <Button
            variant={'greeny'}
            onClick={() => {
              router.push('/events/new')
            }}
          >
            <h4>Buat Event Baru!</h4>
          </Button>
          <br />

          {/* https://www.flowbite-react.com/docs/components/pagination */}
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page)
            }}
            totalPages={100}
            className="text-sm"
          />
        </div>
      </div>
    </>
  )
}
