import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { DiscoverPage } from './pages/DiscoverPage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { HomePage } from './pages/HomePage';
import { Settings } from './pages/Settings';
import { AuthenticationPage } from './pages/AuthenticationPage';
import { ErrorModal } from './components/ErrorModal';

function App() {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(true);

  const toggleSidebar = () => setSideBarCollapsed(!sideBarCollapsed);

  return (
    <>
      <ErrorModal />
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isCollapsed={sideBarCollapsed} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </>
  );
}
export default App;
