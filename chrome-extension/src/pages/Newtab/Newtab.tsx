import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MainDisplay from './components/MainDisplay';
import NameSelection from './components/NameSelection';

const fetchImage = async () => {
  try {
    const response = await fetch(
      'https://ambience-kappa.vercel.app/api/get-image'
    );
    const body = await response.json();

    if (!body.imageUrl) {
      throw new Error('Invalid image url');
    }

    return body.imageUrl;
  } catch (err) {
    console.error(err);
    return '';
  }
};

const Newtab = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchImage().then(setImageUrl);
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <VStack
      bg="black"
      className="App"
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      <img
        src={imageUrl}
        alt="Background"
        onLoad={handleImageLoaded}
        style={{
          position: 'absolute',
          zIndex: 0,
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in',
          pointerEvents: 'none',
        }}
      />
      <VStack zIndex={1}>
        {!name ? (
          <NameSelection setName={setName} />
        ) : (
          <MainDisplay name={name} />
        )}
      </VStack>
    </VStack>
  );
};

export default Newtab;
