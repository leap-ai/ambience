import React, { useEffect, useState } from 'react';
import { Heading, Text, Box, VStack } from '@chakra-ui/react';

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

const MainDisplay = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VStack color="white" fontSize="3rem" zIndex={1}>
      <Heading size="4xl">{currentTime}</Heading>
      <Text fontSize={'xl'}>Powered by Leap</Text>
    </VStack>
  );
};

export default MainDisplay;
