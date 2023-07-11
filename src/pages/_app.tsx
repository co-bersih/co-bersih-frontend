import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { Footer, NavBar } from '@elements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'
import { AuthContextProvider } from '@contexts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <Head>
          <title>Co-Bersih</title>
          <link
            rel="icon"
            href="/assets/images/hero/Hero1.png"
            type="image/icon type"
          />
        </Head>
        <NavBar />
        <Component {...pageProps} />
        <ToastContainer />
        <Footer />
      </AuthContextProvider>
    </>
  )
}
