import { useAuthContext } from '@contexts'
import { Button } from '@elements'
import { formatter } from '@utils'
import axios from 'axios'
import { Avatar, Pagination, Spinner, TextInput } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineCopy } from 'react-icons/ai'
import { cfg } from 'src/config'

export const SaldoDashboardMenu: React.FC = () => {
  const router = useRouter()
  const [saldo, setSaldo] = useState<number>(1500000)
  const { id } = router.query
  const { tokens, loading: isAuthLoading } = useAuthContext()
  const [isLoading, setLoading] = useState<boolean>(false)

  function fetchEventSaldo() {
    axios
      .get(`${cfg.API}/api/v1/events/${id}/saldo`)
      .then((res) => {
        console.log('saldo', res.data)
        // TODO
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleWithdraw() {
    // TODO
    setLoading(true)
    alert('withdraw')
  }

  useEffect(() => {
    if (!isAuthLoading && tokens) {
      fetchEventSaldo()
    }
  }, [isAuthLoading, tokens])

  return (
    <>
      <br />
      <div className="flex flex-col bg-white gap-y-8 shadow-sm p-8 mx-4 rounded-md">
        <div className="flex gap-x-8 items-center">
          <h3>Donasi</h3>
          <input
            className="w-full mx-auto text-center text-xl font-black p-1 border border-gray-200 rounded-lg"
            value={formatter.formatMoney(saldo)}
            disabled
          />
        </div>
        <div className="flex flex-col">
          <p>
            Anda dapat menarik saldo yang telah diperoleh dari donasi pengguna
            atas kegiatan Anda. Saldo ini bisa digunakan untuk keperluan
            kegiatan.
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <Button
            variant={'greeny'}
            className="w-fit mx-auto"
            onClick={() => {
              handleWithdraw()
            }}
            disabled={isLoading}
          >
            {!isLoading ? 'Tarik Saldo' : <Spinner />}
          </Button>
          {isLoading ? <p className="mx-auto">Mohon menunggu....</p> : <></>}
        </div>
      </div>
    </>
  )
}
