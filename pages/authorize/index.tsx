import { useRouter } from 'next/router';
import { useEffect } from 'react';


const AutorizePage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('carbeeToken');
    const redirect = router.query.redirect;
    const execute = async () => {
      if (token && token !== 'undefined') {
        const result = await fetch('/api/saveToken', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          body: JSON.stringify({ token }),
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        });
        const { success } = await result.json();
        if (success) {
          router.push(redirect ? redirect.toString() : '/dashboard');
        } else {
          router.push('/login');
        }
      }
      else {
        router.push('/login');
      }
    };
    execute();
  }, []);
  return (
    <>
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </>
  );
};

export default AutorizePage;
