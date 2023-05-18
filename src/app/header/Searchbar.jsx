import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';

const SearchBar = styled.input`
  background-color: white;
  width: 90%;
  max-height: 90%;
  color: hsl(220, 100%, 15%);
  font-size: calc(22px + 0.8vw);
  grid-column-start: searchbar-start;
  grid-row-start: row-start;
  grid-row-end: row-end;
  border: none;
  border-radius: 20px;
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

export default function Searchbar({ setSearchedUsers }) {
  async function searchUsers(event) {
    if (event.target.value && event.target.vale != '') {
      let users = await API.graphql(
        graphqlOperation(`query SearchUsers {
            listUsers(filter: {nickname: {contains: "${event.target.value}"}}, limit: 5) {
              items {
                nickname
                id
              }
            }
            }`)
      );
      setSearchedUsers(users.data.listUsers.items);
      return;
    } else setSearchedUsers([]);
  }
  return (
    <SearchBar
      type="text"
      placeholder="Search user"
      onChange={searchUsers}
      /*onBlur={() => {
        setSearchedUsers([]);
      }}*/
    ></SearchBar>
  );
}
