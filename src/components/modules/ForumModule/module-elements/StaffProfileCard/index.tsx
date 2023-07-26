import { Avatar } from 'flowbite-react'
import { useRouter } from 'next/router'

export const StaffProfileCard: React.FC = () => {
  const router = useRouter()
  return (
    <div
      className="flex items-center gap-x-2 cursor-pointer hover:underline"
      onClick={() => {
        router.push(`/profile/2bc88d2b-faf5-4b03-b6ef-3a463e42a747`)
      }}
    >
      <Avatar
        alt="User settings"
        img={'/assets/images/hero/Hero1.png'}
        rounded
      />
      <p>michaelsinanta</p>
    </div>
  )
}
