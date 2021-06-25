import { HStack, Avatar, Text } from '@chakra-ui/react'

import { useAuth } from './useAuth'

export const UserInfo = (): JSX.Element => {
  const { user } = useAuth()

  return (
    <HStack as="span" fontSize="sm">
      <Avatar size="md" src={user?.photoURL || ''} />
      <Text fontWeight="medium" fontSize="md">
        {user?.displayName}
      </Text>
    </HStack>
  )
}
