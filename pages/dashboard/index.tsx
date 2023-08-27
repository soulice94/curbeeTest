import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import FreeDates from './freeDates';
import Appointments from './appointments';
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

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
      <h1 style={{color: 'red'}}>Dashboard</h1>
      <DashboardContainer>
        <div>
          <h2>Free Dates</h2>
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
