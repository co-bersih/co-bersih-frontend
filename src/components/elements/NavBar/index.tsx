import React from 'react'
import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { CoBersihLogo } from '@icons'
import { RiArticleLine, RiEarthLine, RiHome2Line } from 'react-icons/ri'
import { Button } from '../Button'
import { useAuthContext } from '@contexts'

export const NavBar: React.FC = () => {
  const { user } = useAuthContext()

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
            <h4>Beranda</h4>
          </Button>
        </Navbar.Link>
        <Navbar.Link href="/events">
          <Button
            variant={'primary'}
            leftIcon={<RiEarthLine color="teal" size={16} />}
          >
            <h4>Acara</h4>
          </Button>
        </Navbar.Link>
        <Navbar.Link href="/blogs">
          <Button
            variant={'primary'}
            leftIcon={<RiArticleLine color="teal" size={16} />}
          >
            <h4>Blog</h4>
          </Button>
        </Navbar.Link>
      </Navbar.Collapse>

      {user ? (
        <div className="flex justify-end space-x-2">
          <Dropdown
            inline
            label={
              <Avatar
                alt="User settings"
                img={
                  user?.profileImage
                    ? user.profileImage
                    : '/assets/images/hero/Hero1.png'
                }
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Navbar.Link href={`/profile/${user.id}`}>
              <Dropdown.Item>
                <h4>Profil Anda</h4>
              </Dropdown.Item>
            </Navbar.Link>
            {user.is_admin ? (
              <Navbar.Link href={`/admin`}>
                <Dropdown.Item>
                  <h4>Dashboard Admin</h4>
                </Dropdown.Item>
              </Navbar.Link>
            ) : (
              <></>
            )}
            <Navbar.Link>
              <button
                className="w-full"
                onClick={() => {
                  alert('show modal')
                }}
              >
                <Dropdown.Item>
                  <h4>Masukkan Token</h4>
                </Dropdown.Item>
              </button>
            </Navbar.Link>

            <Dropdown.Divider />

            <Navbar.Link href="/auth/logout">
              <Dropdown.Item>
                <h4>Keluar</h4>
              </Dropdown.Item>
            </Navbar.Link>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      ) : (
        <div>
          <Navbar.Collapse className="justify-end lg:block md:hidden hidden">
            <Navbar.Link href="/auth/register">
              <Button variant={'ghost'}>
                <h4>Daftar</h4>
              </Button>
            </Navbar.Link>
            <Navbar.Link href="/auth/login">
              <Button variant={'solid'}>
                <h4>Masuk</h4>
              </Button>
            </Navbar.Link>
          </Navbar.Collapse>
          <Navbar.Toggle />
        </div>
      )}

      <Navbar.Collapse className="lg:hidden">
        <Navbar.Link href="/landing">
          <h4>Beranda</h4>
        </Navbar.Link>
        <Navbar.Link href="/events">
          <h4>Acara</h4>
        </Navbar.Link>
        <Navbar.Link href="/blogs">
          <h4>Blog</h4>
        </Navbar.Link>
        {user ? (
          <div></div>
        ) : (
          <>
            <Navbar.Link href="/auth/register">
              <h4>Daftar</h4>
            </Navbar.Link>
            <Navbar.Link href="/auth/login">
              <h4>Masuk</h4>
            </Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}
