import { ActionModule } from "./sections/Action"
import { FaqModule } from "./sections/Faq"
import { HeroModule } from "./sections/Hero"
import { WalkingText } from "./sections/Walking"

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
