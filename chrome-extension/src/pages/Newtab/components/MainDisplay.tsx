import {
  HStack,
  Heading,
  IconButton,
  Image,
  Spacer,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import MoodSelector from './MoodSelector';

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning, Claudio.';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good Afternoon, Claudio.';
  } else if (currentHour >= 18 && currentHour < 22) {
    return 'Good Evening, Claudio.';
  } else {
    return 'Good Night, Claudio.';
  }
};

const MainDisplay = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [greeting, setGreeting] = useState(getGreeting());
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
      setGreeting(getGreeting());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VStack zIndex={1} h={'100vh'} p={4}>
      <HStack position={'absolute'} top={4}>
        <MoodSelector />
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </HStack>
      <Spacer />
      <VStack>
        <Heading size="4xl">{currentTime}</Heading>
        <Heading>{greeting}</Heading>
      </VStack>
      <Spacer />
      <VStack position={'absolute'} bottom={4}>
        <Text fontSize={'lg'}>
          "Every morning is an opportunity for success"
        </Text>
        <HStack>
          <Text fontSize={'xs'}>Powered by</Text>
          <Image src="/leap-logo-white.svg" h={4} />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default MainDisplay;
