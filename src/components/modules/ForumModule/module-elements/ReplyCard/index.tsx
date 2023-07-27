import { Avatar } from 'flowbite-react'
import { useRouter } from 'next/router'
import { BsFillChatRightTextFill } from 'react-icons/bs'

export const ReplyCard: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col  border-2 border-paleGreen p-5 rounded-2xl space-y-2">
        <div className="flex justify-between w-full">
          <div className="flex lg:space-x-3 md:space-x-3 space-x-0 items-center justify-center">
            <Avatar
              alt="User settings"
              img={'/assets/images/hero/Hero1.png'}
              className="lg:block md:block hidden"
              rounded
            />
            <div className="flex flex-col">
              <h4>Ervalsa Dwi Nanda</h4>
              <p className="text-sm">Android Developer</p>
            </div>
          </div>

          <h4 className="text-gray-500">2 hari yang lalu</h4>
        </div>
        <p>
          Baca dokumentasi makanya bang, jangan malas baca coy, baca betul betul
        </p>
      </div>
    </>
  )
}
