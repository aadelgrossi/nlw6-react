import { Box, Button } from '@chakra-ui/react'

import { useAuth } from '~/auth'

export const Unauthenticated = (): JSX.Element => {
  const { login } = useAuth()

  return (
    <Box as="span" fontSize="sm">
      Para enviar uma pergunta,{' '}
      <Button
        color="primary"
        textDecoration="underline"
        size="sm"
        variant="link"
        onClick={login}
      >
        faça seu login
      </Button>
    </Box>
  )
}
