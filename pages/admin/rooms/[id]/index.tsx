import { useCallback } from 'react'

import {
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
  IconButton,
  Icon
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FaRegCommentAlt, FaCommentAlt } from 'react-icons/fa'
import { HiOutlineCheckCircle, HiCheckCircle } from 'react-icons/hi'

import { database } from '~/auth'
import { Header } from '~/components'
import { useRoom } from '~/rooms'
import {
  CloseRoomDialog,
  Question as SingleQuestion,
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
            const { id, likeCount, isAnswered, isHighlighted } = question
            return (
              <SingleQuestion key={id} data={question}>
                <HStack spacing={0}>
                  {likeCount > 0 && (
                    <Text color="gray.500" as="span">
                      {likeCount} like(s)
                    </Text>
                  )}
                  {!isAnswered && (
                    <>
                      <IconButton
                        variant="ghost"
                        _hover={{ background: 'none' }}
                        aria-label="mark-answered"
                        onClick={() => handleMarkAnswered(id)}
                        icon={
                          <Icon
                            w={5}
                            h={5}
                            color={isAnswered ? 'primary' : 'gray.500'}
                            as={
                              isAnswered ? HiCheckCircle : HiOutlineCheckCircle
                            }
                          />
                        }
                      />
                      <IconButton
                        variant="ghost"
                        _hover={{ background: 'none' }}
                        aria-label="highlight"
                        onClick={() => handleMarkHighlighted(id)}
                        icon={
                          <Icon
                            w={4}
                            h={4}
                            color={isHighlighted ? 'primary' : 'gray.500'}
                            as={isHighlighted ? FaCommentAlt : FaRegCommentAlt}
                          />
                        }
                      />
                    </>
                  )}
                  <RemoveDialog confirm={() => handleDeleteQuestion(id)} />
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

export default AdminRoom
