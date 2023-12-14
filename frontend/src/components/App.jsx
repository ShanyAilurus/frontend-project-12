import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Login';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<h1>Index Page </h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
