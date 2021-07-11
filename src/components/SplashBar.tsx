import { Flex, Image, Heading, Text } from '@chakra-ui/react'

export const SplashBar = (): JSX.Element => {
  return (
    <Flex
      justify="center"
      direction="column"
      as="aside"
      flex={7}
      bg="primary"
      color="textalt"
      py="120px"
      px="80px"
    >
      <Image maxW="320px" src="/assets/illustration.svg"></Image>
      <Heading lineHeight="42px" mt={2} as="h1">
        Crie salas de Q&amp;A ao vivo{' '}
      </Heading>
      <Text fontSize="1.5em" mt={4}>
        Tire as dúvidas da sua audiência em tempo real
      </Text>
    </Flex>
  )
}
