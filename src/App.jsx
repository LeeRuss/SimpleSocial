import { useState, createContext } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import SignInForm from './signInForm/SignInForm';
import SignUpForm from './signUpForm/SignUpForm';
import { CssBaseline } from '@mui/material';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <CssBaseline />
        {user === null ? <SignInForm></SignInForm> : <div></div>}
      </div>
    </UserContext.Provider>
  );
}

export default App;
