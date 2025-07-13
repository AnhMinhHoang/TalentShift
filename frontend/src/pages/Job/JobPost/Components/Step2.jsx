import { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Chip,
  InputAdornment,
  Popper,
  Paper,
  List,
  ListItem,
  CircularProgress
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/Step2.module.css";
import { fetchSkills, fetchSkillsByCategory } from "../../../../services/jobService";

export default function Step2({ formData, onChange, onNext, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchRef = useRef(null);

  // Fetch skills based on the selected category
  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkillsByCategory(formData.category); // Pass category to fetchSkills
        setAllSkills(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (formData.category) { // Only fetch if category is selected
      loadSkills();
    }
  }, [formData.category]); // Re-fetch when category changes

  // Update suggested skills and validation based on fetched skills
  useEffect(() => {
    if (allSkills.length > 0) {
      setSuggestedSkills(allSkills.slice(0, 5)); // Suggest top 5 skills from the category
    }
    setIsValid(formData.skills.length >= 2); // Validate form
  }, [allSkills, formData.skills]);

  // Filter skills for search dropdown
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSkills([]);
      setShowDropdown(false);
      return;
    }

    const filtered = allSkills.filter(
      (skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !formData.skills.includes(skill)
    );

    setFilteredSkills(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchTerm, formData.skills, allSkills]);

  const handleAddSkill = (skill) => {
    if (!formData.skills.includes(skill) && skill.trim() !== "") {
      const updatedSkills = [...formData.skills, skill];
      onChange("skills", updatedSkills);
    }
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = formData.skills.filter(
      (skill) => skill !== skillToRemove
    );
    onChange("skills", updatedSkills);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      e.preventDefault();
      if (filteredSkills.length > 0) {
        handleAddSkill(filteredSkills[0]);
      } else {
        handleAddSkill(searchTerm);
      }
    }
  };

  // Handle loading and error states
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div className={styles.errorAlert}>{error}</div>;
  }

  return (
    <div className="row g-0">
      {/* Left column - Step description */}
      <div className="col-md-4">
        <div className={styles.stepInfo}>
          <h5>Step 2</h5>
          <h2>Choose the main skill required for your project</h2>
          <p>
            We also suggested some of the skill based on your overview feel free
            to choose which one you like
          </p>
        </div>
      </div>

      {/* Right column - Form content */}
      <div className="col-md-8">
        <div className={styles.formSection}>
          <div className={styles.searchContainer}>
            <TextField
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#80d0c7",
                  },
                },
              }}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={searchRef}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {showDropdown && (
              <Popper
                open={showDropdown}
                anchorEl={searchRef.current}
                placement="bottom-start"
                className={styles.searchDropdown}
                style={{
                  width: searchRef.current
                    ? searchRef.current.offsetWidth
                    : "auto", // Match TextField width
                }}
              >
                <Paper elevation={3} className={styles.dropdownPaper}>
                  <List>
                    {filteredSkills.slice(0, 5).map((skill, index) => (
                      <ListItem
                        key={index}
                        button
                        onClick={() => handleAddSkill(skill)}
                        className={styles.dropdownItem}
                      >
                        {skill}
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Popper>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>What skills are required?</label>
            <p className={styles.skillsHint}>
              It is recommended to choose 3-5 skills
            </p>

            <div className={styles.selectedSkills}>
              {formData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  className={styles.skillChip}
                />
              ))}
            </div>

            <div className={styles.suggestedSkillsSection}>
              <h6>Suggested skills</h6>
              <div className={styles.suggestedSkills}>
                {suggestedSkills.map((skill, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    className={styles.skillButton}
                    onClick={() => handleAddSkill(skill)}
                    disabled={formData.skills.includes(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
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