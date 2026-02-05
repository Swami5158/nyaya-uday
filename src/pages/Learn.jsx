import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Learn() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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

      <header style={styles.header}>
        <h2 style={styles.mainTitle}>{t('learn_title')}</h2>
        <p style={styles.subText}>{t('learn_subtitle')}</p>
      </header>

      <div style={styles.visualContainer}>
        <p style={{marginTop: '10px', fontSize: '14px', color: '#666'}}>{t('court_arrangement')}</p>
      </div>

      {/* Roles Grid */}
      <div style={styles.rolesGrid}>
        <div style={styles.card}>
          <div style={styles.roleHeader}>
            <span style={styles.icon}>👨‍⚖️</span>
            <h3>{t('role_judge_title')}</h3>
          </div>
          <p>{t('role_judge_desc')}</p>
          <ul style={styles.list}>
            <li>{t('judge_point1')}</li>
            <li>{t('judge_point2')}</li>
            <li>{t('judge_point3')}</li>
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.roleHeader}>
            <span style={styles.icon}>🧑‍💼</span>
            <h3>{t('role_prosecutor_title')}</h3>
          </div>
          <p>{t('role_prosecutor_desc')}</p>
          <ul style={styles.list}>
            <li>{t('pros_point1')}</li>
            <li>{t('pros_point2')}</li>
            <li>{t('pros_point3')}</li>
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.roleHeader}>
            <span style={styles.icon}>🧑‍⚖️</span>
            <h3>{t('role_defense_title')}</h3>
          </div>
          <p>{t('role_defense_desc')}</p>
          <ul style={styles.list}>
            <li>{t('def_point1')}</li>
            <li>{t('def_point2')}</li>
            <li>{t('def_point3')}</li>
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.roleHeader}>
            <span style={styles.icon}>⚖️</span>
            <h3>{t('role_magistrate_title')}</h3>
          </div>
          <p>{t('role_magistrate_desc')}</p>
          <ul style={styles.list}>
            <li>{t('mag_point1')}</li>
            <li>{t('mag_point2')}</li>
            <li>{t('mag_point3')}</li>
          </ul>
        </div>
      </div>

      {/* Case Study Section */}
      <div style={styles.exampleSection}>
        <h3 style={styles.exampleTitle}>📘 {t('case_study_title')}</h3>
        <div style={styles.exampleGrid}>
          <div style={styles.exampleItem}><strong>{t('prosecutor')}:</strong> {t('study_pros')}</div>
          <div style={styles.exampleItem}><strong>{t('defense')}:</strong> {t('study_def')}</div>
          <div style={styles.exampleItem}><strong>{t('judge')}:</strong> {t('study_judge')}</div>
          <div style={styles.exampleItem}><strong>{t('magistrate')}:</strong> {t('study_mag')}</div>
        </div>
      </div>

      <div style={{textAlign: 'center', marginTop: '50px'}}>
        <button onClick={() => navigate('/simulation')} style={styles.ctaBtn}>
          {t('start_sim_btn')} →
        </button>
      </div>
    </div>
  );
}

const styles = {
  // ... Keep all your existing styles ...
  langBtn: {
    padding: '8px 16px',
    backgroundColor: '#0B3C5D',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  container: {
    padding: '60px 10%',
    backgroundColor: '#F7F9FB',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif"
  },
  header: { textAlign: 'center', marginBottom: '50px' },
  mainTitle: { fontSize: '36px', color: '#0B3C5D', fontWeight: '800' },
  subText: { color: '#555', fontSize: '18px' },
  visualContainer: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    textAlign: 'center',
    marginBottom: '50px'
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginBottom: '60px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
    borderTop: '5px solid #F4A261',
    transition: 'transform 0.3s ease'
  },
  roleHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' },
  icon: { fontSize: '30px' },
  list: { paddingLeft: '20px', marginTop: '15px', color: '#444' },
  exampleSection: {
    backgroundColor: '#0B3C5D',
    color: '#fff',
    padding: '40px',
    borderRadius: '20px',
    marginBottom: '60px'
  },
  exampleTitle: { color: '#F4A261', marginBottom: '25px' },
  exampleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  exampleItem: { backgroundColor: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' },
  tableSection: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden' },
  tableHeader: { backgroundColor: '#1C5D85', color: '#fff' },
  th: { padding: '15px', textAlign: 'left' },
  td: { padding: '15px', borderBottom: '1px solid #eee' },
  ctaBtn: {
    padding: '18px 40px',
    fontSize: '18px',
    backgroundColor: '#F4A261',
    color: '#0B3C5D',
    border: 'none',
    borderRadius: '35px',
    cursor: 'pointer',
    fontWeight: '700',
    boxShadow: '0 10px 20px rgba(244, 162, 97, 0.3)'
  }
};

export default Learn;