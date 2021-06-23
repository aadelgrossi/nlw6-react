import { Flex, Image, Heading, Text, Input, Icon } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { BiPlus } from 'react-icons/bi'

import { Button } from '~/components'

const NewRoom = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Nova sala | Let Me Ask</title>
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
            <Heading as="h2" fontSize="3xl" mt="8" mb="4">
              Criar uma nova sala
            </Heading>

            <Flex as="form" direction="column">
              <Input
                w="full"
                h="50px"
                borderRadius="lg"
                px="16px"
                bg="white"
                border="1px"
                borderColor="gray.400"
                placeholder="Nome da sala"
              />
              <Button
                type="submit"
                bg="primary"
                mt="1rem"
                leftIcon={<Icon as={BiPlus} />}
              >
                Criar sala
              </Button>
            </Flex>
            <Text fontSize="sm" color="gray.500" mt="6">
              Quer entrar em uma sala existente?{' '}
              <Link href="/">
                <Text
                  as="span"
                  cursor="pointer"
                  color="secondary"
                  textDecoration="underline"
                >
                  clique aqui.
                </Text>
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default NewRoom
