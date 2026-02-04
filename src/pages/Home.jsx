import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Nyaya-Uday</h1>

      <h3>
        Judicial Career Discovery & Simulation App
      </h3>

      <p>
        Understand the path to becoming a judge and
        see if judicial thinking suits you.
      </p>

      <button
        onClick={() => navigate('/input')}
        style={{
          marginTop: '20px',
          padding: '12px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Start My Journey
      </button>
    </div>
  );
}

export default Home;
