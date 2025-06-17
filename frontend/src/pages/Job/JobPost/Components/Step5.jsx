import { Button, Chip, Divider } from "@mui/material";
import styles from "../styles/Step5.module.css";

export default function Step5({ formData, onSubmit, onBack }) {
  const formatBudget = () => {
    const min = `${formData.minBudget
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
    const max = `${formData.maxBudget
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;

    if (formData.paymentType === "hourly") {
      return `${min}/hr - ${max}/hr`;
    }
    return `${min} - ${max}`;
  };

  return (
    <div className="row g-0">
      {/* Left column - Step description */}
      <div className="col-md-4">
        <div className={styles.stepInfo}>
          <h5>Step 5</h5>
          <h2>Are these detail correct?</h2>
          <p>
            Simply click Post when thing already ready and your project will
            immediate online!
          </p>
        </div>
      </div>

      {/* Right column - Form content */}
      <div className="col-md-8">
        <div className={styles.reviewSection}>
          <h2 className={styles.projectTitle}>{formData.projectName}</h2>

          <div className={styles.reviewItem}>
            <h4>Category</h4>
            <p>{formData.category}</p>
          </div>

          <div className={styles.reviewItem}>
            <h4>Tags:</h4>
            <div className={styles.tagsList}>
              {formData.skills.map((skill, index) => (
                <Chip key={index} label={skill} className={styles.tagChip} />
              ))}
            </div>
          </div>

          <div className={styles.reviewItem}>
            <h4>Budget</h4>
            <p>{formatBudget()}</p>
          </div>

          <div className={styles.reviewItem}>
            <h4>Job Description</h4>
            <p className={styles.description}>{formData.projectDescription}</p>
          </div>

          <div className={styles.reviewItem}>
            <h4>Key Responsibilities</h4>
            <ul className={styles.bulletList}>
              {formData.keyResponsibilities.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.reviewItem}>
            <h4>Professional Skills</h4>
            <ul className={styles.bulletList}>
              {formData.idealSkills.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <Divider className={styles.divider} />

          <div className={styles.buttonContainer}>
            <Button
              variant="outlined"
              onClick={onBack}
              className={styles.backButton}
            >
              Previous
            </Button>
            <div>
              <Button
                variant="outlined"
                onClick={() => onSubmit(true)}
                className={styles.draftButton}
              >
                Save as Draft
              </Button>
              <Button
                variant="contained"
                onClick={() => onSubmit(false)}
                className={styles.postButton}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
