function Profile() {
  const education = localStorage.getItem('educationLevel');
  const state = localStorage.getItem('userState');

  return (
    <div style={{ padding: '40px' }}>
      <h2>My Profile</h2>
      <p><strong>Education Level:</strong> {education || 'Not selected'}</p>
      <p><strong>State:</strong> {state || 'Not selected'}</p>
    </div>
  );
}

export default Profile;
