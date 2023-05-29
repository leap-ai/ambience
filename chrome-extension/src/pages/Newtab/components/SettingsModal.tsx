import {
  Button,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaCog } from 'react-icons/fa';

function SettingsModal({ setName }: { setName: (name: string) => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNameChange = () => {
    localStorage.removeItem('name');
    setName('');
    onClose();
  };

  return (
    <>
      <Tooltip label="Settings">
        <IconButton
          size={'sm'}
          icon={<FaCog />}
          aria-label="Settings"
          onClick={onOpen}
        ></IconButton>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Heading size={'sm'}>Change name</Heading>
              <Text>Looking to change the name in the greeting?</Text>
              <Button onClick={handleNameChange}>Change Name</Button>
            </Stack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SettingsModal;
