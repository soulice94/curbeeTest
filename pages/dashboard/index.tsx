import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import FreeDates from './freeDates';
import Appointments from './appointments';
import styled from "styled-components";
import { Lexend } from 'next/font/google';
import Header from './header';

const lexend = Lexend({ subsets: ['latin'] });

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
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
  return (
    <>
      <Header />
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
    </>
  );
};

export default DashboardPage;
