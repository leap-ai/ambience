import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import Newtab from './Newtab';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: mode('whiteAlpha.700', 'blackAlpha.700')(props),
          backdropFilter: 'blur(16px)',
        },
      }),
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
