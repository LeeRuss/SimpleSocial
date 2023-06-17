import { useEffect, useState, createContext } from 'react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import PostPreview from './PostPreview';
import Post from './Post';

const PostsContainer = styled.div`
  grid-column-start: profile-start;
  grid-column-end: profile-end;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: min-content;
  padding: 1%;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  border-top: solid 1px hsla(210, 10%, 40%, 0.5);
  color: hsl(210, 25%, 25%);
  grid-gap: 12px;
`;

function getPosts(user) {
  return `query MyQuery {
    postsByUsersID(usersID: "${user.user}") {
      items {
        id
        images
        text
        createdAt
        usersID
      }
    }
  }`;
}

export const PostContext = createContext(undefined);

export default function Posts(user) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        let newPosts = await API.graphql(graphqlOperation(getPosts(user)));
        newPosts = newPosts.data.postsByUsersID.items;
        newPosts.sort((x, y) => {
          if (new Date(x.createdAt) < new Date(y.createdAt)) {
            return 1;
          }
          return -1;
        });
        setPosts(newPosts);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [user]);

  const openPost = (post) => {
    setSelectedPost(post);
    setIsPostOpen(true);
  };

  const closePost = () => {
    setSelectedPost(null);
    setIsPostOpen(false);
  };

  if (isLoading) {
    return (
      <PostsContainer>
        <p>Posts are loading</p>
      </PostsContainer>
    );
  }
  if (error) {
    return (
      <PostsContainer>
        <p>There is some error, try again later.</p>
      </PostsContainer>
    );
  }
  return (
    <PostsContainer>
      {posts.map((item, i) => {
        return (
          <PostPreview post={item} openPost={openPost} key={i}></PostPreview>
        );
      })}
      {isPostOpen && (
        <Post
          post={selectedPost}
          isOpened={isPostOpen}
          onClose={closePost}
        ></Post>
      )}
    </PostsContainer>
  );
}
