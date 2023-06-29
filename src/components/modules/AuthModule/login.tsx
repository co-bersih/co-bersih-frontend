import Image from 'next/image'
import React, { useState } from 'react'
import { ILoginData } from './interface'
import { EMPTY_LOGIN_DATA } from './constant'
import { TextInput } from 'flowbite-react'
import { Button } from '@elements'

export const LoginModule: React.FC = () => {
  const [data, setData] = useState<ILoginData>(EMPTY_LOGIN_DATA)

  function onFormChange(target: any) {
    setData(() => ({ ...data, [target.id]: target.value }))
  }

  return (
    <>
      <div className="login flex h-screen bg-gray-100 flex-row">
        <div className="lg:m-0 m-auto bg-white shadow text-gray-900 p-8 flex flex-col items-center justify-center rounded-md lg:w-1/2 lg:space-y-5 space-y-2">
          <h2>Login</h2>
          <form method="POST" action="" className="flex w-full justify-center">
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
                <h4>Password</h4>
                <div className="lg:w-[400px]">
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

              <Button className={'w-full'} variant={'greeny'}>
                <h4>Log In</h4>
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
