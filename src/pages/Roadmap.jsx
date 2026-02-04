import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function Roadmap() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading your path...</div>;

  const steps = [
    { id: 1, title: "LL.B Graduation", desc: `Complete your law degree (Current level: ${userData?.educationLevel || 'Not Set'})` },
    { id: 2, title: "Bar Enrollment", desc: `Register with the Bar Council of ${userData?.userState || 'your state'}.` },
    { id: 3, title: "Judiciary Exams", desc: `Clear the ${userData?.userState || ''} Judicial Services Examination.` },
    { id: 4, title: "Training", desc: "Join the State Judicial Academy." }
  ];

  return (
    <div style={styles.roadmapBox}>
      <div style={styles.header}>
        <h2 style={{margin: 0, color: '#0B3C5D'}}>Your Path to the Bench</h2>
        {userData?.userState && (
          <span style={styles.stateTag}>📍 {userData.userState} Edition</span>
        )}
      </div>

      <div style={styles.timeline}>
        {steps.map((step) => {
          const isCompleted = userData?.currentStep > step.id;
          const isCurrent = userData?.currentStep === step.id;

          return (
            <div key={step.id} style={{
              ...styles.stepCard, 
              opacity: (isCompleted || isCurrent) ? 1 : 0.5,
              borderLeft: isCurrent ? '5px solid #F4A261' : '5px solid #ccc',
              backgroundColor: isCompleted ? '#f0fdf4' : '#fff'
            }}>
              <h4 style={{margin: 0}}>
                {step.id}. {step.title} {isCompleted && '✅'}
              </h4>
              <p style={{fontSize: '14px', color: '#666', marginTop: '8px'}}>{step.desc}</p>
              {isCurrent && <span style={styles.badge}>Active Goal</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  roadmapBox: { padding: '40px 20px', maxWidth: '700px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '30px' },
  stateTag: { backgroundColor: '#E0E7FF', color: '#4338CA', padding: '5px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' },
  timeline: { display: 'flex', flexDirection: 'column', gap: '20px' },
  stepCard: { padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative', transition: '0.3s' },
  badge: { position: 'absolute', top: '15px', right: '15px', backgroundColor: '#F4A261', color: '#0B3C5D', fontSize: '11px', padding: '5px 10px', borderRadius: '20px', fontWeight: 'bold' }
};

export default Roadmap;