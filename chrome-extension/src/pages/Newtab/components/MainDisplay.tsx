import {
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ImageObject } from '../Newtab';
import AboutModal from './AboutModal';
import PoweredByLeap from './PoweredByLeap';
import Quote from './Quote';
import SettingsModal from './SettingsModal';

const getCurrentTime = () => {
  const dateObj = new Date();
  const hours = dateObj.getHours();
  const hours12 = hours % 12 || 12;
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours12 < 10 ? ` ${hours12}` : hours12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const getGreeting = (name: string) => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return `Good Morning, ${name}.`;
  } else if (currentHour >= 12 && currentHour < 18) {
    return `Good Afternoon, ${name}.`;
  } else if (currentHour >= 18 && currentHour < 22) {
    return `Good Evening, ${name}.`;
  } else {
    return `Good Night, ${name}.`;
  }
};

const MainDisplay = ({
  name,
  setName,
  image,
}: {
  name: string;
  setName: (name: string) => void;
  image: ImageObject | null;
}) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [greeting, setGreeting] = useState(getGreeting(name));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
      setGreeting(getGreeting(name));
    }, 1000);
    return () => clearInterval(interval);
  }, [name]);

  return (
    <VStack zIndex={1} h={'100vh'} p={8}>
      <HStack position={'absolute'} top={4}>
        {/* <MoodSelector /> */}
        {/* <ColorModeToggle /> */}
      </HStack>
      <Spacer />
      <VStack userSelect={'none'} textAlign={'center'}>
        <Heading
          fontSize={'7rem'}
          textShadow={'0px 4px 10px rgba(0, 0, 0, 0.3)'}
          lineHeight={1}
        >
          {currentTime}
        </Heading>
        <Heading textShadow={'0px 2px 10px rgba(0, 0, 0, 0.3)'}>
          {greeting}
        </Heading>
      </VStack>
      <Spacer />
      <SimpleGrid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: '2fr 3fr 2fr',
        }}
        gap={2}
        p={8}
        position={'absolute'}
        bottom={0}
        w={'full'}
      >
        <Flex
          justifyContent={{
            base: 'center',
            md: 'start',
          }}
          alignItems={{
            base: 'center',
            md: 'end',
          }}
          display={{
            base: 'none',
            md: 'flex',
          }}
        >
          <HStack>
            <SettingsModal setName={setName} />
            {image && <AboutModal image={image} />}
          </HStack>
        </Flex>
        <Flex textAlign={'center'}>
          <Quote />
        </Flex>
        <Flex
          justifyContent={{
            base: 'center',
            md: 'end',
          }}
          alignItems={{
            base: 'center',
            md: 'end',
          }}
        >
          <PoweredByLeap />
        </Flex>
      </SimpleGrid>
      <VStack
        position={'absolute'}
        bottom={4}
        px={8}
        textAlign={'center'}
      ></VStack>
    </VStack>
  );
};

export default MainDisplay;
