import { ReactNode, useMemo } from 'react'

import { Badge } from '@chakra-ui/react'

interface BadgeProps {
  children: ReactNode
}

export const QuestionsBadge = ({ children }: BadgeProps): JSX.Element => {
  const numberOfQuestions = useMemo(
    () => Number(children?.toString()),
    [children]
  )

  return numberOfQuestions ? (
    <Badge
      px={4}
      py={2}
      textTransform="none"
      borderRadius="full"
      variant="solid"
      bg="secondary"
      color="white"
    >
      {children} pergunta{numberOfQuestions > 1 ? 's' : ''}
    </Badge>
  ) : (
    <></>
  )
}
