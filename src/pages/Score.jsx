function Score() {
  const decision = localStorage.getItem('judgeDecision');

  let score = 0;
  let feedback = '';

  if (decision === 'More Evidence') {
    score = 80;
    feedback =
      'You showed judicial caution and neutrality. Judges must avoid assumptions and rely on evidence.';
  } else if (decision === 'Acquit') {
    score = 60;
    feedback =
      'You leaned towards fairness, but a judge must first ensure all facts are examined.';
  } else {
    score = 40;
    feedback =
      'Convicting without strong evidence risks bias. Judicial decisions must be evidence-based.';
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Your Judicial Aptitude Result</h2>

      <h1 style={{ marginTop: '20px' }}>{score} / 100</h1>

      <p style={{ marginTop: '20px', fontSize: '16px' }}>
        {feedback}
      </p>

      <p style={{ marginTop: '30px' }}>
        Judicial aptitude is built over time. This simulation helps you
        reflect — not judge you.
      </p>
    </div>
  );
}

export default Score;
