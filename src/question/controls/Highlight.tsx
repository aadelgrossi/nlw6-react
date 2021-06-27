import {
  IconButton,
  ButtonProps as ChakraButtonProps,
  Icon
} from '@chakra-ui/react'
import { FaRegCommentAlt, FaCommentAlt } from 'react-icons/fa'

interface HighlightProps extends ChakraButtonProps {
  highlighted: boolean
}

export const Highlight = ({
  highlighted = false,
  ...props
}: HighlightProps): JSX.Element => {
  return (
    <IconButton
      {...props}
      variant="ghost"
      _hover={{ background: 'none' }}
      aria-label="like"
      color={highlighted ? 'primary' : 'gray.500'}
      icon={
        <Icon
          color={highlighted ? 'primary' : 'gray.500'}
          as={highlighted ? FaCommentAlt : FaRegCommentAlt}
        />
      }
    />
  )
}
