import { extendTheme } from '@chakra-ui/react'

export const dark = extendTheme({
  colors: {
    background: {
      400: '#0e0e0e',
      500: '#1f1f1f'
    },
    accent: {
      300: '#E0E0E0',
      400: '#ADADAD',
      500: '#5C5C5C',
      600: '#141414'
    },
    text: '#e8e8e8',
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
