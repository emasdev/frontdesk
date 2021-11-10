import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

export default function Catalogos() {
  return (
    <Tabs isLazy>
      <TabList mb="1em">
        <Tab>Doctores</Tab>
        <Tab>Pacientes</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Doctores</p>
        </TabPanel>
        <TabPanel>
          <p>Pacientes </p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
