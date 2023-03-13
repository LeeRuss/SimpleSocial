import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInForm from './signInForm/SignInForm';
import SignUpForm from './signUpForm/SignUpForm';
import { Container } from '@mui/material';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<SignInForm />} />
          <Route path="/signupform" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
