import { useCallback, useState, useEffect } from 'react'

import {
  Flex,
  Image,
  Heading,
  HStack,
  VStack,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'

import { database, useAuth, UserInfo } from '~/auth'
import { RoomCode, Button } from '~/components'
import {
  Question as SingleQuestion,
  QuestionsBadge,
  Unauthenticated
} from '~/rooms/components'
import { Question, Room } from '~/types'

interface SingleRoomProps {
  room: Room
}

type FormData = {
  content: string
}

const parseQuestions = (data: Record<string, Question>) =>
  Object.entries(data).map(item => {
    const [key, value] = item as [string, Question]

    return {
      id: key,
      ...value
    }
  })

const SingleRoom = ({
  room: { id, name, initialQuestions }
}: SingleRoomProps): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<FormData>()
  const { authenticated, user } = useAuth()
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const toast = useToast()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions = databaseRoom.questions ?? {}

      const newQuestions = parseQuestions(firebaseQuestions)

      setQuestions(newQuestions)
    })
  }, [id])

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

      reset()
    },
    [authenticated, toast, user, id, reset]
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

      <Flex
        as="main"
        maxW="800px"
        m="0 auto"
        w="full"
        px={6}
        direction="column"
      >
        <HStack
          id="room_title"
          mt={8}
          mb={6}
          align="center"
          spacing={4}
          w="full"
        >
          <Heading as="h1">{name}</Heading>
          <QuestionsBadge>{questions.length}</QuestionsBadge>
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
            {authenticated ? <UserInfo /> : <Unauthenticated />}
            <Button
              type="submit"
              bg="primary"
              color="white"
              disabled={!authenticated}
            >
              Enviar pergunta
            </Button>
          </HStack>
        </Flex>

        <VStack mt={10} spacing={4}>
          {questions.map(question => (
            <SingleQuestion key={question.id} data={question} />
          ))}
        </VStack>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  const roomRef = database.ref(`rooms/${id}`)

  const roomInfo = await roomRef.once('value')

  if (!roomInfo.exists()) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const room = roomInfo.val()
  const firebaseQuestions = room.questions ?? {}

  const questions = parseQuestions(firebaseQuestions)

  return {
    props: {
      room: {
        id: roomInfo.key,
        name: room.name,
        authorId: room.authorId,
        initialQuestions: questions
      }
    }
  }
}

export default SingleRoom
