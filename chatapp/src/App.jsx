import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './routes/signup';
import Login from './routes/login';
import Profile from './components/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
