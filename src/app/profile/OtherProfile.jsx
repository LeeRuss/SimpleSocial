import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import UserDescription from './UserDescription';
import Avatar from './Avatar.jsx';
import Posts from './Posts';
import { useState, useEffect } from 'react';

const Container = styled.div`
  display: grid;
  grid-template-rows: [profile-start] 20vh [posts-start] auto [profile-end];
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
`;

const Span = styled.span`
  grid-row-start: posts-start;
  grid-column-start: profile-start;
  color: black;
`;

export default function OtherProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  console.log(userId);
  useEffect(() => {
    setUser(userId);
  }, [userId]);
  console.log(user);
  if (user) {
    return (
      <Container>
        <Avatar user={user}></Avatar>
        <UserDescription user={user}></UserDescription>
        <Span>{user}</Span>
      </Container>
    );
  }
  return <Container></Container>;
}
