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
  width: 90%;
  max-width: 250px;
  margin: 5px 0px;
  aspect-ratio: 1/1;
  background-color: rgb(64, 106, 191);
  text-align: center;
  object-fit: cover;
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
      <Avatar
        onClick={() => {
          if (userContext.user.username === user.user) {
            console.log('działa');
            setIsAvatarFormOpen(true);
          }
        }}
        src={imageUrl}
        alt="Avatar"
      />
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
