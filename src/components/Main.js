import React, { useState, createContext, useContext } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { FiCalendar, FiHome, FiMenu, FiUsers, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import Dashboard from './Dashboard';
import Agenda from './Agenda';
import Catalogos from './Catalogos';

const LinkItems = [
  { name: 'Dashboard', icon: FiHome },
  { name: 'Agenda', icon: FiCalendar },
  { name: 'Catalogos', icon: FiUsers },
];

const NavContext = createContext();

export default function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [section, setSection] = useState('Dashboard');

  return (
    <NavContext.Provider value={{ section, setSection }}>
      <Box minH="100vh">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Content />
        </Box>
      </Box>
    </NavContext.Provider>
  );
}

const Content = () => {
  const { section } = useContext(NavContext);
  switch (section) {
    case 'Dashboard':
      return <Dashboard />;

    case 'Agenda':
      return <Agenda />;

    case 'Catalogos':
      return <Catalogos />;

    default:
      return <Box>Error</Box>;
  }
};

const SidebarContent = ({ onClose, ...rest }) => {
  const { signout } = useAuth();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Front Desk
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavButton key={link.name} icon={link.icon} sectionName={link.name}>
          {link.name}
        </NavButton>
      ))}
      <Button
        mt={8}
        w={'100%'}
        borderRadius={'none'}
        variant="outline"
        leftIcon={<FiLogOut />}
        onClick={signout}
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
};

const NavButton = ({ icon, children, sectionName, ...rest }) => {
  const { section, setSection } = useContext(NavContext);
  return (
    <Button
      w={'100%'}
      borderRadius={'none'}
      variant={section === sectionName ? 'solid' : 'outline'}
      leftIcon={<Icon as={icon} {...rest} />}
      onClick={() => setSection(sectionName)}
    >
      {children}
    </Button>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Front Desk
      </Text>
    </Flex>
  );
};
