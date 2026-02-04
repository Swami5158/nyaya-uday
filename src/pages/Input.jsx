import { useNavigate } from 'react-router-dom';

function Input() {
  const navigate = useNavigate();

  const handleSelect = (level) => {
    localStorage.setItem('educationLevel', level);
    navigate('/roadmap');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Select Your Current Education Level</h2>

      <div style={{ marginTop: '30px' }}>
        <button onClick={() => handleSelect('10th')} style={btnStyle}>
          Class 10
        </button>

        <button onClick={() => handleSelect('12th')} style={btnStyle}>
          Class 12
        </button>

        <button onClick={() => handleSelect('Graduate')} style={btnStyle}>
          Graduate
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  display: 'block',
  margin: '15px auto',
  padding: '12px',
  width: '200px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default Input;
