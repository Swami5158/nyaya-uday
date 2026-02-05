import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { simulationCases } from '../data/cases';
import { db, auth } from '../firebase';
// ADDED: increment and other firestore tools
import { doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore'; 

function Simulation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userScore, setUserScore] = useState({ legal: 0, justice: 0, reasoning: 0, bias: 0 });
  
  // ADDED: Missing caseHistory state to prevent the "Blank Screen" crash
  const [caseHistory, setCaseHistory] = useState([]);

  const mode = location.state?.mode || 'beginner';
  const filteredCases = simulationCases.filter(c => 
    mode === 'beginner' ? c.difficulty === 'Beginner' : true
  );

  const currentCase = filteredCases[currentCaseIndex];

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    
    const newScore = {
      legal: userScore.legal + (option.scores?.legal || 0),
      justice: userScore.justice + (option.scores?.justice || 0),
      reasoning: userScore.reasoning + (option.scores?.reasoning || 0),
      bias: userScore.bias + (option.scores?.bias || 0)
    };
    setUserScore(newScore);

    // Save to local history state so handleNextCase can use it later
    setCaseHistory(prev => [...prev, {
      caseId: currentCase.id,
      decision: option.text,
      scores: option.scores
    }]);

    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          "simulationStats.totalSolved": increment(1),
          "simulationStats.lastScores": newScore
        });
      } catch (e) {
        console.error("Firebase update failed:", e);
      }
    }

    setShowExplanation(true);
  };

  const handleNextCase = async () => {
    // FIX: Use filteredCases.length to stay consistent with the mode
    if (currentCaseIndex < filteredCases.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      const user = auth.currentUser;
      
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            "simulationStats.lastScores": userScore,
            "simulationStats.lastUpdated": serverTimestamp()
          });
        } catch (error) {
          console.error("Error saving to Firebase:", error);
        }
      }

      // Save to localStorage for the Score.jsx component to read
      localStorage.setItem('userScore', JSON.stringify(userScore));
      localStorage.setItem('caseHistory', JSON.stringify(caseHistory));
      localStorage.setItem('totalCases', filteredCases.length.toString());

      navigate('/score');
    }
  };

  if (!currentCase) return <div style={styles.container}>No cases found for this mode.</div>;

  return (
    <div style={styles.container}>
      {/* ... keep your existing JSX return the same ... */}
      <div style={styles.progressHeader}>
        <span>Mode: {mode.toUpperCase()} | Case {currentCaseIndex + 1} of {filteredCases.length}</span>
      </div>

      <div style={styles.caseCard}>
        <h2 style={styles.title}>{currentCase.title}</h2>
        <p style={styles.facts}>{currentCase.facts}</p>
        
        <div style={styles.evidenceBox}>
          <strong>Available Evidence:</strong>
          <ul style={{marginTop: '10px'}}>
            {currentCase.evidence.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        {!showExplanation ? (
          <div style={styles.optionsGrid}>
            {currentCase.questions[0].options.map((option) => (
              <button key={option.id} onClick={() => handleOptionSelect(option)} style={styles.optionBtn}>
                {option.text}
              </button>
            ))}
          </div>
        ) : (
          <div style={styles.explanationBox}>
            <h4 style={{color: '#27ae60'}}>Decision Analysis</h4>
            <p style={{margin: '10px 0'}}>{currentCase.explanation || "Your decision has been recorded."}</p>
            <button onClick={handleNextCase} style={styles.nextBtn}>
              {currentCaseIndex < filteredCases.length - 1 ? "Next Case →" : "Finish & View Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#F7F9FB' },
  progressHeader: { marginBottom: '20px', color: '#666', fontWeight: 'bold', textAlign: 'center' },
  caseCard: { backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  title: { color: '#0B3C5D', marginBottom: '15px' },
  facts: { fontSize: '18px', lineHeight: '1.6', color: '#333', marginBottom: '20px' },
  evidenceBox: { backgroundColor: '#f0f4f8', padding: '20px', borderRadius: '10px', marginBottom: '25px', borderLeft: '5px solid #0B3C5D' },
  optionsGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  optionBtn: { padding: '18px', textAlign: 'left', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#fff', fontSize: '16px', transition: '0.2s' },
  explanationBox: { marginTop: '20px', padding: '20px', borderRadius: '10px', backgroundColor: '#fafffa', border: '1px solid #2ecc71' },
  nextBtn: { marginTop: '20px', padding: '12px 30px', backgroundColor: '#F4A261', color: '#0B3C5D', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Simulation;