import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import Doctores from './Doctores';
import Usuarios from './Usuarios';
import CatalogoEstudios from './CatalogoEstudios';

export default function Catalogos() {
  return (
    <Tabs>
      <TabList mb="1em">
        <Tab>Doctores</Tab>
        <Tab>Estudios</Tab>
        {/* <Tab>Listas de precios</Tab> */}
        {/* <Tab>Usuarios IDM Cloud</Tab> */}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Doctores />
        </TabPanel>
        <TabPanel>
          <CatalogoEstudios />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
