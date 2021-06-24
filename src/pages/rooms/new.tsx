import { useCallback } from 'react'

import {
  Flex,
  Image,
  Heading,
  Text,
  Input,
  Icon,
  Avatar
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { BiPlus } from 'react-icons/bi'

import { useAuth } from '~/auth/useAuth'
import { Button, SplashBar } from '~/components'

interface NewRoomFormData {
  name: string
}

const NewRoom = (): JSX.Element => {
  const { authenticated, user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewRoomFormData>()

  const onSubmit = useCallback((data: NewRoomFormData) => {
    console.log({ data })
  }, [])

  return (
    <>
      <Head>
        <title>Nova sala | Let Me Ask</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        minH="100vh"
        align="stretch"
        direction={['column', 'column', 'row']}
      >
        <SplashBar />
        <Flex
          as="main"
          flex={8}
          px={12}
          py={20}
          align="center"
          justify="center"
        >
          <Flex
            direction="column"
            w="full"
            maxW="400px"
            align="stretch"
            textAlign="center"
          >
            <Image alignSelf="center" src="/assets/logo.svg" />

            {authenticated && (
              <Flex align="center" justify="center" mt={4} mb={1}>
                <Text mr={2}>
                  Logado como <Text as="strong">{user?.displayName}</Text>
                </Text>
                <Avatar src={user?.photoURL ?? ''} />
              </Flex>
            )}
            <Heading as="h2" fontSize="3xl" mt="8" mb="4">
              Criar uma nova sala
            </Heading>

            <Flex
              as="form"
              direction="column"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                w="full"
                h="50px"
                borderRadius="lg"
                px="16px"
                bg="white"
                border="1px"
                borderColor="gray.400"
                placeholder="Nome da sala"
                {...register('name')}
              />
              <Button
                type="submit"
                bg="primary"
                mt="1rem"
                disabled={!authenticated || isSubmitting}
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
