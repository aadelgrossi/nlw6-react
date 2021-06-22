import { FC } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { theme } from '~/styles/theme'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>Next.js Starter with Chakra UI</title>
        <meta
          name="Description"
          content="A Next.js starter configured with Chakra UI"
        />
      </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
