import { Button } from '@elements'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, useToast } from 'react-toastify'
import { AdminTabs } from './constant'
import { Spinner } from 'flowbite-react'
import { useAuthContext } from '@contexts'
import { useRouter } from 'next/router'
import { VerifKegiatanAdminMenu } from './module-elements/VerifKegiatanAdminMenu'
import { ManageBlogAdminMenu } from './module-elements/ManageBlogAdminMenu'

export const AdminModule: React.FC = () => {
  const [tab, setTab] = useState<AdminTabs>(AdminTabs.kegiatan)
  const { user, loading: isAuthLoading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthLoading && user?.email && !user?.is_admin) {
      toast.error('Anda tidak memiliki akses ke halaman tersebut.')
      router.push('/')
    }
  }, [isAuthLoading, user])

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-white relative gap-x-12 pt-24 pb-8 px-4 sm:px-12 md:px-24 lg:px-32 xl:px-36 gap-y-2 min-h-screen">
        <div className="relative h-full flex flex-col md:flex-row">
          {/* sidebar */}
          <div className="border border-black p-4 rounded-xl flex flex-col gap-y-4">
            <h2>Dashboard Admin</h2>
            <Button
              variant={tab === AdminTabs.kegiatan ? 'greeny' : 'primary'}
              onClick={() => {
                setTab(AdminTabs.kegiatan)
              }}
            >
              Daftar Kegiatan
            </Button>
            <Button
              variant={tab === AdminTabs.blog ? 'greeny' : 'primary'}
              onClick={() => {
                setTab(AdminTabs.blog)
              }}
            >
              Manajemen Blog
            </Button>
          </div>

          {/* main */}
          <div className="relative rounded-xl bg-neutral-50 w-full h-full p-4 flex flex-col overflow-x-scroll">
            {tab === AdminTabs.kegiatan ? (
              user?.is_admin ? (
                <VerifKegiatanAdminMenu />
              ) : (
                <Spinner className="mx-auto w-full mt-[25%]" />
              )
            ) : (
              <></>
            )}
            {tab === AdminTabs.blog ? (
              user?.is_admin ? (
                <ManageBlogAdminMenu />
              ) : (
                <Spinner className="mx-auto w-full mt-[25%]" />
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
