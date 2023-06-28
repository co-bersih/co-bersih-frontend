import React from 'react'
import { HeroModule } from './sections/hero'
import { ActionModule } from './sections/action'

export const LandingPageModule: React.FC = () => {
  return (
    <>
      <div className="flex flex-col ">
        <HeroModule />
        <ActionModule />
      </div>
    </>
  )
}
