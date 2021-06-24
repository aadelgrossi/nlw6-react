import { ReactNode, useCallback } from 'react'

import { ButtonGroup, Button, Image } from '@chakra-ui/react'

interface RoomCodeProps {
  children: ReactNode
}

export const RoomCode = ({ children }: RoomCodeProps): JSX.Element => {
  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(children?.toString() ?? '')
  }, [children])

  return (
    <ButtonGroup size="sm" isAttached>
      <Button
        onClick={handleClick}
        h="40px"
        _hover={{ bg: 'primary' }}
        bg="primary"
        borderWidth="1px"
        borderColor="primary"
      >
        <Image src="/assets/copy.svg" />
      </Button>
      <Button
        h="40px"
        p={4}
        borderWidth="1px"
        borderColor="primary"
        variant="ghost"
      >
        Sala: {children}
      </Button>
    </ButtonGroup>
  )
}
