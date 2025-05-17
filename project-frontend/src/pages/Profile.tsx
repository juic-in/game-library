import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';

export const Profile = () => {
  const { user } = useAuth();
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
