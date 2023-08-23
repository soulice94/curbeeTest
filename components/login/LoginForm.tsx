
import { Form, Field } from 'react-final-form';
import { Lexend } from 'next/font/google';
import styled from "styled-components";

const lexend = Lexend({ subsets: ['latin'] });

const LoginContainer = styled.div`
  max-width: 500px;
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
`;

const LoginTitle = styled.h3`
  color: var(--brand-primary);
  font-size: 2rem;
  text-align: center;
`;

const LoginButton = styled.button`
  background: var(--brand-primary);
  color: var(--background-color-body);
  border: none;
  font-size: 1.2rem;
  height: 50px;
  width: 97%;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  &:hover {
    background: var(--brand-primary-100);
  }
`;

const StyledInput = styled.input`
  font-size: 1.2rem;
  color: var(--font-color-primary);
  width: 95%;
  margin-bottom: 0.5rem;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const LoginForm  = () => {
  const submit = () => {};
  return (
    <LoginContainer>
        <LoginTitle className={lexend.className}>Login</LoginTitle>
        <Form
          onSubmit={submit}
          render={({ handleSubmit, form, submitting, pristine }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Field
              type="text"
              name="email"
              placeholder="Email"
              component={StyledInput}
            />
            <Field
              name='password'
              render={props => (
                <StyledInput {...props.input} type='password' placeholder='Password'/>
              )}
            />
            <LoginButton type='submit'>Enter</LoginButton>
          </StyledForm>
        )}/>
    </LoginContainer>
  );
};

export default LoginForm;
