import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: any) {
  const req = context.req;
  const res = context.res;
  const token = getCookie('token', { req, res });
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  } else {  
    return {
      props: {}, // will be passed to the page component as props
    };
  }
}

const DashboardPage = () => {
  const router = useRouter();
  const logout = async () => {
    await fetch('/api/logout', {});
    router.push('/login');
  };
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default DashboardPage;
