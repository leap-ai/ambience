import { HStack, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MoodSelector from './MoodSelector';
import PoweredByLeap from './PoweredByLeap';
import Quote from './Quote';

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

const MainDisplay = ({ name }: { name: string }) => {
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
    <VStack zIndex={1} h={'100vh'} p={4}>
      <HStack position={'absolute'} top={4}>
        <MoodSelector />
        {/* <ColorModeToggle /> */}
      </HStack>
      <Spacer />
      <VStack>
        <Heading fontSize={'7rem'} shadow={'md'}>
          {currentTime}
        </Heading>
        <Heading shadow={'md'}>{greeting}</Heading>
      </VStack>
      <Spacer />
      <VStack position={'absolute'} bottom={4}>
        <Quote />
        <PoweredByLeap />
      </VStack>
    </VStack>
  );
};

export default MainDisplay;
