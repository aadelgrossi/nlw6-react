import { ReactNode } from 'react'

import { Flex, Image, Stack, useMediaQuery } from '@chakra-ui/react'

import { ThemeToggle } from '~/theme'

interface HeaderProps {
  children: ReactNode
}

export const Header = ({ children }: HeaderProps): JSX.Element => {
  const [isMobile] = useMediaQuery('(max-width: 400px)')

  return (
    <Flex
      as="header"
      p={6}
      borderBottomWidth="1px"
      borderColor="background.500"
    >
      <Flex
        id="content"
        w="full"
        maxW="1120px"
        m="0 auto"
        justify="space-between"
        direction={['column', 'row']}
        align="center"
      >
        <Image
          maxH={12}
          alt="LetMeAsk"
          alignSelf="center"
          src={`/assets/${isMobile ? 'logo-sm' : 'logo'}.svg`}
        />
        <Stack
          w="full"
          direction={['column', 'row']}
          flexWrap="wrap"
          align="center"
          justify={['center', 'flex-end']}
          spacing={4}
          mt={['6', '0']}
        >
          <ThemeToggle />
          {children}
        </Stack>
      </Flex>
    </Flex>
  )
}
