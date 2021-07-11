import { FC } from 'react'

import { Box } from '@chakra-ui/react'

export const Card: FC<{ href: string }> = ({ children, ...props }) => {
  return (
    <Box
      as="a"
      p="6"
      m="4"
      borderWidth="2px"
      borderColor="accent.200"
      rounded="lg"
      flexBasis={['auto', '45%']}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      _hover={{
        borderColor: 'teal.500'
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
