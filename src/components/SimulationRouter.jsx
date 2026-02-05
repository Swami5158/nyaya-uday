// src/components/SimulationRouter.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Import all simulation components
import JudicialThinkingVisualizer from './JudicialThinkingVisualizer';
import EthicalDilemmaCase from './EthicalDilemmaCase';
import Leaderboard from './Leaderboard';
import VoiceAssistant from './VoiceAssistant';
import Simulation from '../pages/Simulation';
import { useOfflineStorage, useCaseProgress } from '../hooks/useOfflineStorage';
import { useBandwidth } from '../utils/lowBandwidth';
import { t, useTranslation } from '../utils/i18n';

const SimulationRouter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState('default');
  const [loading, setLoading] = useState(true);
  const [caseData, setCaseData] = useState(null);
  const [userProgress, setUserProgress] = useState(null);

  const { data: userProfile, save: saveProfile } = useOfflineStorage('USER_PROFILE');
  const { progress, saveProgress, getUserProgress } = useCaseProgress();
  const { status: bandwidthStatus, optimizations } = useBandwidth();
  const { t, language, changeLanguage } = useTranslation();

  // Get simulation mode from URL
  useEffect(() => {
    const urlMode = searchParams.get('mode');
    const caseId = searchParams.get('case');
    const type = searchParams.get('type');

    if (urlMode) {
      setMode(urlMode);
    } else if (caseId) {
      setMode('specific-case');
      loadSpecificCase(caseId);
    } else if (type === 'ethical') {
      setMode('ethical-dilemma');
    } else if (type === 'thinking') {
      setMode('judicial-thinking');
    } else {
      setMode('default');
    }

    // Load user progress
    const progressData = getUserProgress();
    setUserProgress(progressData);

    setLoading(false);
  }, [searchParams]);

  const loadSpecificCase = async (caseId) => {
    try {
      // Import case data based on ID
      const { simulationCases } = await import('../data/cases');
      const caseDetails = simulationCases.find(c => c.id === parseInt(caseId));

      if (caseDetails) {
        setCaseData(caseDetails);
      } else {
        // Fallback to first case
        setCaseData(simulationCases[0]);
      }
    } catch (error) {
      console.error('Error loading case:', error);
    }
  };

  const handleCaseComplete = (caseId, score, answers, timeSpent) => {
    // Save progress
    saveProgress(caseId, score, answers, timeSpent);

    // Award badge if conditions met
    if (score >= 80) {
      // Award badge logic
      console.log('High score! Potential badge earned.');
    }

    // Navigate to score or next case
    const nextCase = caseId + 1;
    const totalCases = 15; // Total cases in app

    if (nextCase <= totalCases) {
      navigate(`/simulation?case=${nextCase}`);
    } else {
      navigate('/score');
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    // Use path-based routing instead of query params
    navigate(`/simulation/${newMode}`);
  };

  const renderSimulationMode = () => {
    if (loading) {
      return (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>{t('common.loading')}</p>
        </div>
      );
    }

    switch (mode) {
      case 'default':
        return renderDefaultSimulation();

      case 'beginner':
        return renderBeginnerCases();

      case 'intermediate':
        return renderIntermediateCases();

      case 'ethical-dilemma':
        return <EthicalDilemmaCase />;

      case 'judicial-thinking':
        return (
          <JudicialThinkingVisualizer
            caseId={caseData?.id || 1}
            userDecision="Sample decision"
            correctDecision="Correct decision"
          />
        );

      case 'leaderboard':
        return <Leaderboard />;

      case 'voice-assistant':
        return <VoiceAssistant />;

      case 'specific-case':
        return caseData ? renderCase(caseData) : renderDefaultSimulation();

      default:
        return renderDefaultSimulation();
    }
  };

  const renderDefaultSimulation = () => {
    return (
      <div style={styles.defaultContainer}>
        <div style={styles.modeSelector}>
          <h3>{t('simulation.title')}</h3>
          <p>{t('simulation.subtitle')}</p>

          <div style={styles.modeGrid}>
            <button
              onClick={() => handleModeChange('beginner')}
              style={styles.modeCard}
            >
              <div style={styles.modeIcon}>📚</div>
              <h4>{t('Beginner Cases')}</h4>
              <p>Start with basic legal reasoning</p>
            </button>

            <button
              onClick={() => handleModeChange('intermediate')}
              style={styles.modeCard}
            >
              <div style={styles.modeIcon}>⚖️</div>
              <h4>{t('Intermediate Challenges')}</h4>
              <p>Complex cases requiring deeper analysis</p>
            </button>

            <button
              onClick={() => handleModeChange('ethical-dilemma')}
              style={styles.modeCard}
            >
              <div style={styles.modeIcon}>🎭</div>
              <h4>{t('Ethical Dilemmas')}</h4>
              <p>Real Supreme Court cases as moral puzzles</p>
            </button>

            <button
              onClick={() => handleModeChange('judicial-thinking')}
              style={styles.modeCard}
            >
              <div style={styles.modeIcon}>🧠</div>
              <h4>{t('Judicial Thinking')}</h4>
              <p>Learn how judges analyze cases</p>
            </button>

            <button
              onClick={() => handleModeChange('leaderboard')}
              style={styles.modeCard}
            >
              <div style={styles.modeIcon}>🏆</div>
              <h4>{t('Leaderboard')}</h4>
              <p>Compare with other aspiring judges</p>
            </button>

            <button
              onClick={() => handleModeChange('voice-assistant')}
              style={styles.modeCard}
            >
              <div style={styles.modeIcon}>🎤</div>
              <h4>{t('Voice Assistant')}</h4>
              <p>Ask questions in your language</p>
            </button>
          </div>
        </div>

        {/* User Progress */}
        {userProgress && (
          <div style={styles.progressSummary}>
            <h4>{t('Your Progress')}</h4>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${userProgress.percentage}%`
                }}
              ></div>
            </div>
            <p>{userProgress.completed} of {userProgress.total} cases completed</p>
            <p>{t('Current Level')}: {userProgress.currentLevel}</p>
          </div>
        )}

        {/* Bandwidth Status */}
        {bandwidthStatus.isLowBandwidth && (
          <div style={styles.bandwidthWarning}>
            <span>⚠️</span>
            <span>{t('Low bandwidth mode active')}. {t('Some features optimized for data saving')}.</span>
          </div>
        )}
      </div>
    );
  };

  const renderBeginnerCases = () => {
    return (
      <div style={styles.caseContainer}>
        {/* Render the restored Simulation component logic */}
        <Simulation />
      </div>
    );
  };

  const renderIntermediateCases = () => {
    return (
      <div style={styles.caseContainer}>
        <h3>{t('Intermediate Challenges')}</h3>
        <p>Complex cases with multiple legal issues</p>
        <button
          onClick={() => navigate('/simulation')}
          style={styles.backButton}
        >
          ← {t('Back to Simulations')}
        </button>
      </div>
    );
  };

  const renderCase = (caseDetails) => {
    return (
      <div style={styles.caseContainer}>
        <h3>{caseDetails.title}</h3>
        <p>Level: {caseDetails.difficulty}</p>
        {/* Render case details here */}
        <button
          onClick={() => navigate('/simulation')}
          style={styles.backButton}
        >
          ← {t('Back to Simulations')}
        </button>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Language Selector */}
      <div style={styles.languageSelector}>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          style={styles.languageSelect}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="bn">বাংলা</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
        </select>
      </div>

      {/* Main Content */}
      {renderSimulationMode()}

      {/* Navigation */}
      <div style={styles.navigation}>
        <button
          onClick={() => navigate('/simulation-dashboard')}
          style={styles.navButton}
        >
          🏠 {t('Dashboard')}
        </button>
        <button
          onClick={() => navigate('/score')}
          style={styles.navButton}
        >
          📊 {t('My Score')}
        </button>
        <button
          onClick={() => navigate('/')}
          style={styles.navButton}
        >
          🏡 {t('Home')}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  defaultContainer: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
  },
  modeSelector: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  modeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '30px'
  },
  modeCard: {
    backgroundColor: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textAlign: 'center',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      borderColor: '#3498db'
    }
  },
  modeIcon: {
    fontSize: '2.5rem',
    marginBottom: '15px'
  },
  progressSummary: {
    backgroundColor: '#e8f4fc',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '30px'
  },
  progressBar: {
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    margin: '10px 0',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ecc71',
    transition: 'width 0.5s ease'
  },
  bandwidthWarning: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    color: '#856404',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  caseContainer: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px'
  },
  languageSelector: {
    textAlign: 'right',
    marginBottom: '20px'
  },
  languageSelect: {
    padding: '8px 15px',
    borderRadius: '5px',
    border: '2px solid #3498db',
    backgroundColor: 'white'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
    flexWrap: 'wrap'
  },
  navButton: {
    padding: '12px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }
};

// Add spinner animation
// Animations moved to App.css

export default SimulationRouter;