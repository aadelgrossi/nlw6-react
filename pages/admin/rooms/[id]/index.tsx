import { Flex, Image, Heading, HStack, VStack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

import { database } from '~/auth'
import { RoomCode, Button } from '~/components'
import { useRoom } from '~/rooms'
import { Question as SingleQuestion, QuestionsBadge } from '~/rooms/components'
import { Room } from '~/types'

interface SingleRoomProps {
  room: Room
}

const AdminRoom = ({ room: { id, name } }: SingleRoomProps): JSX.Element => {
  const { questions } = useRoom(id)

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
          <HStack>
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
          </HStack>
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
