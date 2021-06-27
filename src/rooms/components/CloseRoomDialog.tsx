import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  ModalFooter,
  ModalBody,
  Flex,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Text
} from '@chakra-ui/react'
import { RiCloseCircleLine } from 'react-icons/ri'

interface DialogProps {
  confirm: () => Promise<void>
}

export const CloseRoomDialog = ({ confirm }: DialogProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        h="40px"
        borderColor="primary"
        color="primary"
        borderRadius="md"
        variant="outline"
        onClick={onOpen}
      >
        Encerrar sala
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="590px" h="362px">
          <ModalCloseButton />
          <ModalBody my={12}>
            <Flex align="center" justify="center" direction="column">
              <Icon as={RiCloseCircleLine} color="danger" w={12} h={12} />
              <Heading as="h2" fontSize="3xl" mt={8}>
                Encerrar sala
              </Heading>

              <Text color="gray.500" mt={3}>
                Tem certeza que você deseja encerrar esta sala?
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center" mb={6}>
            <Button fontSize="sm" bg="gray.300" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button fontSize="sm" bg="danger" color="white" onClick={confirm}>
              Sim, encerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
