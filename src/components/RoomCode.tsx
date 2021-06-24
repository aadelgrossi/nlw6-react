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
        bg="primary"
        border="1px solid #835afd"
      >
        <Image src="/assets/copy.svg" />
      </Button>
      <Button h="40px" p={4} border="1px solid #835afd" variant="ghost">
        Sala: {children}
      </Button>
    </ButtonGroup>
  )
}
