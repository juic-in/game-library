import { useEffect } from 'react';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>HomePage</div>;
};
