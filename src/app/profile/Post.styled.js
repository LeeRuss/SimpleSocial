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
  min-height: min-content;
  padding: 12px 24px;
  border: solid 1px black;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: black;

  @media only screen and (max-width: 600px) {
    width: 100vw;
    height: fit-content;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px hsl(220, 50%, 50%);
  border-radius: 4px;
  width: 49%;
  height: 100%;
  @media only screen and (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  background-color: black;
  object-fit: cover;
`;

export const PostContent = styled.span`
  align-self: baseline;
  width: 49%;
  height: fit-content;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 3px solid hsl(220, 50%, 50%);
  border-radius: 4px;
  background-color: #f8f8f8;
  color: black;
  font-size: 1.2rem;
  text-align: left;
  overflow-wrap: break-word;
  @media only screen and (max-width: 600px) {
    align-self: center;
    width: 100%;
  }
`;
