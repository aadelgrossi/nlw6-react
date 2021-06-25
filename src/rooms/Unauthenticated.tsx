import { Box, Button } from '@chakra-ui/react'

export const Unauthenticated = (): JSX.Element => {
  return (
    <Box as="span" fontSize="sm">
      Para enviar uma pergunta,{' '}
      <Button
        color="primary"
        textDecoration="underline"
        size="sm"
        variant="link"
        fontWeight="medium"
      >
        faça seu login
      </Button>
    </Box>
  )
}
