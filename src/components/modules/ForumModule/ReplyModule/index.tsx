import { useRouter } from 'next/router'
import { ForumCard, ReplyCard } from '../module-elements'
import { Breadcrumb, Textarea } from 'flowbite-react'
import { Button } from '@elements'

export const ReplyModule: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <div className="overflow-x-hidden relative px-3 sm:px-8 md:px-32 lg:px-32 pt-20 pb-8 flex flex-row gap-4 justify-center">
        <div className="flex flex-col h-full space-y-5">
          <Breadcrumb className="mr-auto">
            <Breadcrumb.Item href="/events">Kegiatan</Breadcrumb.Item>
            <Breadcrumb.Item href={`/events/${id}`}>
              Detail Kegiatan
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/forum/${id}`}>Forum</Breadcrumb.Item>
          </Breadcrumb>
          <ForumCard />
          <Textarea
            className="w-full col-span-3 text-base bg-paleGreen bg-opacity-40 border-0"
            rows={3}
            placeholder="Beri jawaban ..."
          />
          <div className="w-full justify-end flex">
            <Button variant="greeny" className="w-fit">
              Beri Jawaban
            </Button>
          </div>
          <div className="flex flex-col bg-white w-full rounded-2xl space-y-2  overflow-y-scroll">
            <ReplyCard />
            <ReplyCard />
            <ReplyCard />
            <ReplyCard />
          </div>
        </div>
      </div>
    </>
  )
}
