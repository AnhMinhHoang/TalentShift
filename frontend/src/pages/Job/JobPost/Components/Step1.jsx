import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Autocomplete,
} from "@mui/material";
import styles from "../styles/Step1.module.css";

const categories = [
  "Web Development",
  "Mobile App Development",
  "Graphic Design",
  "Content Writing",
  "Digital Marketing",
  "Video Production",
  "UI/UX Design",
  "Data Entry",
  "Virtual Assistant",
  "SEO",
  "Social Media Management",
  "Game Development",
  "Animation",
  "Voice Over",
  "Translation",
];

export default function Step1({ formData, onChange, onNext }) {
  const [isValid, setIsValid] = useState(false);
  const [categoryType, setCategoryType] = useState("categoryA");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Validate form
    setIsValid(formData.jobTitle.trim() !== "" && formData.category !== "");
  }, [formData]);

  const handleCategoryChange = (event, newValue) => {
    onChange("category", newValue);
  };

  const handleRadioChange = (event) => {
    setCategoryType(event.target.value);
    onChange(
      "category",
      event.target.value === "categoryA"
        ? "Category A"
        : event.target.value === "categoryB"
        ? "Category B"
        : "Category C"
    );
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      setCategoryType("");
    }
  };

  return (
    <div className="row g-0">
      {/* Left column - Step description */}
      <div className="col-md-4">
        <div className={styles.stepInfo}>
          <h5>Step 1</h5>
          <h2>
            Most important step! This is the first thing candidate see and make
            their decision base on this
          </h2>
          <p>
            Tell us about your job and we can suggest you the right category,
            but feel free to change it for your liking
          </p>
        </div>
      </div>

      {/* Right column - Form content */}
      <div className="col-md-8">
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label htmlFor="jobTitle">
              What is you job title? or maybe description?
            </label>
            <TextField
              id="jobTitle"
              placeholder="Title or description..."
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
              value={formData.jobTitle}
              onChange={(e) => onChange("jobTitle", e.target.value)}
              className={styles.textField}
            />
          </div>

          <div className={styles.formGroup}>
            <FormControl component="fieldset">
              <label>Job Category</label>
              <RadioGroup
                name="category-type"
                value={categoryType}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="categoryA"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#80d0c7",
                        },
                      }}
                      className={styles.radioButton}
                    />
                  }
                  label="Category A"
                />
                <FormControlLabel
                  value="categoryB"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#80d0c7",
                        },
                      }}
                      className={styles.radioButton}
                    />
                  }
                  label="Category B"
                />
                <FormControlLabel
                  value="categoryC"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#80d0c7",
                        },
                      }}
                      className={styles.radioButton}
                    />
                  }
                  label="Category C"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className={styles.showAllLink}>
            <Button
              variant="text"
              onClick={toggleDropdown}
              className={styles.showAllButton}
            >
              {showDropdown ? "Hide Categories" : "Show All Category"}
            </Button>
          </div>

          {showDropdown && (
            <div className={styles.formGroup}>
              <Autocomplete
                id="category-select"
                options={categories}
                value={formData.category}
                onChange={handleCategoryChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#80d0c7",
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select a category" />
                )}
              />
            </div>
          )}

          <div className={styles.buttonContainer}>
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
