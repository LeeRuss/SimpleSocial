import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

const Avatar = styled.img`
  grid-column-start: profile-start;
  grid-column-end: desc-start;
  grid-row-start: profile-start;
  grid-row-end: posts-start;
  align-self: center;
  justify-self: center;
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

export default function ImageComponent(user) {
  const [imageUrl, setImageUrl] = useState(null);
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

  return <Avatar src={imageUrl} alt="Avatar" />;
}
