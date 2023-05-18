import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../App';
import { useContext, useState } from 'react';
import ProfileLinksContainer from './ProfileLinksContainer';
import Searchbar from './Searchbar';

const Header = styled.header`
  display: grid;
  position: sticky;
  top: 0;
  width: 100%;
  grid-template-rows: [row-start] 100% [row-end];
  grid-template-columns: [first] 30% [searchbar-start] 40%[buttons-start] 30% [buttons-end];
  min-height: 65px;
  height: 8vh;
  max-height: 8vh;
  max-width: 100%;
  background-color: hsl(220, 50%, 50%);
  box-shadow: 0px 7px 14px 6px rgba(66, 68, 90, 1);
  color: white;
  @media only screen and (max-width: 500px) {
    grid-template-columns: [first] auto [searchbar-start] 50% [buttons-start] auto [buttons-end];
  }
`;

const HomeLinkContainer = styled.div`
  grid-column-start: first;
  grid-row-start: row-start;
  grid-row-end: row-end;
  display: flex;
  flex-direction: row;
  padding-left: 10%;
  align-items: center;
  @media only screen and (max-width: 500px) {
    padding-left: 10px;
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
  grid-row-start: row-start;
  grid-row-end: row-end;
  width: auto;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 10%;
  @media only screen and (max-width: 500px) {
    padding-right: 10px;
  }
`;

const SignOutButton = styled.button`
  min-width: 60px;
  width: 7vh;
  min-height: 60px;
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
    min-width: 40px;
    width: 5vh;
    min-height: 40px;
    height: 5vh;
  }
`;

export default function AppHeader() {
  const userContext = useContext(UserContext);
  const [searchedUsers, setSearchedUsers] = useState([]);
  console.log(searchedUsers);
  return (
    <Header>
      <HomeLinkContainer>
        <Link to="/">
          <AppHeaderSpan>Home</AppHeaderSpan>
        </Link>
      </HomeLinkContainer>
      <Searchbar setSearchedUsers={setSearchedUsers}></Searchbar>
      <ProfileLinksContainer users={searchedUsers}></ProfileLinksContainer>
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
