import { useState } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // 1. Authenticate with Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 2. Fetch user data from Firestore
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        
        // 3. LOGIC: If details already exist, skip Input page
        if (userData.userState && userData.educationLevel) {
          console.log("Details found, skipping to Roadmap.");
          navigate('/roadmap');
        } else {
          console.log("Details missing, moving to Input.");
          navigate('/input');
        }
      } else {
        // 4. If it's a brand new user, create the document and go to Input
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          currentStep: 1,
          goal: "Civil Judge",
          createdAt: serverTimestamp() 
        });
        console.log("New user created, moving to Input.");
        navigate('/input');
      }
    } catch (error) {
      console.error("Detailed Login Error:", error);
      alert("Login Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.iconBox}>⚖️</div>
        <h2 style={styles.title}>Welcome to Nyaya-Uday</h2>
        <p style={styles.subtitle}>Your journey to the judicial bench begins here.</p>
        
        <button 
          onClick={handleGoogleLogin} 
          style={loading ? styles.disabledBtn : styles.googleBtn}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Sign in with Google"}
        </button>
        
        <p style={styles.footerText}>Secure authentication via Google Cloud</p>
      </div>
    </div>
  );
}

const styles = {
  container: { height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle, #f0f4f8 0%, #d9e2ec 100%)' },
  loginCard: { padding: '50px', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px', width: '90%' },
  iconBox: { fontSize: '50px', marginBottom: '15px' },
  title: { color: '#0B3C5D', margin: '0 0 10px 0', fontSize: '24px' },
  subtitle: { color: '#627D98', marginBottom: '30px', fontSize: '15px' },
  googleBtn: { width: '100%', padding: '14px', backgroundColor: '#4285F4', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '16px', transition: 'background 0.3s' },
  disabledBtn: { width: '100%', padding: '14px', backgroundColor: '#9FB3C8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'not-allowed' },
  footerText: { marginTop: '20px', fontSize: '12px', color: '#9FB3C8' }
};

export default Login;