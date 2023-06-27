import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { Footer, NavBar } from '@elements'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
