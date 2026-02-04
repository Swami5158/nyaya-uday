import { useNavigate } from 'react-router-dom';

function Simulation() {
  const navigate = useNavigate();

  const handleDecision = (decision) => {
    localStorage.setItem('judgeDecision', decision);
    navigate('/score');
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Junior Judge Simulation</h2>

      <p style={{ marginTop: '20px' }}>
        <strong>Case:</strong> Mobile Phone Theft
      </p>

      <p>
        Ramesh claims Suresh stole his mobile phone.  
        Suresh says the phone was given to him.  
        There are no witnesses.  
        The phone was found with Suresh.
      </p>

      <h4 style={{ marginTop: '30px' }}>
        What should a judge do?
      </h4>

      <button onClick={() => handleDecision('Convict')} style={btnStyle}>
        Convict Suresh
      </button>

      <button onClick={() => handleDecision('Acquit')} style={btnStyle}>
        Acquit Suresh
      </button>

      <button onClick={() => handleDecision('More Evidence')} style={btnStyle}>
        Ask for More Evidence
      </button>
    </div>
  );
}

const btnStyle = {
  display: 'block',
  margin: '15px 0',
  padding: '12px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default Simulation;
