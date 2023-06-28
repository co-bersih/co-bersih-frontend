import React, { useState } from 'react'
import EventCard from './module-elements/EventCard'
import { Pagination } from 'flowbite-react';
import axios from 'axios';

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
  latitude: 5.0003,
  longitude: -52.123,
  start_date: new Date(2010, 5, 2),
  end_date: new Date(2010, 5, 2),
  panitia_ids: [],
  support_ids: [],
}

export const EventModule: React.FC = () => {
  const [data, setData] = useState<IEvent[]>([dummy, dummy, dummy, dummy]);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    // TODO: re-fetch on new page
    setCurrentPage(page)
  };

  function fetchEvents() {
    axios.get(`/events?page=${currentPage}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="flex flex-col bg-white">
        <div className="relative min-h-screen flex flex-col items-center justify-center lg:rounded-b-[200px] md:rounded-b-[150px] rounded-b-[50px] bg-mintGreen">
          <p>Temukan Event</p>
          <div>MAP</div>
        </div>
        <div className="relative min-h-screen flex flex-col items-center py-8 lg:rounded-b-[200px] md:rounded-b-[150px] rounded-b-[50px] px-20">
          <p>search bar</p>
          <div className="grid grid-cols-2 gap-8">
            { data.map((event, idx) => (
              <>
                <EventCard {...event}/>
              </>
            ))}
          </div>
          <br/>
          <Pagination
            currentPage={currentPage}
            onPageChange={page=>{setCurrentPage(page)}}
            totalPages={100}
            className=' text-sm'
          />
        </div>
      </div>
    </>
  )
}
