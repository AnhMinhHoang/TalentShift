import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import styles from "../styles/Step3.module.css";

export default function Step3({ formData, onChange, onNext, onBack }) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate form - all fields required
    setIsValid(
      formData.projectName.trim() !== "" &&
      formData.projectDescription.trim() !== "" &&
      formData.keyResponsibilities.trim() !== "" &&
      formData.idealSkills.trim() !== ""
    );
  }, [formData]);

  return (
    <div className="row g-0">
      {/* Left column - Step description */}
      <div className="col-md-4">
        <div className={styles.stepInfo}>
          <h5>Step 3</h5>
          <h2>Let's take a quick look at your projects</h2>
          <p>
            We have already set up every thing for you base on your provided
            information. Feel free to change it however you like.
          </p>
        </div>
      </div>

      {/* Right column - Form content */}
      <div className="col-md-8">
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label htmlFor="projectName">Project Name</label>
            <TextField
              id="projectName"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#80d0c7",
                  },
                },
              }}
              value={formData.projectName}
              onChange={(e) => onChange("projectName", e.target.value)}
              className={styles.textField}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="projectDescription">Project Description</label>
            <TextField
              id="projectDescription"
              multiline
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#80d0c7",
                  },
                },
              }}
              rows={6}
              fullWidth
              value={formData.projectDescription}
              onChange={(e) => onChange("projectDescription", e.target.value)}
              className={styles.textField}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="keyResponsibilities">Key Responsibilities</label>
            <TextField
              id="keyResponsibilities"
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#80d0c7",
                  },
                },
              }}
              fullWidth
              value={formData.keyResponsibilities}
              onChange={(e) => onChange("keyResponsibilities", e.target.value)}
              className={styles.textField}
              placeholder="- List key responsibilities here
- One responsibility per line
- Be specific and clear"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="idealSkills">Ideal Skills</label>
            <TextField
              id="idealSkills"
              multiline
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#80d0c7",
                  },
                },
              }}
              rows={4}
              fullWidth
              value={formData.idealSkills}
              onChange={(e) => onChange("idealSkills", e.target.value)}
              className={styles.textField}
              placeholder="- List ideal skills here
- One skill per line
- Include experience level if relevant"
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button
              variant="outlined"
              onClick={onBack}
              className={styles.backButton}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={onNext}
              disabled={!isValid}
              className={styles.nextButton}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
