import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import { Profile } from './pages/Profile';

function App() {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(true);

  const toggleSidebar = () => setSideBarCollapsed(!sideBarCollapsed);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Navbar toggleSidebar={toggleSidebar} />
      <Flex height="100%">
        <Sidebar isCollapsed={sideBarCollapsed} />
        <Box flex="1" p={4} bg="gray.50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
