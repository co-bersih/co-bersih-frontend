import React from 'react'
import { Navbar } from 'flowbite-react'
import { CoBersihLogo } from '@icons'
import { RiArticleLine, RiEarthLine, RiHome2Line } from 'react-icons/ri'
import { Button } from '../Button'

export const NavBar: React.FC = () => {
  return (
    <Navbar
      rounded
      className="flex justify-between fixed top-0 w-full bg-white z-50 py-4"
    >
      <Navbar.Brand href="/">
        <CoBersihLogo size={'h-8'} className="w-[120px] sm:w-auto" />
      </Navbar.Brand>
      <Navbar.Collapse className="justify-center lg:block md:hidden hidden">
        <Navbar.Link href="/">
          <Button
            variant={'primary'}
            leftIcon={<RiHome2Line color="teal" size={16} />}
          >
            <h4>Home</h4>
          </Button>
        </Navbar.Link>
        <Navbar.Link href="/events">
          <Button
            variant={'primary'}
            leftIcon={<RiEarthLine color="teal" size={16} />}
          >
            <h4>Events</h4>
          </Button>
        </Navbar.Link>
        <Navbar.Link href="/blogs">
          <Button
            variant={'primary'}
            leftIcon={<RiArticleLine color="teal" size={16} />}
          >
            <h4>Blogs</h4>
          </Button>
        </Navbar.Link>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-end lg:block md:hidden hidden">
        <Navbar.Link href="/auth/register">
          <Button variant={'ghost'}>
            <h4>Register</h4>
          </Button>
        </Navbar.Link>
        <Navbar.Link href="/auth/login">
          <Button variant={'solid'}>
            <h4>Log In</h4>
          </Button>
        </Navbar.Link>
      </Navbar.Collapse>
      <Navbar.Toggle />
      <Navbar.Collapse className="lg:hidden">
        <Navbar.Link href="/landing">
          <h4>Home</h4>
        </Navbar.Link>
        <Navbar.Link href="/events">
          <h4>Events</h4>
        </Navbar.Link>
        <Navbar.Link href="/blogs">
          <h4>Blogs</h4>
        </Navbar.Link>
        <Navbar.Link href="/auth/register">
          <h4>Register</h4>
        </Navbar.Link>
        <Navbar.Link href="/auth/login">
          <h4>Log In</h4>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
