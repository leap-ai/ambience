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
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuote().then(setQuote).catch(console.error);
  }, []);

  if (!quote) return <></>;

  return <Text fontSize={'lg'}>"{quote}"</Text>;
}
