import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';

const UserDescriptionContainer = styled.div`
  grid-row-start: profile-start;
  grid-row-end: posts-start;
  grid-column-start: desc-start;
  grid-column-end: profile-end;
  display: flex;
  flex-direction: column;

  border-left: solid 1px hsla(210, 10%, 40%, 0.5);
  color: hsl(210, 25%, 25%);
`;

const NicknameSpan = styled.span`
  margin-top: 1vh;
  font-size: 1.5em;
  font-weight: bold;
`;

const UserDescriptionSpan = styled.span``;

function getUser(user) {
  return `query GetUser {
    getUsers(id: "${user}") {
        id
        nickname
        description
    }
  }`;
}

export default function UserDescription({ user }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await API.graphql(graphqlOperation(getUser(user)));
        setUserData(data.data.getUsers);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <UserDescriptionContainer></UserDescriptionContainer>;
  }

  return (
    <UserDescriptionContainer>
      <NicknameSpan>{userData.nickname}</NicknameSpan>
      <UserDescriptionSpan>{userData.description}</UserDescriptionSpan>
    </UserDescriptionContainer>
  );
}
