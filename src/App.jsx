import { useState, createContext } from 'react';
import './app/signIn/style.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import SignInFooter from './app/signIn/SignInFooter';
import SignInHeader from './app/signIn/SignInHeader';
import Header from './app/signIn/Header';
import Footer from './app/signIn/Footer';
import { Link, Outlet } from 'react-router-dom';
import awsconfig from './aws-exports';
import styled from 'styled-components';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
  console.log(user);
  return (
    <div className="App">
      <nav>
        <button></button>
        <Link to="/"> Home</Link>
      </nav>

      <Outlet context={user} />
      <h1>Hello {user.attributes.nickname}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
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
