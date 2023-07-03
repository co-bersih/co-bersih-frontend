import React from 'react'
import { HeroModule } from './sections/hero'
import { ActionModule } from './sections/action'
import { WalkingText } from './sections/walking'

export const LandingPageModule: React.FC = () => {
  return (
    <>
      <div className="flex flex-col ">
        <HeroModule />
        <ActionModule />
        <WalkingText />
      </div>
    </>
  )
}
