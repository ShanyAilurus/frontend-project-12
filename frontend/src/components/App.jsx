import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import Registration from '../pages/Registration';
import AuthNavbar from './Navbar';
import routes from '../route';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.chat()} element={<AuthNavbar />}>
        <Route index element={<Chat />} />
        <Route path={routes.login()} element={<Login />} />
        <Route path={routes.signUp()} element={<Registration />} />
        <Route path={routes.err()} element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
