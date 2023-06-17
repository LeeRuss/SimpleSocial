import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import {
  ModalOverlay,
  ModalContent,
  Container,
  ImageContainer,
  Image,
  PostContent,
} from './Post.styled';

export default function Post({ isOpened, onClose, post }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const url = await Storage.get(`posts/${post.id}/image`);
        setImageUrl(url);
      } catch (error) {
        console.error('Error retrieving image:', error);
      }
    };
    getImageUrl();
    setModalOpen(isOpened);
  }, [isOpened]);

  const handleModalClick = (event) => {
    let target = event.target;
    if (target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {modalOpen && (
        <ModalOverlay onClick={handleModalClick}>
          <ModalContent>
            <Container>
              <ImageContainer>
                {imageUrl && <Image src={imageUrl}></Image>}
              </ImageContainer>
              <PostContent>{post.text}</PostContent>
            </Container>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
