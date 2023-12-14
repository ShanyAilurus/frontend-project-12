import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import NotFound from './NotFound';
import Login from './Login';
import Chat from './Chat';
import AuthProvider from './AuthProvider';
import Registration from './Registration';

const App = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
        </nav>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Registration />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
      <div className="Toastify" />
    </div>
  </div>
);

export default App;
