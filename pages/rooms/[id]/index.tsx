import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

interface SingleRoomProps {
  name: string
  id: string
}

const Room = ({ id }: SingleRoomProps): JSX.Element => {
  return (
    <Flex>
      <h1>{id}</h1>
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
