import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleStart = () => {
    navigate('/login'); 
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div style={styles.container}>
      {/* Language Toggle Button */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button onClick={toggleLanguage} style={styles.langBtn}>
          {i18n.language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
        </button>
      </div>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>{t('welcome_title', { defaultValue: 'Nyaya-Uday' })}</h1>
        <p style={styles.subtitle}>
          {t('hero_subtitle', { defaultValue: 'Empowering the next generation of legal minds. Discover the Judicial Career Path — Early, Clearly, Honestly.' })}
        </p>
        <div style={styles.buttonGroup}>
          <button style={styles.primaryBtn} onClick={handleStart}>
            {t('get_started', { defaultValue: 'Get Started Now' })}
          </button>
          <button style={styles.secondaryBtn}>{t('watch_demo', { defaultValue: 'Watch Demo' })}</button>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsContainer}>
        <div style={styles.statItem}><b>5000+</b> {t('students', { defaultValue: 'Students' })}</div>
        <div style={styles.statItem}><b>20+</b> {t('state_exams', { defaultValue: 'State Exams' })}</div>
        <div style={styles.statItem}><b>100%</b> {t('free_guidance', { defaultValue: 'Free Guidance' })}</div>
      </div>

      {/* Goals Section */}
      <div style={styles.goals}>
        <div style={styles.card}>
          <div style={styles.icon}>🧭</div>
          <h3 style={styles.cardTitle}>{t('goal1_title', { defaultValue: 'Clear Career Path' })}</h3>
          <p style={styles.cardText}>{t('goal1_text', { defaultValue: 'Step-by-step guidance to becoming a judge.' })}</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>⚖️</div>
          <h3 style={styles.cardTitle}>{t('goal2_title', { defaultValue: 'Think Like a Judge' })}</h3>
          <p style={styles.cardText}>{t('goal2_text', { defaultValue: 'Test your ethics and logic with real-world judicial simulations.' })}</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>📊</div>
          <h3 style={styles.cardTitle}>{t('goal3_title', { defaultValue: 'Self-Assessment' })}</h3>
          <p style={styles.cardText}>{t('goal3_text', { defaultValue: 'Detailed analytics to see if you\'re ready for the bench.' })}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  // ... Keep all your existing styles here ...
  // ADD THIS NEW STYLE FOR THE BUTTON
  langBtn: {
    padding: '10px 20px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    border: '1px solid #F4A261',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600'
  },
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