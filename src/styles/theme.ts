import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    white: '#f8f8f8',
    text: '#2a292e',
    primary: '#835afd',
    lightgray: '#a8a8b3',
    google: '#ea4335'
  },
  fonts: {
    heading: 'Poppins',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        color: 'text',
        backgroundColor: 'white'
      },
      'body, input, button, textarea': {
        font: '400 16px Roboto, sans-serif'
      }
    }
  }
})
