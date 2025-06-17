import { Form } from "react-bootstrap";
import { Autocomplete, Chip, TextField, FormControl } from "@mui/material";
import styles from "../styles/RegisterAdditional.module.css";

const SkillsStep = ({
  mainSkill,
  setMainSkill,
  additionalSkills,
  setAdditionalSkills,
  skillsList,
}) => {
  return (
    <div className={styles.stepContent}>
      <h4 className={styles.stepTitle}>
        <span className={styles.stepNumber}>01</span> Select Your Skills
      </h4>
      <p className={styles.stepDescription}>
        Choose your main skill and any additional skills you have to showcase
        your expertise.
      </p>

      <div className={styles.skillsContainer}>
        <Form.Group className="mb-4">
          <Form.Label className={styles.formLabel}>
            Main Skill <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            value={mainSkill}
            onChange={(e) => {
              setMainSkill(e.target.value);
            }}
            className={styles.mainSkillSelect}
            required
          >
            <option value="">Select your primary expertise</option>
            {skillsList.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <FormControl fullWidth className={`${styles.formField} mt-4`}>
          <label className={styles.formLabel}>Additional Skills</label>
          <Autocomplete
            multiple
            freeSolo
            options={skillsList.filter((skill) => skill !== mainSkill)}
            value={additionalSkills}
            onChange={(e, newValue) => {
              setAdditionalSkills(newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...chipProps } = getTagProps({ index });
                return (
                  <Chip
                    key={key}
                    label={option}
                    {...chipProps}
                    className={styles.skillChip}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Type and press enter to add skills"
                className={styles.additionalSkillsInput}
              />
            )}
          />
          <small className="text-muted mt-2">
            Add skills that complement your main expertise. These will help
            clients find you for relevant projects.
          </small>
        </FormControl>
      </div>
    </div>
  );
};

export default SkillsStep;
