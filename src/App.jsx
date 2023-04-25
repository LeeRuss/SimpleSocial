import { useState, createContext } from 'react';
import './app/signIn/style.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import SignInFooter from './app/signIn/SignInFooter';
import SignInHeader from './app/signIn/SignInHeader';
import Header from './app/signIn/Header';
import Footer from './app/signIn/Footer';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export const UserContext = createContext();

function App({ signOut, user }) {
  console.log(user);
  return (
    <UserContext.Provider value={{ user, signOut }}>
      <div className="App">
        <h1>Hello {user.attributes.nickname}</h1>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </UserContext.Provider>
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
