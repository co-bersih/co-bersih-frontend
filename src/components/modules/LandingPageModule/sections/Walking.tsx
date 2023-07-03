import { Globe } from '@icons'

export const WalkingText: React.FC = () => {
  return (
    <div id="relative">
      <div className="flex flex-row overflow-x-hidden">
        <span className="marqueeStyle  overflow-x-hidden  bg-teal">
          {Array.from({ length: 8 }, (item, index) => (
            <div
              key={index}
              className="flex flex-row items-center space-x-5 mx-5"
            >
              <Globe size={'12'} />
              <h3 className="text-white whitespace-nowrap">Co-Bersih</h3>
            </div>
          ))}
        </span>
        <span className="marqueeStyle  overflow-x-hidden  bg-teal">
          {Array.from({ length: 8 }, (item, index) => (
            <div
              key={index}
              className="flex flex-row items-center space-x-5 mx-5"
            >
              <Globe size={'12'} />
              <h3 className="text-white whitespace-nowrap">Co-Bersih</h3>
            </div>
          ))}
        </span>
      </div>
    </div>
  )
}
