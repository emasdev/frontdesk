import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import Doctores from './Doctores';
import Usuarios from './Usuarios';

export default function Catalogos() {
  return (
    <Tabs>
      <TabList mb="1em">
        <Tab>Doctores</Tab>
        <Tab>Usuarios IDM Cloud</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Doctores />
        </TabPanel>
        <TabPanel>
          <Usuarios />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
