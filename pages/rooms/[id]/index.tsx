import { useCallback } from 'react'

import {
  Flex,
  Image,
  Heading,
  HStack,
  VStack,
  Textarea,
  useToast,
  Text,
  IconButton,
  Icon
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'

import { database, useAuth, UserInfo } from '~/auth'
import { Button } from '~/components'
import { useRoom } from '~/rooms'
import {
  Question as SingleQuestion,
  QuestionsBadge,
  Unauthenticated,
  RoomCode
} from '~/rooms/components'
import { Room } from '~/types'

interface SingleRoomProps {
  room: Room
}

type FormData = {
  content: string
}

const SingleRoom = ({ room: { id, name } }: SingleRoomProps): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<FormData>()
  const { authenticated, user } = useAuth()
  const { questions } = useRoom(id)
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

      reset()
    },
    [authenticated, toast, user, id, reset]
  )

  const handleLikeClick = useCallback(
    async (questionId: string) => {
      await database.ref(`rooms/${id}/questions/${questionId}/likes`).push({
        authorId: user?.uid
      })
    },
    [id, user?.uid]
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
          {questions.map(question => {
            const { id, hasLiked, likeCount } = question
            return (
              <SingleQuestion key={id} data={question}>
                <HStack>
                  {likeCount > 0 && <Text as="span">{likeCount}</Text>}
                  <IconButton
                    variant="ghost"
                    _hover={{ background: 'none' }}
                    aria-label="like"
                    onClick={() => handleLikeClick(id)}
                    icon={
                      <Icon
                        w={5}
                        h={5}
                        color={hasLiked ? 'primary' : 'gray.500'}
                        as={hasLiked ? AiFillLike : AiOutlineLike}
                      />
                    }
                  />
                </HStack>
              </SingleQuestion>
            )
          })}
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

  return {
    props: {
      room: {
        id: roomInfo.key,
        name: room.name,
        authorId: room.authorId
      }
    }
  }
}

export default SingleRoom
