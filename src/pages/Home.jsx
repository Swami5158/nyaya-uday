import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  // Updated: This now takes the user to your actual Login page
  const handleStart = () => {
    navigate('/login'); 
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Nyaya-Uday</h1>
        <p style={styles.subtitle}>
          Empowering the next generation of legal minds. Discover the Judicial Career Path — Early, Clearly, Honestly.
        </p>
        <div style={styles.buttonGroup}>
          {/* Changed handleLogin to handleStart for clarity */}
          <button style={styles.primaryBtn} onClick={handleStart}>
            Get Started Now
          </button>
          <button style={styles.secondaryBtn}>Watch Demo</button>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsContainer}>
        <div style={styles.statItem}><b>5000+</b> Students</div>
        <div style={styles.statItem}><b>20+</b> State Exams</div>
        <div style={styles.statItem}><b>100%</b> Free Guidance</div>
      </div>

      {/* Goals Section */}
      <div style={styles.goals}>
        <div style={styles.card}>
          <div style={styles.icon}>🧭</div>
          <h3 style={styles.cardTitle}>Clear Career Path</h3>
          <p style={styles.cardText}>Step-by-step guidance to becoming a judge in various high courts.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>⚖️</div>
          <h3 style={styles.cardTitle}>Think Like a Judge</h3>
          <p style={styles.cardText}>Test your ethics and logic with real-world judicial simulations.</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>📊</div>
          <h3 style={styles.cardTitle}>Self-Assessment</h3>
          <p style={styles.cardText}>Detailed analytics to see if you're ready for the bench.</p>
        </div>
      </div>
    </div>
  );
}

// ... styles remain the same as you provided

const styles = {
  container: {
    minHeight: '100vh',
    padding: '60px 20px',
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    background: 'radial-gradient(circle at top left, #0B3C5D 0%, #062c43 100%)',
    color: '#fff'
  },
  hero: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 60px',
  },
  title: {
    fontSize: '56px',
    marginBottom: '20px',
    background: 'linear-gradient(to right, #fff, #F4A261)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: '800'
  },
  subtitle: {
    fontSize: '20px',
    lineHeight: '1.6',
    color: '#d1d1d1',
    marginBottom: '40px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  },
  primaryBtn: {
    padding: '16px 35px',
    fontSize: '16px',
    backgroundColor: '#F4A261',
    color: '#0B3C5D',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'transform 0.2s',
  },
  secondaryBtn: {
    padding: '16px 35px',
    fontSize: '16px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '80px',
    opacity: 0.8
  },
  statItem: {
    fontSize: '18px',
    borderLeft: '2px solid #F4A261',
    paddingLeft: '15px'
  },
  goals: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    padding: '40px 30px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  icon: { fontSize: '40px', marginBottom: '20px' },
  cardTitle: { fontSize: '22px', marginBottom: '15px', color: '#F4A261' },
  cardText: { color: '#e0e0e0', lineHeight: '1.5' }
};

export default Home;