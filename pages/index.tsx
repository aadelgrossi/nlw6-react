import { useCallback } from 'react'

import { Flex, Image, Input, Icon, useToast } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CgLogIn } from 'react-icons/cg'
import { ImGoogle } from 'react-icons/im'

import { database, useAuth } from '~/auth'
import { Separator, Button, SplashBar } from '~/components'

type JoinRoomFormData = { id: string }

const IndexPage = (): JSX.Element => {
  const { login, user } = useAuth()
  const router = useRouter()
  const { register, handleSubmit } = useForm<JoinRoomFormData>()
  const toast = useToast()

  const handleCreateRoom = useCallback(async () => {
    if (!user) {
      await login()
    }

    router.push('/rooms/new')
  }, [login, router, user])

  const onSubmit = useCallback(
    async ({ id }: JoinRoomFormData) => {
      const room = await database.ref(`rooms/${id}`).get()

      if (room.exists()) {
        router.push(`/rooms/${id}`)
        toast({
          title: 'Seja bem-vindo',
          status: 'success',
          position: 'top-right'
        })
      } else {
        toast({
          title: 'Sala não encontrada',
          description: 'Favor verifique o código da sala',
          status: 'error',
          position: 'top-right'
        })
      }
    },
    [toast, router]
  )

  return (
    <>
      <Head>
        <title>Let Me Ask</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex h="100vh" align="stretch" direction={['column', 'column', 'row']}>
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
            <Image alignSelf="center" src="/assets/logo.svg"></Image>
            <Button
              bg="google"
              mt={12}
              onClick={handleCreateRoom}
              leftIcon={<Icon as={ImGoogle} />}
            >
              Crie sua sala com o Google
            </Button>
            <Separator>ou entre em uma sala</Separator>
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
                {...register('id')}
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
