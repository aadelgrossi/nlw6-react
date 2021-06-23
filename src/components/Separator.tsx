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
        background: 'gray.400',
        marginRight: '1rem'
      }}
      _after={{
        content: "''",
        flex: 1,
        height: '1px',
        background: 'gray.400',
        marginLeft: '1rem'
      }}
      align="center"
      className="divider"
      fontSize="14px"
      color="gray.400"
      my="32px"
    >
      {children}
    </Flex>
  )
}
