import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);
  console.log(
    user?.username,
    user?.isAdmin,
    user?.profilePicture,
    user?.userId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div></div>;
};
