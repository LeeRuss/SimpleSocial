import { useState, createContext } from 'react';
import reactLogo from './assets/react.svg';
import './AppContainer.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function AppContainer() {
  return (
    <div className="AppContainer">
      <Routes>
        <Route index path="/" element={<App />} />
      </Routes>
    </div>
  );
}

export default AppContainer;
