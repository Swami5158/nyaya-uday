import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span style={{color: '#F4A261'}}>Nyaya</span>-Uday
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/input" style={styles.link}>Career Path</Link>
        <Link to="/learn" style={styles.link}>Roles</Link>
        <Link to="/simulation" style={styles.link}>Simulation</Link>
      </div>

      <div style={styles.auth}>
        {user ? (
          <>
            <Link to="/profile" style={styles.profileCircle}>
               {/* Show first letter of name or JD */}
               {user.displayName ? user.displayName[0].toUpperCase() : 'JD'}
            </Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} style={styles.loginBtn}>Login</button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 50px',
    height: '80px',
    backgroundColor: 'rgba(11, 60, 93, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  logo: { fontSize: '24px', fontWeight: '800', color: '#fff' },
  links: { display: 'flex', gap: '30px' },
  link: { color: '#d1d1d1', textDecoration: 'none', fontSize: '15px' },
  auth: { display: 'flex', alignItems: 'center', gap: '20px' },
  profileCircle: {
    width: '35px', height: '35px', borderRadius: '50%',
    backgroundColor: '#1C5D85', display: 'flex', alignItems: 'center',
    justifyContent: 'center', color: '#fff', textDecoration: 'none',
    fontSize: '12px', border: '1px solid #F4A261'
  },
  loginBtn: {
    padding: '10px 24px', backgroundColor: '#F4A261', color: '#0B3C5D',
    border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: '700'
  },
  logoutBtn: {
    padding: '10px 24px', backgroundColor: 'transparent', color: '#F4A261',
    border: '1px solid #F4A261', borderRadius: '20px', cursor: 'pointer', fontWeight: '700'
  }
};

export default Navbar;