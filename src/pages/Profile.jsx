import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const education = localStorage.getItem('educationLevel');
  const state = localStorage.getItem('userState');

  if (!education || !state) {
    return (
      <div style={{ padding: '40px' }}>
        <h2>Welcome!</h2>
        <p>
          To generate your personalized judicial roadmap,
          we need a few basic details.
        </p>

        <button onClick={() => navigate('/input')}>
          Complete My Profile
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>My Profile</h2>

      <p><strong>Education Level:</strong> {education}</p>
      <p><strong>State:</strong> {state}</p>

      <button
        style={{ marginTop: '25px' }}
        onClick={() => navigate('/roadmap')}
      >
        View My Judicial Roadmap
      </button>
    </div>
  );
}

export default Profile;
