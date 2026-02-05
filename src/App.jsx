import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/login'; 
import Input from './pages/Input';
import Roadmap from './pages/Roadmap';
import Learn from './pages/Learn';
import Simulation from './pages/Simulation';
import SimulationDashboard from './pages/SimulationDashboard'; // Added this import
import Score from './pages/Score';
import Profile from './pages/Profile';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Auth State: Logged in as", user.displayName);

        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Smart redirect: If they finished setup, don't let them go back to login/input
          if (data.userState && data.educationLevel) {
            if (location.pathname === '/login' || location.pathname === '/input') {
              navigate('/roadmap', { replace: true });
            }
          }
        }
      } else {
        console.log("Auth State: Logged out");
      }
    });
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/input" element={<Input />} />
        <Route path="/roadmap" element={<Roadmap />} />
        
        {/* Simulation Routes */}
        <Route path="/simulation" element={<SimulationDashboard />} />
        <Route path="/simulation/play" element={<Simulation />} />
        <Route path="/score" element={<Score />} />
        
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;