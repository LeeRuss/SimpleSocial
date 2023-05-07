import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../App';
import { useContext } from 'react';
import SearchBar from './SearchBar';

const Header = styled.header`
  display: grid;
  grid-template-rows: [row-start] 100% [row-end];
  grid-template-columns: [first] 30% [searchbar-start] 40%[buttons-start] 30% [buttons-end];
  height: 8%;
  max-width: 100%;
  background-color: hsl(220, 50%, 50%);
  color: white;
  @media only screen and (max-width: 500px) {
    grid-template-columns: [first] auto [searchbar-start] 50% [buttons-start] auto [buttons-end];
  }
`;

const HomeLinkContainer = styled.div`
  grid-column-start: first;
  display: flex;
  flex-direction: row;
  padding-left: 10%;
  align-items: center;
  @media only screen and (max-width: 500px) {
    padding-left: 5px;
  }
`;

const AppHeaderSpan = styled.span`
  color: white;
  font-size: calc(26px + 1vw);

  a:hover & {
    text-shadow: 2px 5px 5px hsl(220, 100%, 20%);
  }

  @media only screen and (max-width: 500px) {
    font-size: calc(22px + 0.7vw);
  }
`;

const AppHeaderButtonsContainer = styled.div`
  grid-column-start: buttons-start;
  width: auto;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 10%;
  @media only screen and (max-width: 500px) {
    padding-right: 5px;
  }
`;

const SignOutButton = styled.button`
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
  background-color: hsl(220, 70%, 70%);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: hsl(220, 100%, 20%);
  }

  @media only screen and (max-width: 500px) {
    width: 5vh;
    height: 5vh;
  }
`;

export default function AppHeader() {
  const userContext = useContext(UserContext);
  return (
    <Header>
      <HomeLinkContainer>
        <Link to="/">
          <AppHeaderSpan>Home</AppHeaderSpan>
        </Link>
      </HomeLinkContainer>
      <SearchBar></SearchBar>
      <AppHeaderButtonsContainer>
        <SignOutButton onClick={userContext.signOut}>
          <AppHeaderSpan className="material-symbols-outlined link">
            logout
          </AppHeaderSpan>
        </SignOutButton>
      </AppHeaderButtonsContainer>
    </Header>
  );
}
