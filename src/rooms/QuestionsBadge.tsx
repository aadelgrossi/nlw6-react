import { ReactNode } from 'react'

import { Badge } from '@chakra-ui/react'

interface BadgeProps {
  children: ReactNode
}

export const QuestionsBadge = ({ children }: BadgeProps): JSX.Element => {
  return (
    <Badge
      px={4}
      py={2}
      fontWeight="medium"
      textTransform="none"
      borderRadius="full"
      variant="solid"
      bg="secondary"
      color="white"
    >
      {children} perguntas
    </Badge>
  )
}
