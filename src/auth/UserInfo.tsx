import { HStack, Avatar, Text, Button } from '@chakra-ui/react'

import { useAuth } from './useAuth'

export const UserInfo = (): JSX.Element => {
  const { user, logout } = useAuth()

  return (
    <HStack as="span" fontSize="sm">
      <Avatar size="md" src={user?.photoURL || ''} />
      <Text fontWeight="medium" fontSize="md">
        {user?.displayName}
      </Text>

      <Button size="sm" colorScheme="red" onClick={logout}>
        Sair
      </Button>
    </HStack>
  )
}
