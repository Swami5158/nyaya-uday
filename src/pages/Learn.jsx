import { useNavigate } from 'react-router-dom';

function Learn() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Understanding Key Roles in a Courtroom</h2>

      {/* Roles Section */}
      <div style={styles.section}>
        <h3>👨‍⚖️ The Judge</h3>
        <p>
          The Judge is the impartial umpire of the courtroom. They ensure the
          law is followed and that the trial is fair.
        </p>
        <p>
          <strong>Main Tasks:</strong> Deciding what evidence is allowed,
          instructing the jury, and deciding the verdict if there is no jury.
        </p>
        <p>
          <strong>Sentencing:</strong> If the accused is found guilty, the judge
          decides the punishment.
        </p>
      </div>

      <div style={styles.section}>
        <h3>🧑‍💼 The Prosecutor</h3>
        <p>
          The Prosecutor represents the government (the state or the people).
          Their job is to prove that a crime was committed.
        </p>
        <p>
          They are not just trying to “win” — their ethical duty is to seek
          justice.
        </p>
      </div>

      <div style={styles.section}>
        <h3>🧑‍⚖️ The Defense Attorney</h3>
        <p>
          The Defense Attorney represents the accused person. Their role is to
          protect the legal rights of the accused.
        </p>
        <p>
          They ensure the prosecution proves the case beyond reasonable doubt.
        </p>
      </div>

      <div style={styles.section}>
        <h3>⚖️ The Magistrate</h3>
        <p>
          A Magistrate is often a junior or specialized judge who handles the
          early or administrative stages of cases.
        </p>
        <p>
          <strong>Main Tasks:</strong> Issuing search warrants, setting bail, and
          conducting initial hearings or small cases.
        </p>
      </div>

      {/* Real World Example */}
      <div style={styles.exampleBox}>
        <h3>📘 Real-World Example: Shoplifting Case</h3>

        <p><strong>Prosecutor:</strong> Calls the store manager and presents
        CCTV footage to show the item was stolen.</p>

        <p><strong>Defense:</strong> Argues that the footage is blurry and it
        cannot be proven that the person shown is the accused.</p>

        <p><strong>Judge:</strong> Stops a leading question by the prosecutor
        and asks it to be rephrased.</p>

        <p><strong>Magistrate:</strong> Earlier, signs a late-night search
        warrant allowing police to search a garage for a stolen car.</p>
      </div>

      {/* Comparison Table */}
      <h3 style={{ marginTop: '40px' }}>📊 Side-by-Side Comparison</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Person</th>
            <th>Main Job</th>
            <th>Whose Side?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Prosecutor</td>
            <td>Prove a crime was committed</td>
            <td>The Government / Law</td>
          </tr>
          <tr>
            <td>Defense</td>
            <td>Protect the accused person</td>
            <td>The Accused</td>
          </tr>
          <tr>
            <td>Judge</td>
            <td>Ensure fairness and final decisions</td>
            <td>Neutral</td>
          </tr>
          <tr>
            <td>Magistrate</td>
            <td>Handle early or minor case stages</td>
            <td>Neutral</td>
          </tr>
        </tbody>
      </table>

      {/* CTA */}
      <button
        onClick={() => navigate('/simulation')}
        style={styles.ctaBtn}
      >
        Try a Judge Simulation
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    lineHeight: '1.6',
    fontSize: '16px'
  },
  section: {
    marginTop: '25px',
    padding: '20px',
    backgroundColor: '#F7F9FB',
    borderRadius: '8px'
  },
  exampleBox: {
    marginTop: '35px',
    padding: '20px',
    backgroundColor: '#FFF3E6',
    borderRadius: '8px'
  },
  table: {
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse'
  },
  ctaBtn: {
    marginTop: '40px',
    padding: '14px 28px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#0B3C5D',
    color: '#fff',
    border: 'none',
    borderRadius: '8px'
  }
};

export default Learn;
