import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

function Input() {
  const navigate = useNavigate();
  const [education, setEducation] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if data already exists
  useEffect(() => {
    const checkExistingData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists() && docSnap.data().userState) {
          navigate('/roadmap', { replace: true });
        }
      }
    };
    checkExistingData();
  }, [navigate]);

  const handleContinue = async () => {
    if (!education || !state) {
      alert('Please select both education level and state');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        
        await updateDoc(userRef, {
          educationLevel: education,
          userState: state,
          currentStep: education === 'Graduate' ? 2 : 1 
        });

        localStorage.setItem('educationLevel', education);
        localStorage.setItem('userState', state);
        
        navigate('/roadmap');
      } else {
        alert("Please login first!");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error saving details:", error);
      alert("Something went wrong while saving your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{color: '#0B3C5D'}}>Setup Your Journey</h2>
        <p style={{color: '#666'}}>Help us tailor the roadmap to your needs.</p>

        <div style={{ marginTop: '25px' }}>
          <h4 style={styles.label}>Education Level</h4>
          <div style={styles.btnGroup}>
            {['10th', '12th', 'Graduate'].map((level) => (
              <button
                key={level}
                style={education === level ? styles.activeBtn : styles.btn}
                onClick={() => setEducation(level)}
              >
                {level === 'Graduate' ? 'Law Graduate' : `Class ${level}`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h4 style={styles.label}>Select Your State</h4>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Choose State --</option>
            {indianStates.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button 
          style={loading ? styles.disabledBtn : styles.continueBtn} 
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Generate My Roadmap'}
        </button>
      </div>
    </div>
  );
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const styles = {
  container: {
    padding: '60px 20px',
    textAlign: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #F7F9FB 0%, #E0E7FF 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%'
  },
  label: { marginBottom: '15px', color: '#1C5D85', textAlign: 'left' },
  btnGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  btn: {
    padding: '12px', fontSize: '16px', cursor: 'pointer',
    borderRadius: '8px', border: '1px solid #0B3C5D',
    backgroundColor: '#fff', color: '#0B3C5D', transition: '0.3s'
  },
  activeBtn: {
    padding: '12px', fontSize: '16px', cursor: 'pointer',
    borderRadius: '8px', border: '2px solid #F4A261',
    backgroundColor: '#0B3C5D', color: '#fff', fontWeight: 'bold'
  },
  select: {
    marginTop: '10px', padding: '12px', width: '100%',
    fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc'
  },
  continueBtn: {
    marginTop: '35px', width: '100%', padding: '16px',
    fontSize: '16px', backgroundColor: '#F4A261', color: '#0B3C5D',
    border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '700'
  },
  disabledBtn: {
    marginTop: '35px', width: '100%', padding: '16px',
    fontSize: '16px', backgroundColor: '#ccc', color: '#666',
    border: 'none', borderRadius: '30px', cursor: 'not-allowed'
  }
};

export default Input;