import styled from 'styled-components';
import { useEffect, useRef } from 'react';

const Container = styled.dialog`
  width: 800px;
  height: 80%;
  border: solid 1px black;
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export default function PostForm({ isOpened, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isOpened) ref.current.showModal();
    else ref.current.close();
  }, [isOpened]);
  return (
    <Container
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        const dialogDimensions = ref.current.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          onClose();
          ref.current.close();
        }
      }}
    >
      <form>
        <input type="text" />

        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}
