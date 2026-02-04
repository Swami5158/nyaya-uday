import { useNavigate } from 'react-router-dom';

function Roadmap() {
  const navigate = useNavigate();

  const educationLevel = localStorage.getItem('educationLevel');
  const state = localStorage.getItem('userState');

  let lawPath = '';

  if (educationLevel === 'Graduate') {
    lawPath = '3-Year LLB (after graduation)';
  } else {
    lawPath = '5-Year LLB (after 12th)';
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>Your Judicial Career Roadmap</h2>

      <p>
        Based on your profile (<strong>{educationLevel}</strong>,{' '}
        <strong>{state}</strong>), here is your path:
      </p>

      <ul style={{ marginTop: '25px', fontSize: '16px' }}>
        <li>Complete your current education</li>
        <li>Enroll in <strong>{lawPath}</strong></li>
        <li>Clear the <strong>{state} Judicial Services Examination</strong></li>
        <li>Become a <strong>Civil Judge / Magistrate</strong></li>
      </ul>

      <button
        onClick={() => navigate('/learn')}
        style={{
          marginTop: '30px',
          padding: '12px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Learn Courtroom Roles
      </button>
    </div>
  );
}

export default Roadmap;
