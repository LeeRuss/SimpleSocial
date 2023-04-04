import { useState, createContext } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import SignInForm from './app/SignInForm.jsx';
import SignUpForm from './app/SignUpForm.jsx';
import { CssBaseline } from '@mui/material';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import ProfilePage from './app/ProfilePage';

Amplify.configure(awsconfig);

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <CssBaseline />
        {user === null ? (
          <SignInForm></SignInForm>
        ) : (
          <ProfilePage></ProfilePage>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
