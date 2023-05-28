import { HStack, IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import ColorModeToggle from './ColorModeToggle';

export default function TopRightButtons() {
  return (
    <HStack position={'absolute'} top={'1rem'} right={'2rem'}>
      <IconButton
        icon={<FaGithub />}
        aria-label="Github Repo "
        size={'sm'}
        as={'a'}
        href={'https://github.com/leap-api/ambience'}
        target={'_blank'}
      />
      <ColorModeToggle />
    </HStack>
  );
}
