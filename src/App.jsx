import { useState, createContext } from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export const UserContext = createContext();

function App({ signOut, user }) {
  return (
    <UserContext.Provider value={{ user, signOut }}>
      <div className="App">
        <h1>Hello {user.username}</h1>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </UserContext.Provider>
  );
}

export default withAuthenticator(App);
