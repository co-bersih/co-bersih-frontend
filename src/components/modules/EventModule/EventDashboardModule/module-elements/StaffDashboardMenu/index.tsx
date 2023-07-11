import { useAuthContext } from '@contexts'
import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { cfg } from 'src/config'
import { useRouter } from 'next/router'
import IEvent from 'src/components/modules/EventModule/module-elements/EventCard/interface'
import { TextInput } from 'flowbite-react'
import { Button } from '@elements'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'

export const StaffDashboardMenu: React.FC<IEvent> = (event) => {
  const router = useRouter()
  const { id } = router.query
  const [staffs, setStaffs] = useState<string[] | null>(null) // existing
  const [textInput, setTextInput] = useState<string>('') // to be added
  const { tokens } = useAuthContext()

  function handleAddStaff() {
    const body = {
      staff_email: textInput,
    }
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
      },
    }
    axios
      .post(`${cfg.API}/api/v1/events/${id}/staffs/`, body, config)
      .then((res) => {
        toast.success('Staf berhasil ditambahkan')
        setStaffs((prev) => (prev ? [...prev, textInput] : [textInput]))
        setTextInput('')
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          toast.error('Mohon untuk me-refresh halaman ini.')
        } else if (err.response.data.errors.length > 0) {
          toast.error(
            `${err.response.data.errors[0].attr} error: ${err.response.data.errors[0].detail}`
          )
        } else {
          toast.error('Telah terjadi kesalahan.')
        }
      })
  }

  function handleRemoveStaff(staffEmail: string) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
      },
    }
    axios
      .delete(`${cfg.API}/api/v1/events/${id}/staffs/${staffEmail}/`, config)
      .then((res) => {
        toast.success('Staf berhasil dihapus')
        setStaffs((prev) =>
          prev ? prev?.filter((val, i) => val !== staffEmail) : []
        )
        console.log(res)
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          toast.error('Mohon untuk me-refresh halaman ini.')
        } else if (err.response.data.errors.length > 0) {
          toast.error(
            `${err.response.data.errors[0].attr} error: ${err.response.data.errors[0].detail}`
          )
        } else {
          toast.error('Telah terjadi kesalahan.')
        }
      })
  }

  function fetchExistingStaffs() {
    setStaffs(event.staffs!)
  }

  useEffect(() => {
    if (event) {
      fetchExistingStaffs()
    }
  }, [event])

  return (
    <>
      <h3 className="mb-4">Atur Staf Event</h3>
      <h4>Staf Aktif</h4>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {staffs?.map((staff, i) => (
          <p
            key={i}
            className="p-2 m-1 bg-slate-200 rounded-full flex justify-between"
          >
            {staff}
            <button
              className="px-1 h-full hover:border hover:border-black hover:bg-red-300 active:bg-red-400 rounded-full"
              onClick={() => {
                handleRemoveStaff(staff)
              }}
            >
              <AiOutlineMinusCircle />
            </button>
          </p>
        ))}
      </div>
      <br />
      <h4>Tambah Staf</h4>
      <form
        className="flex flex-col sm:flex-row sm:justify-start gap-2"
        onSubmit={() => {
          handleAddStaff()
        }}
      >
        <TextInput
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value)
          }}
          placeholder="Alamat email staf yang ingin ditambahkan"
          className="w-full sm:w-[50%]"
        />
        <Button
          variant="greeny"
          rightIcon={<AiOutlinePlusCircle />}
          onClick={() => handleAddStaff()}
          type="button"
        >
          Add Staff
        </Button>
      </form>
    </>
  )
}
