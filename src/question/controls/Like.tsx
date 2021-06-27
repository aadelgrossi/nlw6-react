import { ReactNode } from 'react'

import {
  Button,
  ButtonProps as ChakraButtonProps,
  Text,
  Icon
} from '@chakra-ui/react'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'

interface ButtonProps extends ChakraButtonProps {
  liked: boolean
  children: ReactNode
}

export const Like = ({
  children,
  liked = false,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <Button
      {...props}
      variant="ghost"
      _hover={{ background: 'none' }}
      aria-label="like"
      color={liked ? 'primary' : 'gray.500'}
      rightIcon={
        <Icon
          w={5}
          h={5}
          color={liked ? 'primary' : 'gray.500'}
          as={liked ? AiFillLike : AiOutlineLike}
        />
      }
    >
      {Number(children?.toString()) > 0 && <Text as="span">{children}</Text>}
    </Button>
  )
}
