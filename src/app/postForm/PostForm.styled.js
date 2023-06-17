import styled from 'styled-components';

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
  width: 1000px;
  height: 600px;
  max-width: 90vw;
  max-height: 90vh;
  min-width: 300px;
  padding: 12px 24px;
  border: solid 1px black;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: black;

  @media only screen and (max-width: 600px) {
    width: 90vw;
    height: 70vh;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  min-height: max-content;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  border: solid 3px hsl(220, 50%, 50%);
  border-radius: 4px;
  width: 49%;
  height: 100%;
  @media only screen and (max-width: 600px) {
    height: none;
    aspect-ratio: 1/2;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  background-color: black;
  object-fit: cover;
`;

export const TextArea = styled.textarea`
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
export const Button = styled.button`
  background-color: hsl(220, 50%, 50%);
  width: auto;
  height: auto;
  margin: 10%;
`;

export const ErrorSpan = styled.span`
  color: #c50404;
`;
