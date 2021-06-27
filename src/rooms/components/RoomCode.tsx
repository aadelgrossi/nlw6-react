import { ReactNode, useCallback } from 'react'

import { ButtonGroup, Button, Icon } from '@chakra-ui/react'
import { FiCopy } from 'react-icons/fi'

interface RoomCodeProps {
  children: ReactNode
}

export const RoomCode = ({ children }: RoomCodeProps): JSX.Element => {
  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(children?.toString() ?? '')
  }, [children])

  return (
    <ButtonGroup isAttached>
      <Button
        onClick={handleClick}
        _hover={{ bg: 'primary' }}
        bg="primary"
        borderWidth="1px"
        borderColor="primary"
      >
        <Icon color="white" as={FiCopy} w={5} h={5} />
      </Button>
      <Button
        w="full"
        p={4}
        borderWidth="1px"
        borderColor="primary"
        variant="ghost"
      >
        {children}
      </Button>
    </ButtonGroup>
  )
}
