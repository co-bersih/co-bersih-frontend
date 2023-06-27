import { Button } from '@elements'
import React from 'react'
import { RiArticleLine, RiEarthLine, RiHome2Line } from 'react-icons/ri'
import Image from 'next/image'
import { HeroModule } from './sections/hero'

export const LandingPageModule: React.FC = () => {
  return (
    <>
      <div className="flex flex-col ">
        <HeroModule />
        <div className="h-screen bg-mintGreen"></div>
      </div>
    </>
  )
}
