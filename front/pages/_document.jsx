import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html>
      <Head>
        <link rel='stylesheet' href='/flickity/flickity.min.css' />
        <script src='/flickity/flickity.pkgd.min.js' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Poppins:200,300,regular,500,600,700,800&display=swap' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
