import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Login from './Login';
import Header from '../components/Header';
import Lista from '../components/Lista';
import Agenda from '../components/Agenda';
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

export default function Dashboard() {
  const auth = useAuth();

  return (
    <div>
      {auth.user ? (
        <Container>
          <Header />
          <Tabs isLazy>
            <TabList mb="1em">
              <Tab>Lista</Tab>
              <Tab>Agenda</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Lista />
              </TabPanel>
              <TabPanel>
                <Agenda />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      ) : (
        <Login />
      )}
    </div>
  );
}
