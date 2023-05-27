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
      h={10}
      opacity={isLogoLoaded ? 0.8 : 0}
      transition="opacity 0.5s linear"
    >
      <Text fontSize={'xs'} display={isLogoLoaded ? 'flex' : 'none'}>
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
