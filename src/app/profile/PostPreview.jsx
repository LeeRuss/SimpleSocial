import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { Storage } from 'aws-amplify';
import { PostContext } from './Posts';

const Img = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: black;
  object-fit: cover;
  &:hover {
    border: 3px solid hsl(220, 50%, 50%);
    box-shadow: 0px 0px 10px hsl(220, 100%, 15%);
  }
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
  return <Img src={imageUrl} onClick={handleClick}></Img>;
}
