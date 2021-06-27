import { useCallback } from 'react'

import { Flex, Heading, HStack, VStack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { database } from '~/auth'
import { Header } from '~/components'
import { Highlight, MarkAnswered } from '~/question/controls'
import { useRoom } from '~/rooms'
import {
  CloseRoomDialog,
  QuestionCard,
  QuestionsBadge,
  RemoveDialog,
  RoomCode
} from '~/rooms/components'
import { Room } from '~/types'

interface SingleRoomProps {
  room: Room
}

const AdminRoom = ({ room: { id, name } }: SingleRoomProps): JSX.Element => {
  const { questions } = useRoom(id)
  const router = useRouter()

  const handleDeleteQuestion = async (questionId: string) => {
    await database.ref(`rooms/${id}/questions/${questionId}`).remove()
  }

  const handleCloseRoom = async () => {
    await database.ref(`rooms/${id}`).update({
      closedAt: new Date()
    })

    router.push('/')
  }

  const handleMarkAnswered = useCallback(
    async (questionId: string) => {
      await database.ref(`rooms/${id}/questions/${questionId}`).update({
        isAnswered: true
      })
    },
    [id]
  )

  const handleMarkHighlighted = useCallback(
    async (questionId: string) => {
      await database.ref(`rooms/${id}/questions/${questionId}`).update({
        isHighlighted: true
      })
    },
    [id]
  )

  return (
    <Flex direction="column">
      <Header>
        <RoomCode>{id}</RoomCode>
        <CloseRoomDialog confirm={handleCloseRoom} />
      </Header>

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

        <VStack mt={10} spacing={4}>
          {questions.map(question => {
            const { id, isAnswered, isHighlighted } = question
            return (
              <QuestionCard key={id} data={question}>
                <HStack spacing={0}>
                  {!isAnswered && (
                    <>
                      <MarkAnswered
                        answered={isAnswered}
                        onClick={() => handleMarkAnswered(id)}
                      />

                      <Highlight
                        highlighted={isHighlighted}
                        onClick={() => handleMarkHighlighted(id)}
                      />
                    </>
                  )}
                  <RemoveDialog confirm={() => handleDeleteQuestion(id)} />
                </HStack>
              </QuestionCard>
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

export default AdminRoom
