import {
  HStack,
  Heading,
  IconButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';

interface Props {
  setName: (name: string) => void;
}

const NameSelection: React.FC<Props> = ({ setName }) => {
  const [inputName, setInputName] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    localStorage.setItem('name', inputName);
    setName(inputName);
  };

  return (
    <VStack
      bg={'blackAlpha.400'}
      p={12}
      backdropFilter={'blur(14px)'}
      rounded={'xl'}
      gap={6}
    >
      <Heading size={'lg'}>{`What's your first name?`}</Heading>
      <form
        style={{
          display: 'flex',
          width: '100%',
        }}
        onSubmit={handleSubmit}
      >
        <HStack w={'full'} gap={4}>
          <Input
            type="text"
            size={'lg'}
            variant={'flushed'}
            textAlign={'center'}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </HStack>
        <IconButton
          icon={<FaAngleRight />}
          aria-label="Next"
          variant={'ghost'}
          rounded={'full'}
          ml={-10}
          type="submit"
        ></IconButton>
      </form>
      <Text opacity={0.8}>This will be used to personalize your greeting.</Text>
    </VStack>
  );
};

export default NameSelection;
