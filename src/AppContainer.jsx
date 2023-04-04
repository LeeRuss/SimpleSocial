import { useState, createContext } from 'react';
import reactLogo from './assets/react.svg';
import './AppContainer.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import App from './App';
import SignUpForm from './app/SignUpForm.jsx';
import { CssBaseline } from '@mui/material';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function AppContainer() {
  return (
    <div className="AppContainer">
      <CssBaseline />
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/signupform" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default AppContainer;
