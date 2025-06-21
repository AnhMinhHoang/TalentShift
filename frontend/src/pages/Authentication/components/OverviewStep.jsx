import { Form } from "react-bootstrap";
import {
  Create as CreateIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import styles from "../styles/RegisterAdditional.module.css";

const OverviewStep = ({ overview, setOverview, wordCount, setWordCount }) => {
  const handleOverviewChange = (e) => {
    const text = e.target.value;
    setOverview(text);
    setWordCount(text.length);
  };

  // Calculate progress for the word count
  const charCountProgress = Math.min(100, (wordCount / 100) * 100);

  return (
    <div className={styles.stepContent}>
      <h4 className={styles.stepTitle}>
        <span className={styles.stepNumber}>04</span> Professional Overview
      </h4>
      <p className={styles.stepDescription}>
        Write a compelling summary of your skills, experience, and what makes
        you unique.
      </p>

      <div className={styles.overviewContainer}>
        <div className={styles.overviewHeader}>
          <CreateIcon className="me-2" />
          <span>Tell clients about yourself</span>
        </div>

        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Introduce yourself, highlight your expertise, and explain what sets you apart from others. Mention your experience, key skills, and the types of projects you enjoy working on. Be specific about the value you can bring to potential clients..."
            value={overview}
            onChange={handleOverviewChange}
            className={styles.overviewTextarea}
          />
        </Form.Group>

        <div className={styles.wordCountContainer}>
          <div className={styles.wordCountProgressBar}>
            <div
              className={styles.wordCountProgress}
              style={{ width: `${charCountProgress}%` }}
            ></div>
          </div>
          <div
            className={`${styles.wordCountText} ${
              wordCount < 100 ? styles.wordCountInvalid : styles.wordCountValid
            }`}
          >
            {wordCount < 100 ? (
              <WarningIcon fontSize="small" className="me-1" />
            ) : (
              <CheckIcon fontSize="small" className="me-1" />
            )}
            {wordCount}/100 characters{" "}
            {wordCount < 100
              ? `(${100 - wordCount} more needed)`
              : "(minimum reached)"}
          </div>
        </div>

        {wordCount < 100 && wordCount > 0 && (
          <div className={styles.wordCountWarning}>
            <WarningIcon fontSize="small" className="me-2" />
            Please write at least 100 words to provide clients with enough
            information about your skills and experience.
          </div>
        )}

        <div className={styles.overviewTips}>
          <h6>Tips for a great overview:</h6>
          <ul>
            <li>
              Start with a strong introduction about who you are professionally
            </li>
            <li>Highlight your years of experience and areas of expertise</li>
            <li>Mention notable achievements or clients you've worked with</li>
            <li>Explain what makes your approach unique</li>
            <li>End with what you're looking for in projects or clients</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OverviewStep;
