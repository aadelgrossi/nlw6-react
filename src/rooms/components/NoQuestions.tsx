import { Flex, Image, Heading, Text } from '@chakra-ui/react'

export const NoQuestions = (): JSX.Element => {
  return (
    <Flex mt={16} direction="column" align="center" justify="center">
      <Image src="/assets/empty-questions.svg" w="150px" />
      <Heading fontWeight="600" fontSize="xl" mt={4} as="h2">
        Nenhuma pergunta por aqui...
      </Heading>
      <Text
        lineHeight="1.5"
        textAlign="center"
        maxW={['100%', '100%', '35%']}
        fontSize="sm"
        color="gray.500"
        mt={2}
      >
        Faça o seu login e seja a primeira pessoa a fazer uma pergunta!
      </Text>
    </Flex>
  )
}
