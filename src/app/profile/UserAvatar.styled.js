import styled from 'styled-components';

export const Container = styled.div`
  grid-column-start: profile-start;
  grid-column-end: desc-start;
  grid-row-start: profile-start;
  grid-row-end: posts-start;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.img`
  width: ${(props) => (props.$solo ? '90%' : '100%')};
  max-width: ${(props) => (props.$solo ? '250px' : 'none')};
  aspect-ratio: 1/1;
  background-color: rgb(64, 106, 191);
  text-align: center;
  object-fit: cover;
  margin: ${(props) => (props.$solo ? '5px 0px' : '0px 0px')};
  border-radius: 50%;
  border: 2px solid black;
`;

export const AvatarLoading = styled.div`
  grid-column-start: profile-start;
  grid-column-end: desc-start;
  grid-row-start: profile-start;
  grid-row-end: posts-start;
  align-self: center;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 250px;
  margin: 5px 0px;
  aspect-ratio: 1/1;
  background-color: rgb(64, 106, 191);
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid black;
`;

export const Button = styled.button`
  display: flex;
  border: none;
  width: 90%;
  max-width: 250px;
  margin: 5px 0px;
  aspect-ratio: 1/1;
  padding: 0;
  border-radius: 50%;
`;
