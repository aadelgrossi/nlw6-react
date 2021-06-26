import { HStack, Avatar, Text } from '@chakra-ui/react'

import { Author } from '~/types'

interface AuthorInfoProps {
  data: Author
}

export const AuthorInfo = ({
  data: { name, avatar }
}: AuthorInfoProps): JSX.Element => {
  return (
    <HStack>
      <Avatar size="sm" name={name} src={avatar} />
      <Text fontSize="sm" as="span" color="gray.500">
        {name}
      </Text>
    </HStack>
  )
}
