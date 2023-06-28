import React, { useEffect, useState } from 'react'
import EventCard from './module-elements/EventCard'
import { Pagination } from 'flowbite-react'
import axios from 'axios'
import { LatLngLiteral, map } from 'leaflet'
import dynamic from 'next/dynamic'

const dummy: IEvent = {
  id: 'xxxx-xxxxx-xxxxx-xxxxx',
  host_id: 'xxxx-xxxxx-xxxxx-xxxxx',
  name: 'Dummy Event',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Nunc sed blandit libero volutpat sed cras ornare. Nunc consequat interdum varius sit amet mattis vulputate enim. Sit amet nulla facilisi morbi tempus iaculis urna id. Semper risus in hendrerit gravida rutrum quisque non. Aliquet lectus proin nibh nisl condimentum id. ',
  preparation:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Nunc sed blandit libero volutpat sed cras ornare. Nunc consequat interdum varius sit amet mattis vulputate enim. Sit amet nulla facilisi morbi tempus iaculis urna id. Semper risus in hendrerit gravida rutrum quisque non. Aliquet lectus proin nibh nisl condimentum id. ',
  image_url:
    'https://images.unsplash.com/photo-1682687218982-6c508299e107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  latitude: -6.174,
  longitude: 106.823,
  start_date: new Date(2010, 5, 2),
  end_date: new Date(2010, 5, 2),
  panitia_ids: [],
  support_ids: [],
  total_participant: 502,
}

const dummyLoc:LatLngLiteral = {lat: 0, lng: 0} 

export const EventModule: React.FC = () => {
  const [mapData, setMapData] = useState<IEvent[]>([dummy])
  const [catalogData, setCatalogData] = useState<IEvent[]>([dummy, dummy, dummy, dummy])
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
  },[])

  const DynamicMap = dynamic(() => import('../../elements/Map'), {
    ssr: false
  });

  return (
    <>
      <div className="flex flex-col bg-white">
        <div className="relative min-h-[105vh] flex flex-col items-center justify-center lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] bg-mintGreen">
          <h1>Temukan event terdekat.</h1>
          { loc?.lat && loc.lng ? <DynamicMap center={loc} events={mapData} /> : <p className=' bg-red-300 p-2 rounded-md'>Pastikan lokasi Anda menyala dan browser dapat menggunakan lokasi tersebut.</p> }
        </div>
        <div className="relative min-h-screen flex flex-col items-center py-8 lg:rounded-b-[150px] md:rounded-b-[100px] rounded-b-[25px] px-20">
          <p>search bar</p>
          <div className="grid grid-cols-2 gap-8">
            {catalogData.map((event, idx) => (
                <EventCard {...event} key={idx}/>
            ))}
          </div>
          <br />

          {/* https://www.flowbite-react.com/docs/components/pagination */}
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page)
            }}
            totalPages={100}
            className=" text-sm"
          />
        </div>
      </div>
    </>
  )
}
