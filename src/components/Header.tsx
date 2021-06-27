import { ReactNode } from 'react'

import { Flex, Image, HStack } from '@chakra-ui/react'

interface HeaderProps {
  children: ReactNode
}

export const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <Flex as="header" p={6} border="1px solid #e2e2e2">
      <Flex
        id="content"
        w="full"
        maxW="1120px"
        m="0 auto"
        justify="space-between"
        align="center"
      >
        <Image
          maxH={12}
          alt="LetMeAsk"
          alignSelf="center"
          src="/assets/logo.svg"
        />
        <HStack>{children}</HStack>
      </Flex>
    </Flex>
  )
}
