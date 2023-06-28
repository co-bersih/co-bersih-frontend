import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { Footer, NavBar } from '@elements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <ToastContainer />
      <Footer />
    </>
  )
}
