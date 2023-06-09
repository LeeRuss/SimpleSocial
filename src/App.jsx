import { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { create } from 'zustand';
import './app/signIn/style.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import SignInFooter from './app/signIn/SignInFooter';
import SignInHeader from './app/signIn/SignInHeader';
import Header from './app/signIn/Header';
import Footer from './app/signIn/Footer';
import awsconfig from './aws-exports';
import styled from 'styled-components';
import AppHeader from './app/header/AppHeader';

Amplify.configure(awsconfig);

export const usePostsStore = create((set) => ({
  posts: [],
  setPosts: (newPosts) => set({ posts: newPosts }),
  addPost: (newPost) =>
    set((state) => ({
      posts: [newPost, ...state.posts],
    })),
  removePost: (postToRemove) =>
    set((state) => {
      let currentPosts = state.posts;
      currentPosts.splice(postToRemove, postToRemove);
      return { posts: currentPosts };
    }),
}));

export const UserContext = createContext(undefined);

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: hsl(220, 95%, 95%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App({ signOut, user }) {
  return (
    <AppWrapper>
      <UserContext.Provider value={{ signOut: signOut, user: user }}>
        <AppHeader></AppHeader>
        <Outlet />
      </UserContext.Provider>
    </AppWrapper>
  );
}

export default withAuthenticator(App, {
  components: {
    Header,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter,
    },
    Footer,
  },
});
