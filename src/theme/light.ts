import { extendTheme } from '@chakra-ui/react'

export const light = extendTheme({
  colors: {
    background: {
      400: '#f8f8f8',
      500: '#fefefe'
    },
    accent: {
      300: '#DBDCDD',
      400: '#a8a8b3',
      500: '#737380',
      600: '#575760'
    },
    text: '#2a292e',
    textalt: '#f8f8f8',
    primary: '#835afd',
    secondary: '#e559f9',
    danger: '#E73F5D',
    highlight: '#F4F0FF',
    google: '#ea4335'
  },
  fonts: {
    heading: 'Poppins',
    body: 'Roboto'
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium'
      }
    }
  },
  styles: {
    global: {
      body: {
        color: 'text',
        backgroundColor: 'background.400'
      },
      'body, input, button, textarea': {
        font: '400 16px Roboto, sans-serif'
      }
    }
  }
})
