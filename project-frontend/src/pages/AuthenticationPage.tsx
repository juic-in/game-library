import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';

export const AuthenticationPage = () => {
  const params = new URLSearchParams(useLocation().search);
  const mode = params.get('mode') as string;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);


  return (
    <AuthenticationForm mode={mode} />
  );
};
