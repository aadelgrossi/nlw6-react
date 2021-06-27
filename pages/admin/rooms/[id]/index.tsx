import { Flex, Heading, HStack, VStack, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

import { database } from '~/auth'
import { Button, Header } from '~/components'
import { useRoom } from '~/rooms'
import {
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

  const handleDeleteQuestion = async (questionId: string) => {
    await database.ref(`rooms/${id}/questions/${questionId}`).remove()
  }

  return (
    <Flex direction="column">
      <Header>
        <RoomCode>{id}</RoomCode>
        <Button
          h="40px"
          borderColor="primary"
          color="primary"
          borderRadius="md"
          variant="outline"
        >
          Encerrar sala
        </Button>
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
            const { id, likeCount } = question
            return (
              <SingleQuestion key={id} data={question}>
                <HStack>
                  {likeCount > 0 && <Text as="span">{likeCount}</Text>}
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
