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
import { BankAccount } from '../../interface'
import { useForm } from 'react-hook-form'
import { BANK_CODE_MAPPING } from '../../../CreateEventModule/constant'
import { toast } from 'react-toastify'
import IEvent from '../../../module-elements/EventCard/interface'

export const SaldoDashboardMenu: React.FC<IEvent> = (event) => {
  const router = useRouter()
  const [saldo, setSaldo] = useState<number>(-1)
  const { id } = router.query
  const { tokens, loading: isAuthLoading } = useAuthContext()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<BankAccount>()
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BankAccount>({ values: data })

  function fetchEventSaldo() {
    setSaldo(event.total_donation!)
  }

  function fetchEventBankAccount() {
    axios
      .get(`${cfg.API}/api/v1/events/${id}/account/`, {
        headers: { Authorization: `Bearer ${tokens?.access}` },
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleWithdraw() {
    // TODO
    setLoading(true)
    alert('withdraw')

    // affter success, setSaldo(0)
  }

  const onSubmit = async (data: BankAccount) => {
    axios
      .patch(`${cfg.API}/api/v1/events/${id}/`, data, {
        headers: { Authorization: `Bearer ${tokens?.access}` },
      })
      .then((res) => {
        toast.success('Anda berhasil memperbarui akun bank.')
      })
      .catch((err) => {
        toast.error('Telah terjadi kesalahan.')
      })
  }

  useEffect(() => {
    if (!isAuthLoading && tokens) {
      fetchEventSaldo()
      fetchEventBankAccount()
    }
  }, [isAuthLoading, tokens])

  return (
    <>
      <div className="flex flex-col bg-white gap-y-2 shadow-sm p-8 mx-4 rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 items-center w-full"
        >
          <h3 className="mr-auto">Atur Akun Bank</h3>
          <div className="flex w-full">
            <h4 className="min-w-[25%]">Tipe Bank</h4>
            <select
              className="w-full rounded-lg border border-gray-300 bg-gray-50 text-sm"
              {...register('bank_code', {
                required: 'select one option',
              })}
            >
              {Object.keys(BANK_CODE_MAPPING).map((code, i) => (
                <option key={i} value={code}>
                  {BANK_CODE_MAPPING[code]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full">
            <h4 className="min-w-[25%]">Nomor Akun</h4>
            <TextInput
              className="w-full col-span-3"
              {...register('account_number', {
                required: 'Kegiatan harus terasosiasi dengan akun bank',
                maxLength: 100,
                minLength: 1,
              })}
            />
          </div>
          <Button variant={'greeny'} className="ml-auto">
            Simpan
          </Button>
        </form>
      </div>
      <br />
      <div className="flex flex-col bg-white gap-y-8 shadow-sm p-8 mx-4 rounded-md">
        <div className="flex flex-col gap-2 items-start">
          <h3>Donasi</h3>
          <input
            className="w-full mx-auto text-center text-xl font-black p-1 border border-gray-200 rounded-lg"
            value={formatter.formatMoney(saldo)}
            disabled
          />
          <p>
            Anda dapat menarik saldo yang telah diperoleh dari donasi pengguna
            atas kegiatan Anda. Saldo ini bisa digunakan untuk keperluan
            kegiatan.
          </p>
        </div>
        <div className="flex flex-col gap-y-1">
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
