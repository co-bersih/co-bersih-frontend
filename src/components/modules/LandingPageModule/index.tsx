import { Action } from './sections/Action'
import { FAQ } from './sections/Faq'
import { Features } from './sections/Features'
import { Hero } from './sections/Hero'
import { WalkingText } from './sections/WalkingText'

export const LandingPageModule: React.FC = () => {
  return (
    <>
      <div className="flex flex-col ">
        <Hero />
        <Action />
        <Features />
        <WalkingText />
        <FAQ />
      </div>
    </>
  )
}
