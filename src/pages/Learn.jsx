import { useNavigate } from 'react-router-dom';

function Learn() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.mainTitle}>Understanding the Courtroom</h2>
        <p style={styles.subText}>Every role is vital to ensuring justice is served fairly.</p>
      </header>

      {/* Visual Aid Placeholder */}
      <div style={styles.visualContainer}>
        
        <p style={{marginTop: '10px', fontSize: '14px', color: '#666'}}>Typical Courtroom Arrangement</p>
      </div>

      {/* Roles Grid */}
      <div style={styles.rolesGrid}>
        <div style={styles.card}>
          <div style={styles.roleHeader}>
            <span style={styles.icon}>👨‍⚖️</span>
            <h3>The Judge</h3>
          </div>
          <p>The impartial umpire who ensures the law is followed and the trial is fair.</p>
          <ul style={styles.list}>
            <li>Rules on evidence</li>
            <li>Instructs the jury</li>
            <li>Decides final sentences</li>
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.roleHeader}>
            <span style={styles.icon}>🧑‍💼</span>
            <h3>The Prosecutor</h3>
          </div>
          <p>Represents the government. Their goal is to prove a crime was committed.</p>
          <ul style={styles.list}>
            <li>Presents state evidence</li>
            <li>Seeks legal justice</li>
            <li>Burden of proof lies here</li>
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.roleHeader}>
            <span style={styles.icon}>🧑‍⚖️</span>
            <h3>The Defense</h3>
          </div>
          <p>The shield for the accused, protecting their constitutional and legal rights.</p>
          <ul style={styles.list}>
            <li>Cross-examines witnesses</li>
            <li>Challenges evidence</li>
            <li>Protects the innocent</li>
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.roleHeader}>
            <span style={styles.icon}>⚖️</span>
            <h3>The Magistrate</h3>
          </div>
          <p>Handles the "entry-level" stages of the legal system and minor cases.</p>
          <ul style={styles.list}>
            <li>Issues search warrants</li>
            <li>Sets bail amounts</li>
            <li>Initial hearings</li>
          </ul>
        </div>
      </div>

      {/* Real World Example Section */}
      <div style={styles.exampleSection}>
        <h3 style={styles.exampleTitle}>📘 Case Study: The Shoplifting Trial</h3>
        <div style={styles.exampleGrid}>
          <div style={styles.exampleItem}><strong>Prosecutor:</strong> Shows CCTV footage of the theft.</div>
          <div style={styles.exampleItem}><strong>Defense:</strong> Argues the footage is too blurry to identify the client.</div>
          <div style={styles.exampleItem}><strong>Judge:</strong> Rules that the blurry footage is still allowed as evidence.</div>
          <div style={styles.exampleItem}><strong>Magistrate:</strong> Signed the warrant to search the suspect's house earlier.</div>
        </div>
      </div>

      {/* Comparison Table */}
      <div style={styles.tableSection}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#0B3C5D' }}>📊 Comparison Table</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Primary Duty</th>
              <th style={styles.th}>Alliance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={styles.tr}>
              <td style={styles.td}>Prosecutor</td>
              <td style={styles.td}>Prove Guilt</td>
              <td style={styles.td}>Government</td>
            </tr>
            <tr style={styles.tr}>
              <td style={styles.td}>Defense</td>
              <td style={styles.td}>Protect Rights</td>
              <td style={styles.td}>The Accused</td>
            </tr>
            <tr style={styles.tr}>
              <td style={styles.td}>Judge</td>
              <td style={styles.td}>Impartial Ruling</td>
              <td style={styles.td}>The Law (Neutral)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{textAlign: 'center', marginTop: '50px'}}>
        <button onClick={() => navigate('/simulation')} style={styles.ctaBtn}>
          Start Judge Simulation →
        </button>
      </div>
    </div>
  );
}

const styles = {
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