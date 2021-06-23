import { ReactNode } from 'react'

import { Flex } from '@chakra-ui/react'

interface SeparatorProps {
  children: ReactNode
}

export const Separator = ({ children }: SeparatorProps): JSX.Element => {
  return (
    <Flex
      _before={{
        content: "''",
        flex: 1,
        height: '1px',
        background: 'lightgray',
        marginRight: '1rem'
      }}
      _after={{
        content: "''",
        flex: 1,
        height: '1px',
        background: 'lightgray',
        marginLeft: '1rem'
      }}
      align="center"
      className="divider"
      fontSize="14px"
      color="lightgray"
      my="32px"
    >
      {children}
    </Flex>
  )
}
