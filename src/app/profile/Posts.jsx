import styled from 'styled-components';

const PostsContainer = styled.div`
  grid-row-start: posts-start;
  grid-row-end: profile-end;
  grid-column-start: profile-start;
  grid-column-end: profile-end;

  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  border-top: solid 1px hsla(210, 10%, 40%, 0.5);
  color: hsl(210, 25%, 25%);
`;

export default function Posts(user) {
  return <PostsContainer></PostsContainer>;
}
