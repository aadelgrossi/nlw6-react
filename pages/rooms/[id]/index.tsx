import { useCallback } from 'react'

import {
  Flex,
  Box,
  Image,
  Heading,
  Badge,
  HStack,
  VStack,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'

import { database, useAuth } from '~/auth'
import { RoomCode, Button } from '~/components'

interface SingleRoomProps {
  id: string
  name: string
}

type FormData = {
  content: string
}

const Room = ({ id }: SingleRoomProps): JSX.Element => {
  const { register, handleSubmit } = useForm<FormData>()
  const { authenticated, user } = useAuth()
  const toast = useToast()

  const onQuestionSubmit = useCallback(
    async (data: FormData) => {
      if (!authenticated) {
        toast({
          status: 'error',
          title: 'Operação não autorizada',
          description: 'Você precisa estar logado para fazer uma pergunta'
        })
        return
      }

      const question = {
        ...data,
        author: {
          name: user?.displayName || '',
          avatar: user?.photoURL || ''
        },
        isHighlighted: false,
        isAnswered: false
      }

      await database.ref(`rooms/${id}/questions`).push(question)
    },
    [authenticated, toast, user, id]
  )

  return (
    <Flex direction="column">
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
          <RoomCode>{id}</RoomCode>
        </Flex>
      </Flex>

      <VStack as="main" maxW="800px" m="0 auto" w="full" px={6}>
        <HStack
          id="room_title"
          mt={8}
          mb={6}
          align="center"
          spacing={4}
          w="full"
        >
          <Heading as="h1">Sala React</Heading>
          <Badge
            px={4}
            py={2}
            fontWeight="medium"
            textTransform="none"
            borderRadius="full"
            variant="solid"
            bg="secondary"
            color="white"
          >
            4 perguntas
          </Badge>
        </HStack>

        <Flex
          as="form"
          direction="column"
          w="full"
          onSubmit={handleSubmit(onQuestionSubmit)}
        >
          <Textarea
            border="none"
            p={4}
            boxShadow="md"
            borderRadius="lg"
            bg="reallywhite"
            resize="vertical"
            minH="130px"
            placeholder="O que você quer perguntar?"
            {...register('content', { required: true })}
          />
          <HStack
            mt={8}
            id="form_footer"
            justify="space-between"
            align="center"
          >
            <Box as="span" fontSize="sm">
              Para enviar uma pergunta,{' '}
              <Button
                color="primary"
                textDecoration="underline"
                size="sm"
                variant="link"
                fontWeight="medium"
              >
                faça seu login
              </Button>
            </Box>
            <Button
              type="submit"
              bg="primary"
              color="white"
              fontWeight="medium"
              disabled={!authenticated}
            >
              Enviar pergunta
            </Button>
          </HStack>
        </Flex>
      </VStack>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  return {
    props: { id }
  }
}

export default Room
