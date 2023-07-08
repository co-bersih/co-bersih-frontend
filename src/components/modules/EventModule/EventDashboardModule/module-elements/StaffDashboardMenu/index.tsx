import { useAuthContext } from '@contexts'
import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { cfg } from 'src/config'
import { useRouter } from 'next/router'
import IEvent from 'src/components/modules/EventModule/module-elements/EventCard/interface'
import { TextInput } from 'flowbite-react'
import { Button } from '@elements'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

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
      .post(`${cfg.API}/api/v1/events/${id}`, body, config)
      .then((res) => {
        console.log(res)
        setTextInput('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleRemoveStaff(staffEmail: string) {
    // TODO
    axios
      .delete(`api/v1/events/${id}/staffs/${staffEmail}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function fetchExistingStaffs() {
    setStaffs(event.staffs!)
  }

  useEffect(() => {
    if (event) {
      // fetchExistingStaffs()
      // TODO
      setStaffs([
        'me_bbbb@mail.com',
        'you@mail.com',
        'test2@ui.ac.id',
        'awooga@gmail.id',
        'two@outlook.com',
        'test_aaaaa@mail.com',
        'whenthe@mail.com',
        'more@mail.com',
      ])
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
        <Button variant="greeny" rightIcon={<AiOutlinePlusCircle />}>
          Add Staff
        </Button>
      </form>
    </>
  )
}
