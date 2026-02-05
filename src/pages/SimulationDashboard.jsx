import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SimulationDashboard = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    totalCases: 0,
    averageScore: 0,
    bestCategory: 'Not determined',
    judicialLevel: 'Legal Intern',
    badges: 0,
    streak: 0
  });

  const [recommendedMode, setRecommendedMode] = useState('beginner');
  const [dailyChallenge, setDailyChallenge] = useState(null);

  // Fetch user stats from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('caseHistory');
    const savedScore = localStorage.getItem('userScore');
    const savedDilemmas = localStorage.getItem('ethicalDilemmasCompleted');

    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setUserStats(prev => ({
        ...prev,
        totalCases: history.length,
        averageScore: history.length > 0
          ? Math.round(history.reduce((sum, caseItem) =>
            sum + Object.values(caseItem.scores).reduce((a, b) => a + b, 0), 0) / history.length)
          : 0
      }));
    }

    if (savedDilemmas) {
      const dilemmas = JSON.parse(savedDilemmas);
      setUserStats(prev => ({
        ...prev,
        badges: dilemmas.length
      }));
    }

    // Set daily challenge
    const challenges = [
      {
        id: 1,
        title: "Property Dispute",
        description: "Neighbor boundary conflict",
        category: "Civil",
        difficulty: "Medium",
        reward: "Boundary Expert Badge",
        time: "15 min"
      },
      {
        id: 2,
        title: "Cyber Crime Case",
        description: "Online fraud investigation",
        category: "Criminal",
        difficulty: "Hard",
        reward: "Cyber Judge Badge",
        time: "20 min"
      },
      {
        id: 3,
        title: "Consumer Rights",
        description: "Defective product complaint",
        category: "Consumer",
        difficulty: "Easy",
        reward: "Consumer Champion",
        time: "10 min"
      }
    ];

    const today = new Date().getDate();
    setDailyChallenge(challenges[today % challenges.length]);
  }, []);

  const simulationModes = [
    {
      id: 'beginner',
      title: '👶 Beginner Cases',
      description: 'Start your judicial journey with basic cases',
      icon: '📚',
      color: '#3498db',
      features: [
        'Simple fact patterns',
        'Clear legal principles',
        'Step-by-step guidance',
        'Immediate feedback'
      ],
      recommendedFor: 'First-time users, Students new to law',
      casesCount: 5,
      timeEstimate: '10-15 minutes',
      route: '/simulation/beginner'
    },
    {
      id: 'intermediate',
      title: '⚖️ Intermediate Challenges',
      description: 'Complex cases requiring deeper analysis',
      icon: '🧠',
      color: '#2ecc71',
      features: [
        'Multiple legal issues',
        'Conflicting evidence',
        'Ethical considerations',
        'Precedent analysis'
      ],
      recommendedFor: 'Law students, Aspiring judges',
      casesCount: 8,
      timeEstimate: '20-30 minutes',
      route: '/simulation/intermediate'
    },
    {
      id: 'ethical',
      title: '🎭 Ethical Dilemmas',
      description: 'Real Supreme Court cases as moral puzzles',
      icon: '⚖️',
      color: '#9b59b6',
      features: [
        'Actual SC cases simplified',
        'Moral reasoning scoring',
        'Historic judgments',
        'Constitutional principles'
      ],
      recommendedFor: 'Advanced thinkers, Ethics enthusiasts',
      casesCount: 3,
      timeEstimate: '15-25 minutes',
      route: '/simulation/ethical'
    },
    {
      id: 'speed',
      title: '⏱️ Speed Judgment',
      description: 'Quick decisions under time pressure',
      icon: '⚡',
      color: '#e74c3c',
      features: [
        'Time-limited decisions',
        'Rapid fact analysis',
        'Pressure management',
        'Quick reasoning'
      ],
      recommendedFor: 'Improving decision speed',
      casesCount: 10,
      timeEstimate: '5-10 minutes',
      route: '/simulation/speed'
    },
    {
      id: 'specialized',
      title: '🎯 Specialized Courts',
      description: 'Focus on specific areas of law',
      icon: '🏛️',
      color: '#f39c12',
      features: [
        'Family Court cases',
        'Consumer Court disputes',
        'Labor Court matters',
        'Cyber Law issues'
      ],
      recommendedFor: 'Specialization seekers',
      casesCount: 6,
      timeEstimate: '25-35 minutes',
      route: '/simulation/specialized'
    },
    {
      id: 'multiplayer',
      title: '👥 Virtual Courtroom',
      description: 'Compete with other aspiring judges',
      icon: '👨‍⚖️',
      color: '#1abc9c',
      features: [
        'Live case discussions',
        'Peer judgment comparison',
        'Collective reasoning',
        'Leaderboard ranking'
      ],
      recommendedFor: 'Competitive learners',
      casesCount: 'Live',
      timeEstimate: 'Varies',
      route: '/virtual-courtroom'
    }
  ];

  const userAchievements = [
    { name: 'First Case', achieved: userStats.totalCases > 0, icon: '🥇' },
    { name: 'Legal Eagle', achieved: userStats.averageScore > 70, icon: '🦅' },
    { name: 'Ethical Master', achieved: userStats.badges >= 2, icon: '🎭' },
    { name: 'Consistent Judge', achieved: userStats.streak >= 3, icon: '🔥' },
    { name: 'Quick Thinker', achieved: false, icon: '⚡' },
    { name: 'People\'s Judge', achieved: false, icon: '👑' }
  ];

  const handleModeSelect = (modeId) => {
    // Instead of navigating to /simulation/beginner (which doesn't exist),
    // we go to /simulation/play and pass the mode as state or a query
    navigate('/simulation/play', { state: { mode: modeId } });
  };

  // Also fix the continue button
  const continueProgress = () => {
    navigate('/simulation/play');
  };

  // Also fix the daily challenge button
  const startDailyChallenge = () => {
    navigate('/simulation/play', { state: { isDaily: true } });
  };

  return (
    <div style={styles.container}>
      {/* Header with User Stats */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.mainTitle}>⚖️ Judicial Simulation Hub</h1>
          <p style={styles.subtitle}>Choose your path to becoming a better judge</p>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.userStats}>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{userStats.totalCases}</span>
              <span style={styles.statLabel}>Cases</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{userStats.averageScore}</span>
              <span style={styles.statLabel}>Avg Score</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{userStats.badges}</span>
              <span style={styles.statLabel}>Badges</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{userStats.streak}🔥</span>
              <span style={styles.statLabel}>Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Challenge Card */}
      {dailyChallenge && (
        <div style={styles.dailyChallengeCard}>
          <div style={styles.challengeHeader}>
            <div>
              <h3 style={styles.challengeTitle}>🎯 Today's Special Challenge</h3>
              <p style={styles.challengeDesc}>{dailyChallenge.description}</p>
            </div>
            <div style={styles.challengeBadge}>
              <span style={styles.badgeText}>DAILY</span>
            </div>
          </div>
          <div style={styles.challengeDetails}>
            <div style={styles.challengeInfo}>
              <span style={styles.infoItem}>Category: {dailyChallenge.category}</span>
              <span style={styles.infoItem}>Difficulty: {dailyChallenge.difficulty}</span>
              <span style={styles.infoItem}>Time: {dailyChallenge.time}</span>
              <span style={styles.infoItem}>Reward: {dailyChallenge.reward}</span>
            </div>
            <button
              onClick={startDailyChallenge}
              style={styles.challengeButton}
            >
              Start Challenge
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <button
          onClick={continueProgress}
          style={styles.primaryAction}
        >
          ▶️ Continue Learning
        </button>
        <button
          onClick={() => navigate('/leaderboard')}
          style={styles.secondaryAction}
        >
          🏆 View Leaderboard
        </button>
        <button
          onClick={() => navigate('/score')}
          style={styles.secondaryAction}
        >
          📊 My Performance
        </button>
      </div>

      {/* Recommended Mode */}
      <div style={styles.recommendedSection}>
        <h3 style={styles.sectionTitle}>
          <span style={styles.recommendedBadge}>RECOMMENDED FOR YOU</span>
          Based on your learning pattern
        </h3>
        {simulationModes
          .filter(mode => mode.id === recommendedMode)
          .map(mode => (
            <div key={mode.id} style={styles.recommendedCard}>
              <div style={styles.recommendedHeader}>
                <div style={{ ...styles.modeIcon, backgroundColor: mode.color }}>
                  {mode.icon}
                </div>
                <div style={styles.recommendedInfo}>
                  <h4 style={styles.recommendedTitle}>{mode.title}</h4>
                  <p style={styles.recommendedDesc}>{mode.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleModeSelect(mode.id)}
                style={{ ...styles.recommendedButton, backgroundColor: mode.color }}
              >
                Start This Mode
              </button>
            </div>
          ))
        }
      </div>

      {/* All Simulation Modes Grid */}
      <div style={styles.modesSection}>
        <h3 style={styles.sectionTitle}>Choose Your Simulation Mode</h3>
        <div style={styles.modesGrid}>
          {simulationModes.map(mode => (
            <div
              key={mode.id}
              style={{
                ...styles.modeCard,
                borderLeft: `5px solid ${mode.color}`
              }}
              onClick={() => handleModeSelect(mode.id)}
            >
              <div style={styles.modeHeader}>
                <div style={{ ...styles.modeIconSmall, backgroundColor: mode.color }}>
                  {mode.icon}
                </div>
                <h4 style={styles.modeTitle}>{mode.title}</h4>
              </div>

              <p style={styles.modeDescription}>{mode.description}</p>

              <div style={styles.modeFeatures}>
                {mode.features.map((feature, index) => (
                  <div key={index} style={styles.featureItem}>
                    <span style={styles.featureIcon}>✓</span>
                    <span style={styles.featureText}>{feature}</span>
                  </div>
                ))}
              </div>

              <div style={styles.modeFooter}>
                <div style={styles.modeStats}>
                  <span style={styles.stat}>📊 {mode.casesCount} cases</span>
                  <span style={styles.stat}>⏱️ {mode.timeEstimate}</span>
                </div>
                <div style={styles.recommendedFor}>
                  <span style={styles.recommendedLabel}>Best for:</span>
                  <span>{mode.recommendedFor}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModeSelect(mode.id);
                }}
                style={{ ...styles.modeButton, backgroundColor: mode.color }}
              >
                Start Simulation
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div style={styles.achievementsSection}>
        <h3 style={styles.sectionTitle}>Your Judicial Achievements</h3>
        <div style={styles.achievementsGrid}>
          {userAchievements.map((achievement, index) => (
            <div
              key={index}
              style={{
                ...styles.achievementCard,
                ...(achievement.achieved ? styles.achievementUnlocked : {})
              }}
            >
              <div style={styles.achievementIcon}>
                {achievement.icon}
              </div>
              <div style={styles.achievementInfo}>
                <h5 style={styles.achievementName}>{achievement.name}</h5>
                <div style={styles.achievementStatus}>
                  {achievement.achieved ? (
                    <span style={styles.unlocked}>✅ Unlocked</span>
                  ) : (
                    <span style={styles.locked}>🔒 Locked</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div style={styles.learningPath}>
        <h3 style={styles.sectionTitle}>Your Judicial Learning Path</h3>
        <div style={styles.pathSteps}>
          <div style={styles.pathStep}>
            <div style={styles.stepNumber}>1</div>
            <div style={styles.stepContent}>
              <h5>Beginner Cases</h5>
              <p>Master basic legal reasoning</p>
              {userStats.totalCases >= 3 && (
                <span style={styles.completedBadge}>Completed</span>
              )}
            </div>
          </div>
          <div style={styles.pathConnector}>→</div>
          <div style={styles.pathStep}>
            <div style={styles.stepNumber}>2</div>
            <div style={styles.stepContent}>
              <h5>Intermediate Challenges</h5>
              <p>Handle complex evidence</p>
              {userStats.averageScore >= 70 && (
                <span style={styles.completedBadge}>Completed</span>
              )}
            </div>
          </div>
          <div style={styles.pathConnector}>→</div>
          <div style={styles.pathStep}>
            <div style={styles.stepNumber}>3</div>
            <div style={styles.stepContent}>
              <h5>Ethical Dilemmas</h5>
              <p>Solve moral-legal conflicts</p>
              {userStats.badges >= 2 && (
                <span style={styles.completedBadge}>Completed</span>
              )}
            </div>
          </div>
          <div style={styles.pathConnector}>→</div>
          <div style={styles.pathStep}>
            <div style={styles.stepNumber}>4</div>
            <div style={styles.stepContent}>
              <h5>Master Judge</h5>
              <p>Ready for real judicial thinking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips & Guidance */}
      <div style={styles.tipsSection}>
        <h3 style={styles.sectionTitle}>💡 Tips for Effective Learning</h3>
        <div style={styles.tipsGrid}>
          <div style={styles.tipCard}>
            <div style={styles.tipIcon}>🎯</div>
            <h5>Start with Basics</h5>
            <p>Complete beginner cases before moving to complex ones</p>
          </div>
          <div style={styles.tipCard}>
            <div style={styles.tipIcon}>📝</div>
            <h5>Write Your Reasoning</h5>
            <p>Always explain why you chose a particular judgment</p>
          </div>
          <div style={styles.tipCard}>
            <div style={styles.tipIcon}>🔄</div>
            <h5>Review Mistakes</h5>
            <p>Analyze where your reasoning differed from ideal judgment</p>
          </div>
          <div style={styles.tipCard}>
            <div style={styles.tipIcon}>👥</div>
            <h5>Discuss with Peers</h5>
            <p>Join discussions to understand different perspectives</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f7fa'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  headerLeft: {
    flex: 1
  },
  mainTitle: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '5px'
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '1.1rem'
  },
  headerRight: {
    textAlign: 'right'
  },
  userStats: {
    display: 'flex',
    gap: '20px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  statItem: {
    textAlign: 'center'
  },
  statValue: {
    display: 'block',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#3498db'
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#7f8c8d'
  },
  dailyChallengeCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
    border: '2px solid #f1c40f',
    background: 'linear-gradient(135deg, #fff9e6 0%, #ffffff 100%)'
  },
  challengeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  challengeTitle: {
    color: '#2c3e50',
    marginBottom: '10px'
  },
  challengeDesc: {
    color: '#7f8c8d'
  },
  challengeBadge: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '15px',
    fontWeight: 'bold'
  },
  badgeText: {
    fontSize: '0.8rem'
  },
  challengeDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px'
  },
  challengeInfo: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  infoItem: {
    backgroundColor: '#f8f9fa',
    padding: '8px 15px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    color: '#2c3e50'
  },
  challengeButton: {
    padding: '12px 30px',
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  quickActions: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  primaryAction: {
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
    gap: '10px',
    flex: 1,
    minWidth: '200px'
  },
  secondaryAction: {
    padding: '15px 25px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
    minWidth: '200px'
  },
  recommendedSection: {
    marginBottom: '40px'
  },
  sectionTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  recommendedBadge: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  recommendedCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
  },
  recommendedHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flex: 1
  },
  modeIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem'
  },
  recommendedInfo: {
    flex: 1
  },
  recommendedTitle: {
    margin: '0 0 10px 0',
    color: '#2c3e50'
  },
  recommendedDesc: {
    margin: 0,
    color: '#7f8c8d'
  },
  recommendedButton: {
    padding: '12px 30px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  modesSection: {
    marginBottom: '40px'
  },
  modesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px'
  },
  modeCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    }
  },
  modeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px'
  },
  modeIconSmall: {
    width: '50px',
    height: '50px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: 'white'
  },
  modeTitle: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '1.3rem'
  },
  modeDescription: {
    color: '#7f8c8d',
    marginBottom: '20px',
    lineHeight: '1.6'
  },
  modeFeatures: {
    marginBottom: '20px'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
    fontSize: '0.9rem'
  },
  featureIcon: {
    color: '#2ecc71',
    fontWeight: 'bold'
  },
  featureText: {
    color: '#555'
  },
  modeFooter: {
    marginBottom: '20px'
  },
  modeStats: {
    display: 'flex',
    gap: '15px',
    marginBottom: '10px',
    fontSize: '0.9rem',
    color: '#7f8c8d'
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  recommendedFor: {
    fontSize: '0.9rem',
    color: '#7f8c8d'
  },
  recommendedLabel: {
    fontWeight: 'bold',
    marginRight: '5px'
  },
  modeButton: {
    width: '100%',
    padding: '12px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'opacity 0.3s'
  },
  achievementsSection: {
    marginBottom: '40px'
  },
  achievementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '15px'
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    opacity: 0.6
  },
  achievementUnlocked: {
    opacity: 1,
    border: '2px solid #2ecc71'
  },
  achievementIcon: {
    fontSize: '2rem'
  },
  achievementInfo: {
    flex: 1
  },
  achievementName: {
    margin: '0 0 5px 0',
    color: '#2c3e50'
  },
  achievementStatus: {
    fontSize: '0.8rem'
  },
  unlocked: {
    color: '#27ae60',
    fontWeight: 'bold'
  },
  locked: {
    color: '#7f8c8d'
  },
  learningPath: {
    marginBottom: '40px'
  },
  pathSteps: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px'
  },
  pathStep: {
    flex: 1,
    minWidth: '150px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexShrink: 0
  },
  stepContent: {
    flex: 1
  },
  completedBadge: {
    backgroundColor: '#d5f4e6',
    color: '#27ae60',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    marginTop: '5px',
    display: 'inline-block'
  },
  pathConnector: {
    color: '#bdc3c7',
    fontSize: '1.5rem',
    flexShrink: 0
  },
  tipsSection: {
    marginBottom: '30px'
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  tipCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  tipIcon: {
    fontSize: '2.5rem',
    marginBottom: '15px'
  }

};

// // Add hover effect for mode cards
// const styleSheet = document.styleSheets[0];
// styleSheet.insertRule(`
//   .mode-card:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 10px 25px rgba(0,0,0,0.1);
//   }
// `, styleSheet.cssRules.length);

export default SimulationDashboard;
