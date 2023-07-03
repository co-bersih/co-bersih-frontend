import React from 'react'
import { HeroModule } from './sections/Hero'
import { ActionModule } from './sections/Action'
import { WalkingText } from './sections/Walking'
import { FaqModule } from './sections/Faq'

export const LandingPageModule: React.FC = () => {
  return (
    <>
      <div className="flex flex-col ">
        <HeroModule />
        <ActionModule />
        <WalkingText />
        <FaqModule />
      </div>
    </>
  )
}
