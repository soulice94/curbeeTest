import styled from "styled-components";
import Header  from "../../components/shared/Header";
import LoginForm from "../../components/login/LoginForm";

const MainContainer = styled.div`
  height: 100vh;
`;

const FormContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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