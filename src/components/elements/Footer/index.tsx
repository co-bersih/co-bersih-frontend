import React from 'react'
import { CoBersihLogo } from '@icons'
import { Footer as FooTer } from 'flowbite-react'
import { BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'

export const Footer: React.FC = () => {
  return (
    <>
      <FooTer container className="bg-mintGreen relative bottom-0">
        <div className="w-full mt-auto">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <FooTer.Brand href="#" src="">
                <CoBersihLogo size={'h-8'} />
              </FooTer.Brand>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FooTer.Title title="Menu" />
                <FooTer.LinkGroup col>
                  <FooTer.Link href="/landing">
                    <h4>Beranda</h4>
                  </FooTer.Link>
                  <FooTer.Link href="/events">
                    <h4>Acara</h4>
                  </FooTer.Link>
                  <FooTer.Link href="/blogs">
                    <h4>Blog</h4>
                  </FooTer.Link>
                </FooTer.LinkGroup>
              </div>
            </div>
          </div>
          <FooTer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooTer.Copyright by="Co-Bersih™" href="#" year={2023} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooTer.Icon href="#" icon={BsInstagram} />
              <FooTer.Icon href="#" icon={BsTwitter} />
              <FooTer.Icon href="#" icon={BsGithub} />
            </div>
          </div>
        </div>
      </FooTer>
    </>
  )
}
