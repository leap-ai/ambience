import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const fetchQuote = async () => {
  try {
    const response = await fetch(
      'https://ambience-kappa.vercel.app/api/get-quote'
    );
    const body = await response.json();

    if (!body.quote) {
      throw new Error('Invalid quote');
    }

    return body.quote;
  } catch (err) {
    console.error(err);
    return '';
  }
};

export default function Quote() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetchQuote().then(setQuote).catch(console.error);
  }, []);

  return (
    <Text
      fontSize={'lg'}
      opacity={quote ? 1 : 0}
      transition="opacity 0.7s linear"
      textShadow={'0px 2px 6px rgba(0, 0, 0, 0.2)'}
    >
      {quote && `"${quote}"`}
    </Text>
  );
}
