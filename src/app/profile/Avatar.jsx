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
  width: 18vh;
  height: 18vh;
  background-color: rgb(64, 106, 191);
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid black;

  @media only screen and (max-width: 360px) {
    width: 10vh;
    height: 10vh;
  }
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
  width: 18vh;
  height: 18vh;
  background-color: rgb(64, 106, 191);
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid black;

  @media only screen and (max-width: 360px) {
    width: 10vh;
    height: 10vh;
  }
`;

export default function ImageComponent(user) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getImageUrl = async () => {
      try {
        /*const url = await Storage.get(
          `${bucket}/protected/avatars/${user}.jpg`
        );*/
        setImageUrl(
          'https://testing-storage-d625e700185611-staging.s3.eu-central-1.amazonaws.com/protected/avatars/cdbf3654-f9f1-480b-af01-4a13910edc7e.jpg'
        );
      } catch (error) {
        console.error('Error retrieving image:', error);
      }
    };

    getImageUrl();
  }, []);

  if (!imageUrl) {
    console.log(imageUrl);
    return (
      <AvatarLoading>
        <span>Avatar is Loading</span>
      </AvatarLoading>
    );
  }

  return <Avatar src={imageUrl} alt="Avatar" />;
}
