import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        Nyaya-Uday
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/input" style={styles.link}>Check Career Path</Link>
        <Link to="/learn" style={styles.link}>Roles</Link>
        <Link to="/simulation" style={styles.link}>Judge Simulation</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
      </div>

      <button style={styles.loginBtn}>
        Login
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 30px',
    backgroundColor: '#0B3C5D',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  logo: {
    fontSize: '20px',
    fontWeight: '700'
  },
  links: {
    display: 'flex',
    gap: '20px'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '15px'
  },
  loginBtn: {
    padding: '8px 16px',
    backgroundColor: '#F4A261',
    color: '#0B3C5D',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

export default Navbar;
