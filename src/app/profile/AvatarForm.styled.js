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
  width: 600px;
  height: 1000px;
  max-height: 95vh;
  max-width: 95vw;
  padding: 12px 24px;
  border: solid 1px black;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: black;

  @media only screen and (max-width: 600px) {
    width: 100vw;
    height: 90vh;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  background-color: hsl(220, 50%, 50%);
  width: fit-content;
  height: fit-content;
  margin: 10%;
`;
export const ErrorSpan = styled.span`
  color: #c50404;
`;
