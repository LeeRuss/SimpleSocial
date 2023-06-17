import styled from 'styled-components';

export const Header = styled.header`
  display: grid;
  position: sticky;
  top: 0;
  width: 100%;
  grid-template-rows: [row-start] 100% [row-end];
  grid-template-columns: [first] 30% [searchbar-start] 40%[buttons-start] 30% [buttons-end];
  min-height: 65px;
  height: 8vh;
  max-height: 8vh;
  max-width: 100%;
  background-color: hsl(220, 50%, 50%);
  box-shadow: 0px 7px 14px 6px rgba(66, 68, 90, 1);
  color: white;
  @media only screen and (max-width: 500px) {
    grid-template-columns: [first] 25% [searchbar-start] 40% [buttons-start] 35% [buttons-end];
  }
`;

export const HomeLinkContainer = styled.div`
  grid-column-start: first;
  grid-row-start: row-start;
  grid-row-end: row-end;
  display: flex;
  flex-direction: row;
  padding-left: 10%;
  align-items: center;
  @media only screen and (max-width: 500px) {
    padding-left: 10px;
  }
`;

export const AppHeaderSpan = styled.span`
  color: white;
  font-size: calc(26px + 1vw);

  a:hover & {
    text-shadow: 2px 5px 5px hsl(220, 100%, 20%);
  }

  @media only screen and (max-width: 500px) {
    font-size: calc(22px + 0.7vw);
  }
`;

export const AppHeaderButtonsContainer = styled.div`
  grid-column-start: buttons-start;
  grid-row-start: row-start;
  grid-row-end: row-end;
  width: auto;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 10%;
  @media only screen and (max-width: 600px) {
    justify-content: space-evenly;
    padding-right: 0px;
  }
`;

export const HeaderButton = styled.button`
  min-width: 60px;
  width: 7vh;
  min-height: 60px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: hsl(220, 70%, 70%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;

  &:hover {
    border-color: hsl(220, 100%, 20%);
  }
  @media only screen and (max-width: 600px) {
    margin-left: 0px;
  }

  @media only screen and (max-width: 550px) {
    min-width: 40px;
    min-height: 40px;
    margin-left: 10px;
  }
`;
