import { Avatar } from 'flowbite-react'
import { useRouter } from 'next/router'
import { BsFillChatRightTextFill } from 'react-icons/bs'

export const ForumCard: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col  border-2 border-darkGreen p-5 rounded-2xl space-y-2">
        <h3>Bagaimana cara menginstall NextJS versi 13?</h3>
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
          Halo teman-teman semuanya. Saya punya pertanyaan, tentang cara untuk
          menginstall NextJS versi 13, yang dimana NextJS 13 adalah versi
          terbaru. Saya mempunyai masalah dengan instalasi yang terbaru, saya
          menda.....
        </p>
        <div
          className="flex w-full justify-end space-x-2 cursor-pointer"
          onClick={() => {
            router.push(
              '/forum/8f3ad134-9470-4077-8be9-b5ca05f2ae71/reply?id=8f3ad134-9470-4077-8be9-b5ca05f2ae71'
            )
          }}
        >
          <BsFillChatRightTextFill size={20} />
          <p className="text-sm">10 Jawaban</p>
        </div>
      </div>
    </>
  )
}
