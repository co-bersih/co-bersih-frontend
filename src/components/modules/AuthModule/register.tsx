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
import { cfg } from 'src/config'

export const RegisterModule: React.FC = () => {
  const [data, setData] = useState<IRegisterData>(EMPTY_REGISTER_DATA)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<string>('')
  const [nameError, setNameError] = useState<string>('')
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [repeatPassError, setRepeatPassError] = useState<string>('')
  const router = useRouter()

  function onFormChange(target: any) {
    setData(() => ({ ...data, [target.id]: target.value }))
  }

  function handleRegister() {
    setIsLoading(true)
    if (data.password2 == '') {
      setRepeatPassError('This field may not blank')
      setTimeout(() => {
        setIsLoading(false)
      }, 5)
    } else if (data.password !== data.password2) {
      setRepeatPassError('Password is not match')
      setTimeout(() => {
        setIsLoading(false)
      }, 5)
    } else {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('name', data.name)

      axios
        .post(`${cfg.API}/api/v1/user/register/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          toast.success('Successfully registered user. Please log in...', {
            position: toast.POSITION.TOP_CENTER,
          })

          setTimeout(() => {
            router.push('/auth/login')
          }, 2000)
        })
        .catch((error) => {
          console.log(error.response.data)
          if (
            error.response.data &&
            Array.isArray(error.response.data.errors)
          ) {
            const errors = error.response.data.errors
            const passwordErrorMessages = errors
              .filter((err: any) => err.attr === 'password')
              .map((err: any) => err.detail)
            setPasswordErrors(passwordErrorMessages)
            errors.forEach((err: any) => {
              if (err.attr === 'email') {
                setEmailError(err.detail)
              } else if (err.attr === 'name') {
                setNameError(err.detail)
              } else if (err.attr === 'password') {
              } else {
                toast.error(err.detail, {
                  position: toast.POSITION.TOP_CENTER,
                })
              }
            })
          } else {
            toast.error('An error occurred during register.', {
              position: toast.POSITION.TOP_CENTER,
            })
          }
          setIsLoading(false)
        })
    }
  }

  return (
    <>
      <div className="login flex h-screen bg-gray-100 flex-row overflow-y-scroll">
        <div className="lg:m-0 m-auto bg-white shadow text-gray-900 p-8 flex flex-col items-center justify-center rounded-md lg:w-1/2 lg:space-y-5 space-y-2">
          <h2>Daftar</h2>
          <form className="flex w-full justify-center">
            <div className="pt-5 w-full lg:w-auto lg:space-y-5 space-y-2">
              <div className="flex flex-col w-full lg:w-auto">
                <h4>Email</h4>
                <div className="lg:w-[400px]">
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      onFormChange(e.target)
                      setEmailError('')
                    }}
                    value={data.email}
                    required={true}
                  />
                  {emailError && (
                    <p className="text-red-500 pt-2">{emailError}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full lg:w-auto">
                <h4>Nama</h4>
                <div className="lg:w-[400px]">
                  <TextInput
                    id="name"
                    type="text"
                    placeholder="Nama"
                    onChange={(e) => {
                      onFormChange(e.target)
                      setNameError('')
                    }}
                    value={data.name}
                    required={true}
                  />
                  {nameError && (
                    <p className="text-red-500 pt-2">{nameError}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full lg:w-auto">
                <h4>Kata Sandi</h4>
                <div className="w-full">
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Kata Sandi"
                    onChange={(e) => {
                      onFormChange(e.target)
                      setPasswordErrors([])
                    }}
                    value={data.password}
                    required={true}
                  />
                  {passwordErrors.map((error, index) => (
                    <p key={index} className="text-red-500 pt-2">
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col w-full lg:w-auto">
                <h4>Ulangi Kata Sandi Anda</h4>
                <div className="w-full">
                  <TextInput
                    id="password2"
                    type="password"
                    placeholder="Kata Sandi"
                    onChange={(e) => {
                      onFormChange(e.target)
                      setRepeatPassError('')
                    }}
                    value={data.password2}
                    required={true}
                  />
                  {repeatPassError && (
                    <p className="text-red-500 pt-2">{repeatPassError}</p>
                  )}
                </div>
              </div>

              <Button
                onClick={handleRegister}
                className={'w-full'}
                variant={'greeny'}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : <h4>Daftar</h4>}
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
