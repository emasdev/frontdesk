import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ProvideAuth } from './hooks/useAuth';
import Main from './views/Main';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const theme = extendTheme({
  components: {
    Steps,
  },
});
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
