import { Button } from '@elements'
import { TextInput } from 'flowbite-react'
import { useState } from 'react'
import { RiHome2Line } from 'react-icons/ri'

export default function Artex() {
  const [name, setName] = useState('')

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
      <TextInput
        required
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
    </>
  )
}
