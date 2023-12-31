import { getCookie } from 'cookies-next';
import styled from "styled-components";
import Header  from "../../components/shared/Header";
import LoginForm from "../../components/login/LoginForm";

const MainContainer = styled.div`
  height: 100vh;
  background-color: var(--brand-primary);
  background-image: url('bluecar.jpg');
  background-position: center;
  background-size: cover;
`;

const FormContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const token = getCookie('token', { req, res });
  if (token && token !== 'undefined') {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function Login() {
  return (
    <>
      <MainContainer>
        <Header />
        <FormContainer>
          <LoginForm />
        </FormContainer>
      </MainContainer>
    </>
  );
}