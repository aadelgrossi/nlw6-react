import {
  createContext,
  useCallback,
  FC,
  useContext,
  useMemo,
  useEffect
} from 'react'

import { Theme as BaseTheme, ChakraProvider } from '@chakra-ui/react'

import { dark, light, useLocalStorage } from './'

interface ThemeContextData {
  theme: BaseTheme
  toggleTheme(): void
  activeTheme: 'dark' | 'light'
}

const ThemeContext = createContext({} as ThemeContextData)

const ThemeProvider: FC = ({ children }): JSX.Element => {
  const [theme, setTheme] = useLocalStorage<any>('theme', light)

  const toggleTheme = useCallback(() => {
    setTheme(theme === dark ? light : dark)
  }, [setTheme, theme])

  const activeTheme = useMemo(
    () => (theme === light ? 'light' : 'dark'),
    [theme]
  )

  useEffect(() => {
    console.log({ theme: activeTheme })
  }, [theme, activeTheme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, activeTheme }}>
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  )
}

const useTheme = (): ThemeContextData => useContext(ThemeContext)

export { ThemeProvider, useTheme }
