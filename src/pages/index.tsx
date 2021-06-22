import { Flex, Image, Heading, Text, Button, Input } from '@chakra-ui/react'
import Head from 'next/head'

import { Separator } from '~/components'

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Let Me Ask</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex h="100vh" align="stretch">
        <Flex
          justify="center"
          direction="column"
          as="aside"
          flex={7}
          bg="primary"
          color="white"
          py="120px"
          px="80px"
        >
          <Image maxW="320px" src="/assets/illustration.svg"></Image>
          <Heading lineHeight="42px" mt={2} as="h1">
            Crie salas de Q&amp;A ao vivo{' '}
          </Heading>
          <Text fontSize="1.5em">
            Tire as dúvidas da sua audiência em tempo real
          </Text>
        </Flex>
        <Flex as="main" flex={8} px="32px" align="center" justify="center">
          <Flex
            direction="column"
            w="full"
            maxW="400px"
            align="stretch"
            textAlign="center"
          >
            <Image alignSelf="center" src="/assets/logo.svg"></Image>
            <Button
              fontWeight="medium"
              transition="filter 0.2s"
              _hover={{ filter: 'brightness(0.9)' }}
              color="white"
              bg="google"
              mt={12}
              h="50px"
              borderRadius="lg"
            >
              <Image mr={2} src="/assets/google-icon.svg" />
              Crie sua sala com o Google
            </Button>
            <Separator>ou entre em uma sala</Separator>
            <Flex as="form" direction="column">
              <Input
                w="full"
                h="50px"
                borderRadius="lg"
                px="16px"
                bg="white"
                border="1px"
                borderColor="lightgray"
                placeholder="Digite o código da sala"
              />
              <Button w="full" mt="1rem" type="submit">
                Entrar na sala
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default IndexPage
