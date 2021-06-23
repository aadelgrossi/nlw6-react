import { Flex, Image, Heading, Text, Input, Icon } from '@chakra-ui/react'
import Head from 'next/head'
import { CgLogIn } from 'react-icons/cg'
import { ImGoogle } from 'react-icons/im'

import { Separator, Button } from '~/components'

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
            <Button bg="google" mt={12} leftIcon={<Icon as={ImGoogle} />}>
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
              <Button
                type="submit"
                bg="primary"
                mt="1rem"
                leftIcon={<Icon as={CgLogIn} />}
              >
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
