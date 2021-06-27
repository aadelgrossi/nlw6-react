import {
  IconButton,
  ButtonProps as ChakraButtonProps,
  Icon
} from '@chakra-ui/react'
import { HiOutlineCheckCircle, HiCheckCircle } from 'react-icons/hi'

interface HighlightProps extends ChakraButtonProps {
  answered: boolean
}

export const MarkAnswered = ({
  answered = false,
  ...props
}: HighlightProps): JSX.Element => {
  return (
    <IconButton
      {...props}
      variant="ghost"
      _hover={{ background: 'none' }}
      aria-label="mark-answered"
      color={answered ? 'primary' : 'gray.500'}
      icon={
        <Icon
          w={5}
          h={5}
          color={answered ? 'primary' : 'gray.500'}
          as={answered ? HiCheckCircle : HiOutlineCheckCircle}
        />
      }
    />
  )
}
