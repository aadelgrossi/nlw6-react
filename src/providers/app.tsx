import { FC } from 'react'

import { ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from '~/auth'
import { theme } from '~/styles/theme'

export const AppProvider: FC = ({ children }) => (
  <ChakraProvider resetCSS theme={theme}>
    <AuthProvider>{children}</AuthProvider>
  </ChakraProvider>
)
