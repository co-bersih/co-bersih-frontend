import { Button } from '@elements'
import { RiHome2Line } from 'react-icons/ri'

export default function Artex() {
  return (
    <>
      <Button
        className={''}
        variant={1}
        leftIcon={<RiHome2Line color="teal" size={16} />}
      >
        <h3>Home</h3>
      </Button>
      <Button className={''} variant={2}>
        <h3>Login</h3>
      </Button>
      <Button className={''} variant={3}>
        <h3>Home</h3>
      </Button>
      <Button
        className={''}
        variant={4}
        rightIcon={<RiHome2Line color="white" size={16} />}
      >
        <h3>Home</h3>
      </Button>
      <Button
        className={''}
        variant={5}
        rightIcon={<RiHome2Line color="darkGreen" size={16} />}
      >
        <h3>Home</h3>
      </Button>
    </>
  )
}
