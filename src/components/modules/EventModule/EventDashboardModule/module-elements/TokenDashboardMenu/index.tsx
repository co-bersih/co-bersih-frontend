import { useAuthContext } from '@contexts'
import axios from 'axios'
import { Avatar, Pagination } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineCopy } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { UserInterface } from 'src/components/contexts/AuthContext/interface'
import { cfg } from 'src/config'

export const TokenDashboardMenu: React.FC = () => {
  const [pesertaJoin, setPesertaJoin] = useState<UserInterface[]>([])
  const [pesertaJoinPage, setPesertaJoinPage] = useState<any>()
  const [pesertaPresent, setPesertaPresent] = useState<UserInterface[]>([])
  const [pesertaPresentPage, setPesertaPresentPage] = useState<any>()
  const [token, setToken] = useState<string>('G32XA6')
  const router = useRouter()
  const { id } = router.query
  const { tokens: jwt } = useAuthContext()

  function generateToken() {
    // TODO LOGIC
  }

  function fetchPesertaTerdaftar(page: number, params: any) {
    axios
      .get(`${cfg.API}/api/v1/events/${id}/joined-users/?page=${page}`, params)
      .then((res) => {
        setPesertaJoin(res.data.results)
        setPesertaJoinPage(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function fetchPesertaHadir(page: number, params: any) {
    // TODO LOGIC
  }

  function handleCopyCode() {
    toast.success('Kode berhasil disalinkan')
  }

  useEffect(() => {
    if (jwt) {
      fetchPesertaTerdaftar(1, {
        headers: {
          Authorization: `Bearer ${jwt.access}`,
        },
      })
    }
  }, [jwt])

  return (
    <>
      <br />
      <div className="flex flex-col bg-white gap-y-2 shadow-sm p-8 mx-4 rounded-md">
        <h3>Token</h3>
        <div className="flex flex-col">
          <p>
            Disini, anda bisa men-generate dan membagikan token untuk pendataan
            dan kehadiran peserta di Event anda. Ketika peserta memasukkan token
            di halaman INI ( TODO ), partisipasi tersebut akan dicatat di profil
            mereka.
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>
            Pastikan kode ini hanya dibagikan ke peserta yang hadir di lokasi.
          </p>
          <div className="bg-lightGray rounded-lg flex gap-x-2 w-fit mx-auto">
            <h1 className="p-2">{token}</h1>
            <button
              className=" rounded-r-lg bg-gray-300 p-2 hover:scale-[1.05] active:scale-[0.95]"
              onClick={() => {
                handleCopyCode()
              }}
            >
              <AiOutlineCopy size={24} />
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="flex flex-col bg-white gap-y-2 shadow-sm p-8 mx-4 rounded-md">
        <h3>Peserta</h3>
        <div className="flex justify-around text-center">
          <div className=" ">
            <h4 className=" bg-paleGreen px-4 rounded-full">
              Peserta Terdaftar
            </h4>
            <div className="p-4">
              {pesertaJoin.map((peserta, i) => (
                <Link
                  href={`/profile/${peserta.id}`}
                  key={i}
                  className="flex gap-x-2 justify-start items-center hover:underline"
                >
                  <Avatar
                    alt="peserta avatar"
                    img={
                      peserta?.profileImage
                        ? peserta.profileImage
                        : '/assets/images/hero/Hero1.png'
                    }
                    rounded
                    size={'sm'}
                  />
                  <p>{peserta.name}</p>
                </Link>
              ))}
              <Pagination
                currentPage={1}
                onPageChange={(page) => {
                  fetchPesertaTerdaftar(page, {
                    headers: {
                      Authorization: `Bearer ${jwt!.access}`,
                    },
                  })
                }}
                totalPages={Math.ceil(pesertaJoinPage?.count / 10) || 1}
              />
            </div>
          </div>
          <div>
            <h4 className=" bg-paleGreen px-4 rounded-full">Peserta Hadir</h4>
            <div>
              {pesertaPresent.map((peserta, i) => (
                <Link
                  href={`/profile/${peserta.id}`}
                  key={i}
                  className="flex gap-x-2 justify-start items-center hover:underline"
                >
                  <Avatar
                    alt="peserta avatar"
                    img={
                      peserta?.profileImage
                        ? peserta.profileImage
                        : '/assets/images/hero/Hero1.png'
                    }
                    rounded
                    size={'sm'}
                  />
                  <p>{peserta.name}</p>
                </Link>
              ))}
              {/* TODO pagination */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
