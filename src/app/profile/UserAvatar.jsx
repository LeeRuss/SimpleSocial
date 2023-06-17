import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import AvatarForm from './AvatarForm';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { Container, Avatar, AvatarLoading, Button } from './UserAvatar.styled';

export default function UserAvatar(user) {
  const userContext = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState(null);
  const [isAvatarFormOpen, setIsAvatarFormOpen] = useState(false);
  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const url = await Storage.get(`avatars/${user.user}`);
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
          title="Change Avatar"
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
