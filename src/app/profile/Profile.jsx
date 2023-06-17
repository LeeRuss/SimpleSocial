import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import UserDescription from './UserDescription';
import UserAvatar from './UserAvatar.jsx';
import UserPosts from './UserPosts';
import Posts from './Posts';

const Container = styled.div`
  display: grid;
  grid-template-rows: [profile-start] min-content [posts-start] auto [profile-end];
  grid-template-columns: [profile-start] 40% [desc-start] 60% [profile-end];
  justify-content: center;
  min-width: 60%;
  width: 900px;
  max-width: 80%;
  min-height: 80vh;
  margin-top: 3%;
  margin-bottom: 1%;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 6px 36px 3px rgba(66, 68, 90, 1);
  border-radius: 10px;
  color: white;
  @media only screen and (max-width: 600px) {
    max-width: 100vw;
    width: 100vw;
  }
`;

export default function Profile() {
  const userContext = useContext(UserContext);
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userId);
  }, [userId]);

  if (user == userContext.user.username || user == null) {
    return (
      <Container>
        <UserAvatar user={userContext.user.username}></UserAvatar>
        <UserDescription user={userContext.user.username}></UserDescription>
        <UserPosts user={userContext.user.username}></UserPosts>
      </Container>
    );
  }

  if (user) {
    return (
      <Container>
        <UserAvatar user={user}></UserAvatar>
        <UserDescription user={user}></UserDescription>
        <Posts user={user}></Posts>
      </Container>
    );
  }
}
