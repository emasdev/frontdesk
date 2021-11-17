import React, { useState } from 'react';
import { Box, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';

export default function AgendaMenu() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleSliderChange = event => {
    setTabIndex(parseInt(event.target.value, 10));
  };

  const handleTabsChange = index => {
    setTabIndex(index);
  };

  return (
    <Box>
      <input
        type="range"
        min="0"
        max="3"
        value={tabIndex}
        onChange={handleSliderChange}
      />

      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Paciente</Tab>
          <Tab>Doctor</Tab>
          <Tab>Estudios</Tab>
          <Tab>Horario</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Paciente</p>
          </TabPanel>
          <TabPanel>
            <p>Doctor</p>
          </TabPanel>
          <TabPanel>
            <p>Estudios</p>
          </TabPanel>
          <TabPanel>
            <p>Horario</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
