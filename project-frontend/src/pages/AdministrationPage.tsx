import { useEffect, useState } from 'react';
import { useAuth, User } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { authVerifyAdmin } from '../api/auth';
import { useModal } from '../context/ModalProvider';
import { AdminPanel } from '../components/AdminPanel/AdminPanel';

export const AdministrationPage = () => {
  // dont know what this does, hopely it actually does something
  const [flag, setFlag] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { openErrorModal } = useModal();

  // initial admin check
  useEffect(() => {
    if (!isAuthenticated || (user && !user.isAdmin) || flag) {
      navigate('/');
    }
  }, []);

  // Primary admin check - a better security check as it directly communicates with the backend
  useEffect(() => {
    const fetchData = async () => {
      const response = await authVerifyAdmin();

      if ('error' in response) {
        openErrorModal(response.error);
        return;
      }

      if (response.status === 200 && response.payload.success) {
        return;
      } else {
        setFlag(true);
        return;
      }
    };
    fetchData();
  }, []);

  return <AdminPanel />;
};
