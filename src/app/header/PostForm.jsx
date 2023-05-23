import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { createPosts } from '../../graphql/mutations';
import { UserContext } from '../../App';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 1000px;
  height: 600px;
  padding: 12px 24px;
  border: solid 1px black;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: black;

  @media only screen and (max-width: 600px) {
    width: 100vw;
    height: 40vh;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px hsl(220, 50%, 50%);
  border-radius: 4px;
  width: 49%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background-color: black;
  object-fit: cover;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  margin-bottom: 10%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 3px solid hsl(220, 50%, 50%);
  border-radius: 4px;
  background-color: #f8f8f8;
  color: black;
  resize: none;
`;
const Button = styled.button`
  background-color: hsl(220, 50%, 50%);
  margin: 10%;
`;

const ErrorSpan = styled.span`
  color: #c50404;
`;

export default function PostForm({ isOpened, onClose }) {
  const userContext = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    clearErrors();
    let uuid = uuidv4();
    let image = data.postImage[0];
    let postContent = data.postContent;
    let result;
    let url = null;
    try {
      result = await Storage.put(`posts/${uuid}/image`, image, {
        contentType: image.type,
      });
      url = await Storage.get(`posts/${uuid}/image`);
      let newDate = new Date().toISOString();
      let post = {
        id: uuid,
        creation_time: newDate,
        text: postContent,
        likes: 0,
        images: [url],
        usersID: userContext.user.username,
      };
      await API.graphql(graphqlOperation(createPosts, { input: post }));
      onClose();
    } catch (error) {
      console.log('Error uploading file: ', error);
      setError('server', {
        type: 'cantPublishPost',
        message: 'We are not able to public your post. Try again later.',
      });
    }
  };

  const handleImageButton = (event) => {
    document.getElementById('file').click();
  };

  const handleImageChange = (event) => {
    let image = event.target.files[0];
    if (image?.type != 'image/jpeg' && image.type != 'image/png') {
      setError('selectedFile', {
        type: 'fileType',
        message: 'Only PNGs and JPGs are valid.',
      });
      return;
    } else clearErrors('selectedFile');
    setUploadedImage(image);
  };

  useEffect(() => {
    setModalOpen(isOpened);
    setUploadedImage(null);
  }, [isOpened]);

  const handleModalClick = (event) => {
    let target = event.target;
    if (target === event.currentTarget) {
      reset();
      onClose();
    }
  };

  return (
    <>
      {modalOpen && (
        <ModalOverlay onClick={handleModalClick}>
          <ModalContent>
            <Container>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  height: '100%',
                }}
              >
                <TextArea
                  placeholder="Post content"
                  {...register('postContent', {
                    required: true,
                    maxLength: 200,
                  })}
                  aria-invalid={errors.postContent ? 'true' : 'false'}
                />
                {errors.postContent?.type === 'required' && (
                  <ErrorSpan role="alert">Post content is required.</ErrorSpan>
                )}
                {errors.postContent?.type === 'maxLength' && (
                  <ErrorSpan role="alert">
                    Post content can only be 200 characters long.
                  </ErrorSpan>
                )}
                <input
                  type="file"
                  id="file"
                  accept="image/jpeg, image/png"
                  onInput={(e) => {
                    handleImageChange(e);
                  }}
                  style={{ display: 'none' }}
                  {...register('postImage', { required: true, max: 1 })}
                  aria-invalid={errors.postContent ? 'true' : 'false'}
                />
                <Button type="button" onClick={handleImageButton}>
                  Add image
                </Button>
                {errors.postImage?.type === 'required' && (
                  <ErrorSpan role="alert">
                    You need to upload an image.
                  </ErrorSpan>
                )}
                {errors.selectedFile?.type === 'fileType' && (
                  <ErrorSpan role="alert">
                    {errors.selectedFile?.message}
                  </ErrorSpan>
                )}
                <Button type="submit">Post</Button>
                {errors.server?.type === 'cantPublishPost' && (
                  <ErrorSpan role="alert">{errors.server?.message}</ErrorSpan>
                )}
              </form>
              <ImageContainer>
                {uploadedImage && (
                  <Image src={URL.createObjectURL(uploadedImage)}></Image>
                )}
              </ImageContainer>
            </Container>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
