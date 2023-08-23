import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  background: var(--brand-primary);
`;

const LoginContainer = styled.div`
  border: 1px solid black;
`;


export default function Login() {
  return (
    <Container>
      <LoginContainer>
        <h1>Login</h1>
      </LoginContainer>
    </Container>
  );
}