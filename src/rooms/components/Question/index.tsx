import { Flex, Text } from '@chakra-ui/react'

import { Question as QuestionType } from '~/types'

import { AuthorInfo } from './AuthorInfo'

interface QuestionProps {
  data: QuestionType
}

export const Question = ({
  data: { content, author }
}: QuestionProps): JSX.Element => {
  return (
    <Flex
      w="full"
      bg="reallywhite"
      borderRadius="md"
      boxShadow="md"
      direction="column"
      p={6}
    >
      <Text>{content}</Text>
      <Flex as="footer" justify="space-between" align="center" mt={6}>
        <AuthorInfo data={author} />
      </Flex>
    </Flex>
  )
}
