import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Co-Bersih</title>
        <link
          rel="icon"
          href="/assets/images/hero/Hero1.png"
          type="image/icon type"
        />
      </Head>{' '}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
