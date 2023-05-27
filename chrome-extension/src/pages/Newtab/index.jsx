import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';

import Newtab from './Newtab';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'blackAlpha.700',
          backdropFilter: 'blur(16px)',
        },
      },
    },
  },
});

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <Newtab />
    </ChakraProvider>
  </>
);
