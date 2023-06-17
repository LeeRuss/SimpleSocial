import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';

const Button = styled.button`
  display: flex;
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
  aspect-ratio: 1/1;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  background-color: black;
  object-fit: cover;
  &:hover {
    border: 3px solid hsl(220, 50%, 50%);
    box-shadow: 0px 0px 10px hsl(220, 100%, 15%);
  }
`;

export default function PostPreview(props) {
  const [imageUrl, setImageUrl] = useState(null);

  const handleClick = (e) => {
    props.openPost(props.post);
  };

  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const url = await Storage.get(`posts/${props.post.id}/image`);
        setImageUrl(url);
      } catch (error) {
        console.error('Error retrieving image:', error);
      }
    };

    getImageUrl();
  }, [props]);
  return (
    <Button onClick={handleClick}>
      <Img src={imageUrl}></Img>
    </Button>
  );
}
