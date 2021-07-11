import { FC } from 'react'

import { AuthProvider } from '~/auth'
import { ThemeProvider } from '~/theme'

export const AppProvider: FC = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
)
