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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/Step2.module.css";

// Sample suggested skills based on categories
const categorySkills = {
  "Web Development": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "PHP",
    "WordPress",
  ],
  "Mobile App Development": [
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "iOS",
    "Android",
  ],
  "Graphic Design": [
    "Photoshop",
    "Illustrator",
    "InDesign",
    "UI Design",
    "Logo Design",
  ],
  "Game Development": [
    "Unity",
    "Unreal Engine",
    "Game Design",
    "3D Modeling",
    "Animation",
  ],
  default: [
    "Communication",
    "Project Management",
    "Time Management",
    "Problem Solving",
  ],
};

// All available skills for search
const allSkills = [
  ...new Set([
    ...categorySkills["Web Development"],
    ...categorySkills["Mobile App Development"],
    ...categorySkills["Graphic Design"],
    ...categorySkills["Game Development"],
    ...categorySkills["default"],
    "TypeScript",
    "Vue.js",
    "Angular",
    "Django",
    "Flask",
    "Ruby on Rails",
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Figma",
    "Sketch",
    "Adobe XD",
    "Blender",
    "Maya",
    "ZBrush",
    "SEO",
    "Content Marketing",
    "Social Media",
    "Email Marketing",
    "Data Analysis",
    "Machine Learning",
    "AI",
    "Python",
    "R",
    "SQL",
  ]),
];

export default function Step2({ formData, onChange, onNext, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // Set suggested skills based on selected category
    if (formData.category && categorySkills[formData.category]) {
      setSuggestedSkills(categorySkills[formData.category]);
    } else {
      setSuggestedSkills(categorySkills.default);
    }

    // Validate form - at least 2 skills required
    setIsValid(formData.skills.length >= 2);
  }, [formData]);

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
  }, [searchTerm, formData.skills]);

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
