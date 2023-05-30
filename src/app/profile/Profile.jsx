import styled from 'styled-components';
import { useContext } from 'react';
import { UserContext } from '../../App';
import UserDescription from './UserDescription';
import UserAvatar from './UserAvatar.jsx';
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
  return (
    <Container>
      <UserAvatar user={userContext.user.username}></UserAvatar>
      <UserDescription user={userContext.user.username}></UserDescription>
      <Posts user={userContext.user.username}></Posts>
    </Container>
  );
}
