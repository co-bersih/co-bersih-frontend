import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from '@contexts'
import { Modal } from 'flowbite-react'
import axios from 'axios'
import { cfg } from 'src/config'

export const LogoutModule: React.FC = () => {
  const router = useRouter()
  const { setUser, setTokens, tokens } = useAuthContext()

  useEffect(() => {
    const logout = async () => {
      if (tokens) {
        try {
          await axios.post(
            `${cfg.API}/api/v1/token/blacklist/`,
            { refresh: tokens.refresh },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          setUser(null)
          setTokens(null)
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          setTimeout(() => {
            router.replace('/')
          }, 2000)
        } catch (error) {
          router.replace('/')
        }
      }
    }

    logout()
  }, [tokens, router, setUser, setTokens])

  return (
    <>
      <div className="h-screen items-center justify-center">
        <Modal
          show={true}
          size="xl"
          popup
          className="items-center justify-center h-screen"
        >
          <Modal.Body>
            <div className="text-center mt-6">
              <h2>You have been logged out.</h2>
              <h3> You will be redirected...</h3>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
