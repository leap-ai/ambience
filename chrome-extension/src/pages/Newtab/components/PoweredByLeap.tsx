import { HStack, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

// @ts-ignore
import logo from '../../../assets/img/leap-logo-white.svg';

export default function PoweredByLeap() {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  const handleLogoLoad = () => {
    setIsLogoLoaded(true);
  };

  return (
    <HStack
      gap={0}
      opacity={isLogoLoaded ? 0.4 : 0}
      transition="opacity 0.3s linear"
      as={'a'}
      target="_blank"
      href="https://tryleap.ai?utm_source=ambience&utm_medium=extension&utm_campaign=ambience-extension&ref=ambience-extension"
      _hover={{ opacity: 1 }}
    >
      <Text
        fontSize={'xs'}
        display={isLogoLoaded ? 'flex' : 'none'}
        userSelect={'none'}
      >
        powered by
      </Text>
      <Image
        src={logo}
        h={3}
        onLoad={handleLogoLoad}
        display={isLogoLoaded ? 'flex' : 'none'}
      />
    </HStack>
  );
}
