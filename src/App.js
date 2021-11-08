import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ProvideAuth } from './hooks/useAuth';
import Main from './views/Main';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <Main />
      </ProvideAuth>
    </ChakraProvider>
  );
}

export default App;
