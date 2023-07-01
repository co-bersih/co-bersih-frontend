import { LatLngLiteral } from 'leaflet'

export const dummyEvent: IEvent = {
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

export const dummyEvent2: IEvent = {
  id: 'xxxx-xxxxx-xxxxx-xxxxx',
  host_id: 'xxxx-xxxxx-xxxxx-xxxxx',
  name: 'Dummy Event 2 for Earth Day 2011',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Nunc sed blandit libero volutpat sed cras ornare. Nunc consequat interdum varius sit amet mattis vulputate enim. Sit amet nulla facilisi morbi tempus iaculis urna id. Semper risus in hendrerit gravida rutrum quisque non. Aliquet lectus proin nibh nisl condimentum id. ',
  preparation:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Nunc sed blandit libero volutpat sed cras ornare. Nunc consequat interdum varius sit amet mattis vulputate enim. Sit amet nulla facilisi morbi tempus iaculis urna id. Semper risus in hendrerit gravida rutrum quisque non. Aliquet lectus proin nibh nisl condimentum id. ',
  image_url:
    'https://images.unsplash.com/photo-1682687218982-6c508299e107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  latitude: -6.3,
  longitude: 106.223,
  start_date: new Date(2011, 5, 2),
  end_date: new Date(2011, 5, 2),
  panitia_ids: [],
  support_ids: [],
  total_participant: 19,
}

export const dummyLoc: LatLngLiteral = { lat: 0, lng: 0 }
