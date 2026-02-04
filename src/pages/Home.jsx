import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/profile');
  };

  return (
    <div style={styles.container}>
      
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Nyaya-Uday</h1>
        <p style={styles.subtitle}>
          Discover the Judicial Career Path — Early, Clearly, Honestly
        </p>

        <button style={styles.primaryBtn} onClick={handleLogin}>
          Login & Start
        </button>
      </div>

      {/* Goals Section */}
      <div style={styles.goals}>
        <div style={styles.card}>
          <h3>🧭 Clear Career Path</h3>
          <p>Step-by-step guidance to becoming a judge.</p>
        </div>

        <div style={styles.card}>
          <h3>⚖️ Think Like a Judge</h3>
          <p>Experience judicial decision-making.</p>
        </div>

        <div style={styles.card}>
          <h3>📊 Honest Self-Assessment</h3>
          <p>Decide before committing years of effort.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #0B3C5D 0%, #1C5D85 40%, #F7F9FB 100%)'
  },
  hero: {
    textAlign: 'center',
    marginBottom: '50px',
    color: '#FFFFFF'
  },
  title: {
    fontSize: '44px',
    marginBottom: '10px',
    fontWeight: '700'
  },
  subtitle: {
    fontSize: '18px',
    maxWidth: '520px',
    margin: '0 auto 30px',
    lineHeight: '1.5'
  },
  primaryBtn: {
    padding: '14px 30px',
    fontSize: '16px',
    backgroundColor: '#F4A261',
    color: '#0B3C5D',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  goals: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '22px'
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '22px',
    borderRadius: '10px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
    textAlign: 'center',
    color: '#2E2E2E'
  }
};

export default Home;
