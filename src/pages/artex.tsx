import { Button, FilterButton, Toggle } from '@elements'
import { TextInput } from 'flowbite-react'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiGroupFill, RiHome2Line, RiTreasureMapFill } from 'react-icons/ri'

export default function Artex() {
  const [name, setName] = useState('')

  const [searchValue, setSearchValue] = useState('')
  const [toggleValue, setToggleValue] = useState(0)

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value)
  }

  const handleSearchInputSubmit = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      // find the event
    }
  }

  const handleSearchIconClick = () => {
    // find the event
  }

  return (
    <>
      <Button
        variant={'primary'}
        leftIcon={<RiHome2Line color="teal" size={16} />}
      >
        <h3>Home</h3>
      </Button>
      <Button variant={'ghost'}>
        <h3>Login</h3>
      </Button>
      <Button variant={'solid'}>
        <h3>Home</h3>
      </Button>
      <Button
        variant={'greeny'}
        rightIcon={<RiHome2Line color="white" size={16} />}
      >
        <h3>Home</h3>
      </Button>
      <Button
        variant={'deserted'}
        rightIcon={<RiHome2Line color="darkGreen" size={16} />}
      >
        <h3>Home</h3>
      </Button>

      {/* Toggle Button */}
      <Toggle
        items={['Events', 'Reports']}
        value={toggleValue}
        setValue={setToggleValue}
      />

      {/* Search Bar */}
      <form>
        <div className="flex h-fit w-full select-none items-center justify-center rounded-full tracking-wider transition-all border-2 border-darkGreen text-black bg-white">
          <input
            id="Search"
            type="text"
            placeholder="Search"
            className="w-full rounded-full bg-transparent border-transparent focus:border-transparent focus:ring-0"
            value={searchValue}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputSubmit}
          />
          <span
            className="stroke-current bg-mintGreen p-2 justify-center flex rounded-full mr-1 cursor-pointer"
            onClick={handleSearchIconClick}
          >
            <AiOutlineSearch color="black" size="18" />
          </span>
        </div>
      </form>

      {/* Filter Button */}
      <FilterButton
        className="w-full"
        childrenL={<h4>Popularity</h4>}
        rightIconL={<RiGroupFill color="white" size={18} />}
        childrenR={<h4>Distance</h4>}
        rightIconR={<RiTreasureMapFill color="white" size={18} />}
      />
    </>
  )
}
