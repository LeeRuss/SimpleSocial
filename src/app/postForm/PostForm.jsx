import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { createPosts } from '../../graphql/mutations';
import { UserContext } from '../../App';
import { usePostsStore } from '../../App';
import {
  ModalOverlay,
  ModalContent,
  Container,
  ImageContainer,
  Image,
  TextArea,
  Button,
  ErrorSpan,
} from './PostForm.styled';

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
  const { addPost } = usePostsStore();

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
      addPost(post);
      reset();
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
