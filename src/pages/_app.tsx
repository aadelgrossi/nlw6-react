import { FC } from 'react'

import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Next.js Starter with Chakra UI</title>
        <meta
          name="Description"
          content="A Next.js starter configured with Chakra UI"
        />
      </Head>
      <CSSReset />

      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
