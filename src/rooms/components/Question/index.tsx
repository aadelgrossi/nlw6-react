import { ReactNode, useMemo } from 'react'

import { Flex, Text } from '@chakra-ui/react'

import { Question as QuestionType } from '~/types'

import { AuthorInfo } from './AuthorInfo'

interface QuestionProps {
  data: QuestionType
  children: ReactNode
}

export const QuestionCard = ({
  data: { content, author, isAnswered, isHighlighted },
  children
}: QuestionProps): JSX.Element => {
  const background = useMemo(
    () =>
      isAnswered
        ? 'background.500'
        : isHighlighted
        ? 'lilac'
        : 'background.500',
    [isAnswered, isHighlighted]
  )

  return (
    <Flex
      w="full"
      bg={background}
      opacity={isAnswered ? 0.7 : 1}
      borderRadius="md"
      border={isHighlighted && !isAnswered ? '2px solid #835afd' : 'none'}
      boxShadow="md"
      direction="column"
      p={6}
    >
      <Text>{content}</Text>
      <Flex as="footer" justify="space-between" align="center" mt={6}>
        <AuthorInfo data={author} />
        {children}
      </Flex>
    </Flex>
  )
}
