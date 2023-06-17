import { useState, useEffect } from 'react';
import { Avatar } from './UserAvatar.styled';
import { useForm } from 'react-hook-form';
import { Storage } from 'aws-amplify';
import {
  ModalOverlay,
  ModalContent,
  Container,
  Button,
  ErrorSpan,
} from './AvatarForm.styled';

export default function AvatarForm({
  isOpened,
  onClose,
  currentImage,
  user,
  setImageUrl,
}) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setUploadedImage(null);
  }, [isOpened]);

  const onSubmit = async (data) => {
    clearErrors();
    let image = data.postImage[0];
    let result = null;
    try {
      result = await Storage.put(`avatars/${user}`, image, {
        contentType: image.type,
      });
      let url = await Storage.get(`avatars/${user}`);
      reset();
      setImageUrl(url);
      onClose();
    } catch (error) {
      console.log('Error uploading file: ', error);
      setError('server', {
        type: 'cantPublishPost',
        message: 'We are not able to public your post. Try again later.',
      });
    }
  };

  const handleImageButton = () => {
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

  const handleModalClick = (event) => {
    let target = event.target;
    if (target === event.currentTarget) {
      reset();
      onClose();
    }
  };

  return (
    <>
      {isOpened && (
        <ModalOverlay
          onClick={(e) => {
            handleModalClick(e);
          }}
        >
          <ModalContent>
            <Container>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '50%',
                  height: '100%',
                }}
              >
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
                <Button type="submit">Update avatar</Button>
                {errors.server?.type === 'cantPublishPost' && (
                  <ErrorSpan role="alert">{errors.server?.message}</ErrorSpan>
                )}
              </form>
              <Avatar
                $solo
                src={
                  uploadedImage
                    ? URL.createObjectURL(uploadedImage)
                    : currentImage.imageUrl
                }
              ></Avatar>
            </Container>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
