import styled from 'styled-components';

export const UserDescriptionContainer = styled.div`
  grid-row-start: profile-start;
  grid-row-end: posts-start;
  grid-column-start: desc-start;
  grid-column-end: profile-end;
  display: flex;
  flex-direction: column;
  border-left: solid 1px hsla(210, 10%, 40%, 0.5);
  color: hsl(210, 25%, 25%);
`;

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NicknameSpan = styled.span`
  margin-top: 1vh;
  font-size: 2em;
  font-weight: bold;
`;

export const UserDescriptionSpan = styled.span`
  font-size: 1.2em;
  justify-self: center;
  text-align: center;
  width: 100%;
`;

export const EditButton = styled.button`
  align-self: flex-end;
  display: flex;
  align-self: ${(props) => (props.$baseline ? 'baseline' : '')};
  justify-content: center;
  align-items: center;
  margin-right: 1%;
  width: 20px;
  font-size: 20px;
  color: hsl(220, 50%, 50%);
  background-color: rgba(255, 255, 255, 0);
`;

export const TextArea = styled.textarea`
  width: 98% !important;
  height: 100%;
  font-size: 1.1em;
  text-align: center;
  align-self: center;
  margin-bottom: 1%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 3px solid hsl(220, 50%, 50%);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  resize: none;
`;

export const FormButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const ErrorSpan = styled.span`
  color: #c50404;
  width: 100%;
`;
