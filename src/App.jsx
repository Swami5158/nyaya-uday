import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Input from './pages/Input';
import Roadmap from './pages/Roadmap';
import Learn from './pages/Learn';
import Simulation from './pages/Simulation';
import Score from './pages/Score';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<Input />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/score" element={<Score />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
