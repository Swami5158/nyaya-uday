import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { simulationCases, difficultyLevels } from '../data/cases';

function Score() {
  const navigate = useNavigate();
  const [scoreData, setScoreData] = useState(null);
  const [caseHistory, setCaseHistory] = useState([]);
  const [totalCases, setTotalCases] = useState(0);
  const [badges, setBadges] = useState([]);
  const [judgeLevel, setJudgeLevel] = useState('');

  // Update this section in your Score.jsx
useEffect(() => {
  const fetchScore = async () => {
    // 1. Try LocalStorage first (for immediate speed)
    const savedScore = localStorage.getItem('userScore');
    const savedHistory = localStorage.getItem('caseHistory');
    
    if (savedScore) {
      const parsedScore = JSON.parse(savedScore);
      setScoreData(parsedScore);
      setCaseHistory(savedHistory ? JSON.parse(savedHistory) : []);
      
      const total = Object.values(parsedScore).reduce((a, b) => a + b, 0);
      setBadges(calculateBadges(parsedScore));
      setJudgeLevel(determineJudgeLevel(total));
      setLoading(false);
      return; // Exit if we found local data
    }

    // 2. Fallback: If LocalStorage is empty, fetch from Firebase
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.simulationStats?.lastScores) {
            const fbScore = data.simulationStats.lastScores;
            setScoreData(fbScore);
            
            const total = Object.values(fbScore).reduce((a, b) => a + b, 0);
            setBadges(calculateBadges(fbScore));
            setJudgeLevel(determineJudgeLevel(total));
          }
        }
      } catch (error) {
        console.error("Error fetching from Firebase:", error);
      }
    }
    setLoading(false);
  };

  fetchScore();
}, []);

  const calculateBadges = (scores) => {
    const badgesEarned = [];

    // Legal Eagle Badge
    if (scores.legal >= 25) {
      badgesEarned.push({
        name: "Legal Eagle",
        icon: "⚖️",
        description: "Master of legal principles"
      });
    }

    // Justice Warrior Badge
    if (scores.justice >= 25) {
      badgesEarned.push({
        name: "Justice Warrior",
        icon: "🛡️",
        description: "Champion of fairness and equity"
      });
    }

    // Logical Thinker Badge
    if (scores.reasoning >= 25) {
      badgesEarned.push({
        name: "Logical Thinker",
        icon: "🧠",
        description: "Master of clear reasoning"
      });
    }

    // Impartial Judge Badge
    if (scores.bias >= 25) {
      badgesEarned.push({
        name: "Impartial Judge",
        icon: "⚖️",
        description: "Completely unbiased decisions"
      });
    }

    // All-Rounder Badge
    if (scores.legal >= 20 && scores.justice >= 20 && scores.reasoning >= 20 && scores.bias >= 20) {
      badgesEarned.push({
        name: "Judicial All-Rounder",
        icon: "🏆",
        description: "Excellent in all judicial qualities"
      });
    }

    // Quick Thinker Badge
    if (caseHistory.length >= 3) {
      badgesEarned.push({
        name: "Quick Thinker",
        icon: "⚡",
        description: "Completed multiple cases"
      });
    }

    return badgesEarned;
  };

  const determineJudgeLevel = (totalScore) => {
    const levels = [
      { min: 0, max: 50, name: "Legal Intern", description: "Starting your journey" },
      { min: 51, max: 100, name: "Civil Judge (Junior Division)", description: "Understanding basics" },
      { min: 101, max: 150, name: "Additional District Judge", description: "Intermediate skills" },
      { min: 151, max: 200, name: "District & Sessions Judge", description: "Advanced judicial thinking" },
      { min: 201, max: 1000, name: "High Court Judge", description: "Master of judicial wisdom" }
    ];

    const level = levels.find(l => totalScore >= l.min && totalScore <= l.max);
    return level || levels[0];
  };

  const handleRestart = () => {
    navigate('/simulation');
  };

  const handleHome = () => {
    navigate('/');
  };

  if (!scoreData) {
    return (
      <div style={styles.container}>
        <h2>No Score Data Found</h2>
        <p>Complete a simulation first to see your score!</p>
        <button onClick={() => navigate('/simulation')} style={styles.button}>
          Start Simulation
        </button>
      </div>
    );
  }

  const totalScore = Object.values(scoreData).reduce((a, b) => a + b, 0);
  const maxPossibleScore = totalCases * 40; // Each case max 10 per category * 4 categories
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  return (
    <div style={styles.container}>
      {/* Celebration Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🎉 Judicial Aptitude Report</h1>
        <p style={styles.subtitle}>Your journey as a virtual judge</p>
      </div>

      {/* Score Summary Card */}
      <div style={styles.scoreCard}>
        <div style={styles.scoreCircle}>
          <div style={styles.scoreNumber}>{totalScore}</div>
          <div style={styles.scoreLabel}>Total Score</div>
          <div style={styles.scorePercentage}>{percentage}%</div>
        </div>
        
        <div style={styles.scoreDetails}>
          <h3>🏅 {judgeLevel.name}</h3>
          <p>{judgeLevel.description}</p>
          
          <div style={styles.scoreGrid}>
            <div style={styles.scoreItem}>
              <span>Legal Accuracy</span>
              <span style={styles.scoreValue}>{scoreData.legal}/40</span>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${(scoreData.legal/40)*100}%`}}></div>
              </div>
            </div>
            <div style={styles.scoreItem}>
              <span>Justice Quotient</span>
              <span style={styles.scoreValue}>{scoreData.justice}/40</span>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${(scoreData.justice/40)*100}%`}}></div>
              </div>
            </div>
            <div style={styles.scoreItem}>
              <span>Reasoning Clarity</span>
              <span style={styles.scoreValue}>{scoreData.reasoning}/40</span>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${(scoreData.reasoning/40)*100}%`}}></div>
              </div>
            </div>
            <div style={styles.scoreItem}>
              <span>Bias Avoidance</span>
              <span style={styles.scoreValue}>{scoreData.bias}/40</span>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${(scoreData.bias/40)*100}%`}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div style={styles.section}>
        <h3>🏆 Earned Badges</h3>
        {badges.length > 0 ? (
          <div style={styles.badgesContainer}>
            {badges.map((badge, index) => (
              <div key={index} style={styles.badge}>
                <div style={styles.badgeIcon}>{badge.icon}</div>
                <div style={styles.badgeContent}>
                  <h4>{badge.name}</h4>
                  <p>{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Complete more cases to earn badges!</p>
        )}
      </div>

      {/* Performance Analysis */}
      <div style={styles.section}>
        <h3>📊 Performance Analysis</h3>
        <div style={styles.analysisGrid}>
          <div style={styles.analysisCard}>
            <h4>Your Strongest Area</h4>
            <p style={styles.analysisValue}>
              {Object.entries(scoreData).sort((a, b) => b[1] - a[1])[0][0].replace(/([A-Z])/g, ' $1')}
            </p>
            <p>This shows your natural judicial strength</p>
          </div>
          <div style={styles.analysisCard}>
            <h4>Area to Improve</h4>
            <p style={styles.analysisValue}>
              {Object.entries(scoreData).sort((a, b) => a[1] - b[1])[0][0].replace(/([A-Z])/g, ' $1')}
            </p>
            <p>Focus on this for better judicial balance</p>
          </div>
          <div style={styles.analysisCard}>
            <h4>Cases Completed</h4>
            <p style={styles.analysisValue}>{caseHistory.length}</p>
            <p>Your practical experience level</p>
          </div>
        </div>
      </div>

      {/* Case History */}
      <div style={styles.section}>
        <h3>📝 Case History</h3>
        <div style={styles.caseHistory}>
          {caseHistory.map((item, index) => {
            const caseData = simulationCases.find(c => c.id === item.caseId);
            return (
              <div key={index} style={styles.caseItem}>
                <div style={styles.caseHeader}>
                  <span style={styles.caseNumber}>Case #{index + 1}</span>
                  <span style={styles.caseTitle}>{caseData?.title || 'Unknown Case'}</span>
                </div>
                <div style={styles.caseDetails}>
                  <p><strong>Your Decision:</strong> {item.decision}</p>
                  <div style={styles.caseScores}>
                    <span>Legal: +{item.scores.legal}</span>
                    <span>Justice: +{item.scores.justice}</span>
                    <span>Reasoning: +{item.scores.reasoning}</span>
                    <span>Bias: +{item.scores.bias}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps */}
      <div style={styles.section}>
        <h3>🚀 Your Judicial Journey Ahead</h3>
        <div style={styles.journeyPath}>
          {difficultyLevels.map((level, index) => (
            <div 
              key={level.level} 
              style={{
                ...styles.journeyStep,
                ...(caseHistory.length >= level.casesNeeded ? styles.completedStep : styles.pendingStep)
              }}
            >
              <div style={styles.stepIcon}>
                {caseHistory.length >= level.casesNeeded ? '✅' : '⏳'}
              </div>
              <div style={styles.stepContent}>
                <h4>{level.name}</h4>
                <p>Complete {level.casesNeeded} cases</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button onClick={handleRestart} style={styles.primaryButton}>
          🔄 Play Again
        </button>
        <button onClick={handleHome} style={styles.secondaryButton}>
          🏠 Back to Home
        </button>
        <button 
          onClick={() => alert('Share your score with friends!')}
          style={styles.shareButton}
        >
          📤 Share Score
        </button>
      </div>

      {/* Motivational Quote */}
      <div style={styles.quote}>
        <p style={styles.quoteText}>
          "The judicial system is not just about law, it's about justice. 
          Your ability to balance both determines your judicial wisdom."
        </p>
        <p style={styles.quoteAuthor}>— Nyaya-Uday Judicial Wisdom</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f7fa'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '30px',
    backgroundColor: '#2c3e50',
    color: 'white',
    borderRadius: '15px'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    color: '#f1c40f'
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.9
  },
  scoreCard: {
    display: 'flex',
    flexDirection: ['column', 'row'].includes('column') ? 'column' : 'row',
    alignItems: 'center',
    gap: '40px',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    marginBottom: '40px'
  },
  scoreCircle: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    border: '10px solid #2980b9'
  },
  scoreNumber: {
    fontSize: '3.5rem',
    fontWeight: 'bold'
  },
  scoreLabel: {
    fontSize: '1rem',
    opacity: 0.9
  },
  scorePercentage: {
    fontSize: '1.2rem',
    backgroundColor: '#f1c40f',
    color: '#2c3e50',
    padding: '5px 15px',
    borderRadius: '20px',
    marginTop: '10px',
    fontWeight: 'bold'
  },
  scoreDetails: {
    flex: 1
  },
  scoreGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '20px'
  },
  scoreItem: {
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  scoreValue: {
    float: 'right',
    fontWeight: 'bold',
    color: '#27ae60'
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    marginTop: '10px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27ae60',
    transition: 'width 0.3s ease'
  },
  section: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  badgesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    border: '2px solid #e0e0e0'
  },
  badgeIcon: {
    fontSize: '2.5rem'
  },
  badgeContent: {
    flex: 1
  },
  analysisGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  analysisCard: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center'
  },
  analysisValue: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '10px 0'
  },
  caseHistory: {
    maxHeight: '400px',
    overflowY: 'auto',
    marginTop: '20px'
  },
  caseItem: {
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '5px solid #3498db'
  },
  caseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  caseNumber: {
    fontWeight: 'bold',
    color: '#7f8c8d'
  },
  caseTitle: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  caseDetails: {
    fontSize: '14px'
  },
  caseScores: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
    fontSize: '12px',
    color: '#666'
  },
  journeyPath: {
    marginTop: '20px'
  },
  journeyStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px'
  },
  completedStep: {
    backgroundColor: '#d5f4e6',
    borderLeft: '5px solid #2ecc71'
  },
  pendingStep: {
    backgroundColor: '#f8f9fa',
    borderLeft: '5px solid #bdc3c7'
  },
  stepIcon: {
    fontSize: '1.5rem'
  },
  stepContent: {
    flex: 1
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '40px',
    flexWrap: 'wrap'
  },
  primaryButton: {
    padding: '15px 30px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  secondaryButton: {
    padding: '15px 30px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  shareButton: {
    padding: '15px 30px',
    backgroundColor: '#9b59b6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  quote: {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: '#2c3e50',
    color: 'white',
    borderRadius: '10px',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  quoteText: {
    fontSize: '1.2rem',
    lineHeight: '1.6'
  },
  quoteAuthor: {
    marginTop: '10px',
    opacity: 0.8
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px'
  }
};

export default Score;