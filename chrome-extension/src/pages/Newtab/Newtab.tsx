import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MainDisplay from './components/MainDisplay';
import NameSelection from './components/NameSelection';
import TopRightButtons from './components/TopRightButtons';

const fetchImage = async () => {
  try {
    const response = await fetch('https://api.ambience.page/api/get-image');
    const body = await response.json();

    if (!body.imageUrl) {
      throw new Error('Invalid image url');
    }

    return body;
  } catch (err) {
    console.error(err);
    return '';
  }
};

export type ImageObject = {
  id: number;
  imageUrl: string;
  prompt: string;
  seed: string;
};

const Newtab = () => {
  const [image, setImage] = useState<ImageObject | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [name, setName] = useState('');

  console.log(image);

  useEffect(() => {
    fetchImage().then(setImage);
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
        src={image?.imageUrl}
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
      <TopRightButtons />
      <VStack zIndex={1}>
        {!name ? (
          <NameSelection setName={setName} />
        ) : (
          <MainDisplay name={name} setName={setName} image={image} />
        )}
      </VStack>
    </VStack>
  );
};

export default Newtab;
