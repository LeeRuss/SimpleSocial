import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import AvatarForm from './AvatarForm';
import { UserContext } from '../../App';
import { useContext } from 'react';

const Container = styled.div`
  grid-column-start: profile-start;
  grid-column-end: desc-start;
  grid-row-start: profile-start;
  grid-row-end: posts-start;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.img`
  width: ${(props) => (props.$solo ? '90%' : '100%')};
  max-width: ${(props) => (props.$solo ? '250px' : 'none')};
  aspect-ratio: 1/1;
  background-color: rgb(64, 106, 191);
  text-align: center;
  object-fit: cover;
  margin: ${(props) => (props.$solo ? '5px 0px' : '0px 0px')};
  border-radius: 50%;
  border: 2px solid black;
`;

const AvatarLoading = styled.div`
  grid-column-start: profile-start;
  grid-column-end: desc-start;
  grid-row-start: profile-start;
  grid-row-end: posts-start;
  align-self: center;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 250px;
  margin: 5px 0px;
  aspect-ratio: 1/1;
  background-color: rgb(64, 106, 191);
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid black;
`;

const Button = styled.button`
  display: flex;
  border: none;
  width: 90%;
  max-width: 250px;
  margin: 5px 0px;
  aspect-ratio: 1/1;
  padding: 0;
  border-radius: 50%;
`;

export default function UserAvatar(user) {
  const userContext = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState(null);
  const [isAvatarFormOpen, setIsAvatarFormOpen] = useState(false);
  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const url = await Storage.get(`avatars/${user.user}`);
        console.log(url);
        setImageUrl(url);
      } catch (error) {
        console.error('Error retrieving image:', error);
      }
    };

    getImageUrl();
  }, [user]);

  if (!imageUrl) {
    return (
      <AvatarLoading>
        <span>Avatar is Loading</span>
      </AvatarLoading>
    );
  }

  return (
    <Container>
      {userContext.user.username === user.user ? (
        <Button
          onClick={() => {
            setIsAvatarFormOpen(true);
          }}
        >
          <Avatar src={imageUrl} alt="Avatar" />
        </Button>
      ) : (
        <Avatar src={imageUrl} alt="Avatar" $solo />
      )}

      <AvatarForm
        user={user.user}
        currentImage={imageUrl}
        isOpened={isAvatarFormOpen}
        setImageUrl={setImageUrl}
        onClose={() => {
          setIsAvatarFormOpen(false);
        }}
      ></AvatarForm>
    </Container>
  );
}
