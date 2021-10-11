import { useCallback, useState } from 'react';

export default () => {
  console.log('appstore init');
  const [user, setUser] = useState({
    account: 'fylder',
    password: '',
  });
  const setUserData = useCallback((account, passowrd) => {
    setUser({ account: account, password: passowrd });
  }, []);

  return { user, setUserData };
};
