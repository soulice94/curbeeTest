import { Borel } from 'next/font/google';
import styled from "styled-components";

const borel = Borel({ subsets: ['latin'], weight: "400" } );

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  background: var(--brand-primary);
  align-content: center;
  width: 100%;
  height: 100px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 100%;
`;

const Title = styled.h1`
  font-family: ${borel};
  font-weight: 700;
  color: var(--background-color-body);
  height: 45px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <Title className={borel.className}>Carbee</Title>
      </TitleContainer>
    </HeaderContainer>
  );
};

export default Header;
