import Image from 'next/image'
import React, { useState } from 'react'
import { IRegisterData } from './interface'
import { EMPTY_REGISTER_DATA } from './constant'
import { TextInput, Spinner } from 'flowbite-react'
import { Button } from '@elements'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useRouter } from 'next/router'

export const RegisterModule: React.FC = () => {
  const [data, setData] = useState<IRegisterData>(EMPTY_REGISTER_DATA)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  function onFormChange(target: any) {
    setData(() => ({ ...data, [target.id]: target.value }))
  }

  function onFormSubmit() {
    setIsLoading(true)
    if (data.password !== data.password2) {
      toast.error(<p>Password tidak sama!</p>, {
        position: toast.POSITION.TOP_CENTER,
      })
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    } else {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('name', data.name)

      axios
        .post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/v1/user/register/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          toast.success('Successfully registered user. Please log in...', {
            position: toast.POSITION.TOP_CENTER,
          })

          setTimeout(() => {
            router.push('/auth/login')
          }, 2000)
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            const errorMessage = JSON.stringify(err.response.data)
            toast.error(<p>{errorMessage}</p>, {
              position: toast.POSITION.TOP_CENTER,
            })
          } else {
            toast.error('An error occurred during register.', {
              position: toast.POSITION.TOP_CENTER,
            })
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <>
      <div className="login flex h-screen bg-gray-100 flex-row">
        <div className="lg:m-0 m-auto bg-white shadow text-gray-900 p-8 flex flex-col items-center justify-center rounded-md lg:w-1/2 lg:space-y-5 space-y-2">
          <h2>Register</h2>
          <form className="flex w-full justify-center">
            <div className="pt-5 w-full lg:w-auto lg:space-y-5 space-y-2">
              <div className="flex flex-col w-full lg:w-auto">
                <h4>Email</h4>
                <div className="lg:w-[400px]">
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => onFormChange(e.target)}
                    value={data.email}
                    required={true}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full lg:w-auto">
                <h4>Name</h4>
                <div className="lg:w-[400px]">
                  <TextInput
                    id="name"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => onFormChange(e.target)}
                    value={data.name}
                    required={true}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full lg:w-auto">
                <h4>Password</h4>
                <div className="w-full">
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => onFormChange(e.target)}
                    value={data.password}
                    required={true}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full lg:w-auto">
                <h4>Repeat your password</h4>
                <div className="w-full">
                  <TextInput
                    id="password2"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => onFormChange(e.target)}
                    value={data.password2}
                    required={true}
                  />
                </div>
              </div>

              <Button
                onClick={onFormSubmit}
                className={'w-full'}
                variant={'greeny'}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : <h4>Register</h4>}
              </Button>
            </div>
          </form>
          <p>
            Sudah mempunyai akun?{' '}
            <a className="text-md text-gray-600" href="/auth/login">
              Masuk Akun
            </a>
          </p>
        </div>
        <div className="lg:flex-1 hidden lg:block justify-center">
          <div className="bg-cover bg-center bg-no-repeat flex h-full">
            <Image
              src="/assets/images/auth/Register.png"
              alt=""
              width={750}
              height={0}
              className="lg:block hidden"
            />
          </div>
        </div>
      </div>
    </>
  )
}
