import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column-start: searchbar-start;
  grid-row-start: row-end;
  grid-row-end: none;
`;

const SearchBarLink = styled(Link)`
  width: 80%;
  height: min-content;
  background-color: white;
  font-size: calc(18px + 0.8vw);
  text-align: left;
  padding: 0px 2%;
  color: hsl(220, 100%, 15%);
  border-style: solid;
  border-color: hsl(220, 100%, 20%);
  border-radius: 0px;
  border: 5px 5px 5px 5px;
  border-top: none;
  z-index: 2;
  &:first-of-type {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: solid;
    &:hover {
      border-color: hsl(220, 100%, 20%);
    }
  }
  &:last-of-type {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export default function ProfileLinksContainer({ users }) {
  return (
    <Container>
      {users.map((item, i) => {
        return (
          <SearchBarLink to={`/profile/${item.id}`} key={i}>
            {item.nickname}
          </SearchBarLink>
        );
      })}
    </Container>
  );
}
