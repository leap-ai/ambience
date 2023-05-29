import { HStack, IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { FaDownload, FaGithub } from 'react-icons/fa';
import ColorModeToggle from './ColorModeToggle';
import SettingsModal from './SettingsModal';

export default function TopRightButtons({
  setName,
}: {
  setName: (name: string) => void;
}) {
  return (
    <HStack position={'absolute'} top={'1rem'} right={'2rem'}>
      <Tooltip label="View source code">
        <IconButton
          icon={<FaGithub />}
          aria-label="Github Repo "
          size={'sm'}
          as={'a'}
          href={'https://github.com/leap-api/ambience'}
          target={'_blank'}
        />
      </Tooltip>
      <Tooltip label="Download this wallpaper">
        <IconButton
          icon={<FaDownload />}
          aria-label="Download Wallpapers"
          size={'sm'}
          as={'a'}
          href={'https://www.wallpapers.fyi/'}
          target={'_blank'}
        />
      </Tooltip>

      <SettingsModal setName={setName} />

      <ColorModeToggle />
    </HStack>
  );
}
