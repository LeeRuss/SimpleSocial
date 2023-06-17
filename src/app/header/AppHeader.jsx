import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { useContext, useState, useRef } from 'react';
import ProfileLinksContainer from './ProfileLinksContainer';
import Searchbar from './Searchbar';
import PostForm from '../postForm/PostForm';
import {
  Header,
  HomeLinkContainer,
  AppHeaderSpan,
  AppHeaderButtonsContainer,
  HeaderButton,
} from './AppHeader.styled.js';

export default function AppHeader() {
  const userContext = useContext(UserContext);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
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
        <HeaderButton title="Log out" onClick={userContext.signOut}>
          <AppHeaderSpan className="material-symbols-outlined link">
            logout
          </AppHeaderSpan>
        </HeaderButton>
        <HeaderButton
          title="Add Post"
          onClick={() => {
            setIsPostFormOpen(true);
          }}
        >
          <AppHeaderSpan className="material-symbols-outlined link">
            post_add
          </AppHeaderSpan>
        </HeaderButton>
      </AppHeaderButtonsContainer>
      <PostForm
        isOpened={isPostFormOpen}
        onClose={() => {
          setIsPostFormOpen(false);
        }}
      ></PostForm>
    </Header>
  );
}
