import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react'

import {
  Button as ChakraButton,
  ButtonProps as ChakraProps
} from '@chakra-ui/react'

interface ButtonProps extends ChakraProps {
  children: ReactNode
}

const CustomButton: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { children, ...props },
  ref
): JSX.Element => {
  return (
    <ChakraButton
      ref={ref}
      fontWeight="medium"
      transition="filter 0.2s"
      h="50px"
      borderRadius="lg"
      color="white"
      _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
      _hover={{ filter: 'brightness(0.9)' }}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}

export const Button = forwardRef(CustomButton)
