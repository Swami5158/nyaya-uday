import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Input() {
  const navigate = useNavigate();
  const [education, setEducation] = useState('');
  const [state, setState] = useState('');

  const handleContinue = () => {
    if (!education || !state) {
      alert('Please select both education level and state');
      return;
    }

    localStorage.setItem('educationLevel', education);
    localStorage.setItem('userState', state);
    navigate('/roadmap');
  };

  return (
    <div style={styles.container}>
      <h2>Select Your Current Details</h2>

      {/* Education Selection */}
      <div style={{ marginTop: '25px' }}>
        <h4>Education Level</h4>

        <button
          style={education === '10th' ? styles.activeBtn : styles.btn}
          onClick={() => setEducation('10th')}
        >
          Class 10
        </button>

        <button
          style={education === '12th' ? styles.activeBtn : styles.btn}
          onClick={() => setEducation('12th')}
        >
          Class 12
        </button>

        <button
          style={education === 'Graduate' ? styles.activeBtn : styles.btn}
          onClick={() => setEducation('Graduate')}
        >
          Graduate
        </button>
      </div>

      {/* State Selection */}
      <div style={{ marginTop: '30px' }}>
        <h4>Select Your State</h4>

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Select State --</option>
          {indianStates.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Continue Button */}
      <button style={styles.continueBtn} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}

const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    minHeight: '100vh',
    backgroundColor: '#F7F9FB'
  },
  btn: {
    display: 'block',
    margin: '12px auto',
    padding: '12px',
    width: '220px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: '1px solid #0B3C5D',
    backgroundColor: '#fff',
    color: '#0B3C5D'
  },
  activeBtn: {
    display: 'block',
    margin: '12px auto',
    padding: '12px',
    width: '220px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#0B3C5D',
    color: '#fff'
  },
  select: {
    marginTop: '10px',
    padding: '10px',
    width: '240px',
    fontSize: '16px',
    borderRadius: '6px'
  },
  continueBtn: {
    marginTop: '35px',
    padding: '14px 30px',
    fontSize: '16px',
    backgroundColor: '#F4A261',
    color: '#0B3C5D',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

export default Input;
