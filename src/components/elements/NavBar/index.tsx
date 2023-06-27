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
      <Navbar.Brand href="#">
        <CoBersihLogo size={'h-8'} />
      </Navbar.Brand>
      <Navbar.Collapse className="justify-center lg:block md:hidden hidden">
        <Navbar.Link href="#">
          <Button
            className={''}
            variant={1}
            leftIcon={<RiHome2Line color="teal" size={16} />}
          >
            <h3>Home</h3>
          </Button>
        </Navbar.Link>
        <Navbar.Link href="#">
          <Button
            className={''}
            variant={1}
            leftIcon={<RiEarthLine color="teal" size={16} />}
          >
            <h3>Events</h3>
          </Button>
        </Navbar.Link>
        <Navbar.Link href="#">
          <Button
            className={''}
            variant={1}
            leftIcon={<RiArticleLine color="teal" size={16} />}
          >
            <h3>Blogs</h3>
          </Button>
        </Navbar.Link>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-end lg:block md:hidden hidden">
        <Navbar.Link href="#">
          <Button className={''} variant={2}>
            <h3>Register</h3>
          </Button>
        </Navbar.Link>
        <Navbar.Link href="#">
          <Button className={''} variant={3}>
            <h3>Sign In</h3>
          </Button>
        </Navbar.Link>
      </Navbar.Collapse>
      <Navbar.Toggle />
      <Navbar.Collapse className="lg:hidden">
        <Navbar.Link href="#">
          <h3>Home</h3>
        </Navbar.Link>
        <Navbar.Link href="#">
          <h3>Events</h3>
        </Navbar.Link>
        <Navbar.Link href="#">
          <h3>Blogs</h3>
        </Navbar.Link>
        <Navbar.Link href="#">
          <h3>Register</h3>
        </Navbar.Link>
        <Navbar.Link href="#">
          <h3>Sign In</h3>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
