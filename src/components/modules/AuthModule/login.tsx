import Image from 'next/image'
import React, { useState } from 'react'
import { ILoginData } from './interface'
import { EMPTY_LOGIN_DATA } from './constant'
import { Spinner, TextInput } from 'flowbite-react'
import { Button } from '@elements'
import axios from 'axios'
import { useAuthContext } from '@contexts'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { cfg } from 'src/config'

export const LoginModule: React.FC = () => {
  const [data, setData] = useState<ILoginData>(EMPTY_LOGIN_DATA)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const { saveTokens } = useAuthContext()
  const router = useRouter()

  function onFormChange(target: any) {
    setData(() => ({ ...data, [target.id]: target.value }))
  }

  function handleLogin() {
    setIsLoading(true)
    axios
      .post(`${cfg.API}/api/v1/user/login/`, data)
      .then((response) => {
        toast.success('Successfully log in.', {
          position: toast.POSITION.TOP_CENTER,
        })
        saveTokens(response.data.refresh, response.data.access)
        setTimeout(() => {
          router.push('/')
        }, 1000)
      })
      .catch((error) => {
        if (error.response.data && Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach((err: any) => {
            if (err.attr === 'email') {
              setEmailError(err.detail)
            } else if (err.attr === 'password') {
              setPasswordError(err.detail)
            } else {
              toast.error(err.detail, {
                position: toast.POSITION.TOP_CENTER,
              })
            }
          })
        } else {
          toast.error('An error occurred during login.', {
            position: toast.POSITION.TOP_CENTER,
          })
        }
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className="login flex h-screen bg-gray-100 flex-row">
        <div className="lg:m-0 m-auto bg-white shadow text-gray-900 p-8 flex flex-col items-center justify-center rounded-md lg:w-1/2 lg:space-y-5 space-y-2">
          <h2>Masuk</h2>
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
                <h4>Kata Sandi</h4>
                <div className="lg:w-[400px]">
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Kata Sandi"
                    onChange={(e) => {
                      onFormChange(e.target)
                      setPasswordError('')
                    }}
                    value={data.password}
                    required={true}
                  />
                  {passwordError && (
                    <p className="text-red-500 pt-2">{passwordError}</p>
                  )}
                </div>
              </div>
              <Button
                className={'w-full'}
                variant={'greeny'}
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : <h4>Masuk</h4>}
              </Button>
            </div>
          </form>
          <p>
            Belum mempunyai akun?{' '}
            <a className="text-md text-gray-600" href="/auth/register">
              Buat Akun
            </a>
          </p>
        </div>
        <div className="lg:flex-1 hidden lg:block justify-center">
          <div className="bg-cover bg-center bg-no-repeat flex h-full">
            <Image
              src="/assets/images/auth/Login.png"
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
