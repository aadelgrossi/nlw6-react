import { FC } from 'react'

import { AppProps } from 'next/app'
import Head from 'next/head'

import { AppProvider } from '~/providers'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Head>
        <title>Let Me Ask | NLW #6 React</title>
        <meta
          name="Let Me Ask"
          content="Crie salas de Q&A ao vivo e tire as dúvidas da sua audiência em tempo real"
        />
      </Head>

      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
