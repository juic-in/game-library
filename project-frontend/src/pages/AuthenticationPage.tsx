import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';
import { useAuth } from '../context/AuthProvider';

export const AuthenticationPage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const params = new URLSearchParams(useLocation().search);
  const mode = params.get('mode') as string;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return <AuthenticationForm mode={mode} />;
};
