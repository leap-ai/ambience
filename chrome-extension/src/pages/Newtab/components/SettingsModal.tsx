import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Text,
  Stack,
  Heading,
  Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
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
      <IconButton
        size={'xs'}
        icon={<FaCog />}
        aria-label="Settings"
        onClick={onOpen}
      ></IconButton>
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
