import { useNavigate } from 'react-router-dom';

function Learn() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <h2>What Does a Judge Do?</h2>

      <ul style={{ marginTop: '20px', fontSize: '16px' }}>
        <li>A judge listens to both sides without bias</li>
        <li>Decisions are based on facts and evidence</li>
        <li>A judge ensures fairness, not punishment</li>
        <li>Personal opinions must not affect judgment</li>
        <li>Every decision must be logically justified</li>
      </ul>

      <p style={{ marginTop: '20px' }}>
        Let’s now see how judicial thinking feels in practice.
      </p>

      <button
        onClick={() => navigate('/simulation')}
        style={{
          marginTop: '30px',
          padding: '12px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Try a Judge Simulation
      </button>
    </div>
  );
}

export default Learn;
