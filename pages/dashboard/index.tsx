import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import FreeDates from './freeDates';
import Appointments from './appointments';
import styled from "styled-components";
import { Lexend } from 'next/font/google';

const lexend = Lexend({ subsets: ['latin'] });

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export async function getServerSideProps(context: any) {
  const req = context.req;
  const res = context.res;
  const token = getCookie('token', { req, res });
  if (!token || token === 'undefined') {
    return {
      redirect: {
        source: '/dashboard', 
        destination: '/authorize?redirect=/dashboard',
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
      <h1 className={lexend.className} style={{color: 'red'}}>Dashboard</h1>
      <DashboardContainer>
        <div>
          <h2 className={lexend.className}>Free Dates</h2>
          <FreeDates />
        </div>
        <div>
          <Appointments />
        </div>
      </DashboardContainer>
      <br/>
      <button onClick={logout}>Logout!!!!</button>
    </>
  );
};

export default DashboardPage;
