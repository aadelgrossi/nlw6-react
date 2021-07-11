import {
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  ModalFooter,
  ModalBody,
  Flex,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Icon,
  Text,
  Button
} from '@chakra-ui/react'
import { FiTrash } from 'react-icons/fi'

interface DialogProps {
  confirm: () => Promise<void>
}

export const RemoveDialog = ({ confirm }: DialogProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        variant="ghost"
        _hover={{ background: 'none' }}
        aria-label="remove"
        onClick={onOpen}
        icon={<Icon color="gray.500" as={FiTrash} />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="590px" h="362px">
          <ModalCloseButton />
          <ModalBody my={12}>
            <Flex align="center" justify="center" direction="column">
              <Icon as={FiTrash} color="danger" w={12} h={12} />
              <Heading as="h2" fontSize="3xl" mt={8}>
                Excluir pergunta
              </Heading>

              <Text color="gray.500" mt={3}>
                Tem certeza que você deseja excluir esta pergunta?
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center" mb={6}>
            <Button fontSize="sm" bg="gray.300" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              fontSize="sm"
              bg="danger"
              color="background.400"
              onClick={confirm}
            >
              Sim, excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
