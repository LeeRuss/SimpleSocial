import styled from 'styled-components';

const SearchBox = styled.input`
  background-color: hsl(220, 95%, 95%);
  width: 90%;
  color: hsl(220, 100%, 15%);
  font-size: calc(22px + 0.8vw);
  grid-column-start: searchbar-start;
  border: none;
  border-radius: 20px;
  margin: 10px 0px 10px 0px;
  place-self: center;
  text-align: center;

  &:focus {
    border-color: hsl(220, 100%, 20%);
    border: solid 2px;
    box-shadow: 1px 1px hsl(220, 95%, 30%);
  }

  @media only screen and (max-width: 500px) {
    font-size: calc(22px + 0.5vw);
    max-width: 90%;
  }
`;

export default function SearchBar() {
  return <SearchBox type="text" placeholder="Search user"></SearchBox>;
}
