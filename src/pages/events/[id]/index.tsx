import React from 'react'
import { EventDetailModule } from '@modules'
import type { NextPage } from 'next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const EventDetail: NextPage = () => (
  <>
    {' '}
    <ToastContainer />
    <EventDetailModule />
  </>
)

export default EventDetail
