import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { Storage } from 'aws-amplify';
import { PostContext } from './Posts';

const Container = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  background-color: black;
  object-fit: cover;
  padding: 0;
  margin: 0;
`;

export default function PostPreview(post) {
  const [imageUrl, setImageUrl] = useState(null);
  const postContext = useContext(PostContext);

  const handleClick = (e) => {
    postContext.openPost(post);
  };

  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const url = await Storage.get(`posts/${post.post.id}/image`);
        setImageUrl(url);
      } catch (error) {
        console.error('Error retrieving image:', error);
      }
    };

    getImageUrl();
  }, [post]);
  return (
    <Container onClick={handleClick}>
      <Img src={imageUrl}></Img>
    </Container>
  );
}
