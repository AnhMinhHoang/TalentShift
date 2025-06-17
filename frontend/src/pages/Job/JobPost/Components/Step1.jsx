import { useState, useEffect } from "react";
import { TextField, Button, Radio, RadioGroup, FormControlLabel, Autocomplete } from "@mui/material";
import styles from "../styles/Step1.module.css";
import { fetchJobCategories } from "../../../../services/jobService";

export default function Step1({ formData, onChange, onNext }) {
  const [isValid, setIsValid] = useState(false);
  const [categoryType, setCategoryType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    jobTitle: "",
    category: ""
  });

  // Track touched state for each field
  const [touched, setTouched] = useState({
    jobTitle: false,
    category: false
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchJobCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const computeErrors = () => {
    const newErrors = {};

    // Job title validation (minimum 10 characters)
    if (!formData.jobTitle.trim() || formData.jobTitle.trim().length < 10) {
      newErrors.jobTitle = "Job title must be at least 10 characters";
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    return newErrors;
  };

  const validateForm = () => {
    const newErrors = computeErrors();
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleCategoryChange = (event, newValue) => {
    onChange("category", newValue);
    setTouched(prev => ({ ...prev, category: true }));
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setCategoryType(value);
    onChange("category", value);
    setTouched(prev => ({ ...prev, category: true }));
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      setCategoryType("");
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    // Mark all fields as touched when attempting to proceed
    const allTouched = {
      jobTitle: true,
      category: true
    };
    setTouched(allTouched);

    const newErrors = computeErrors();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  // Helper to determine if an error should be shown
  const shouldShowError = (field) => {
    return touched[field] && errors[field];
  };

  return (
    <div className="row g-0">
      {/* Left column - Step description */}
      <div className="col-md-4">
        <div className={styles.stepInfo}>
          <h5>Step 1</h5>
          <h2>Most important step! This is the first thing candidates see</h2>
          <p>
            Tell us about your job and we can suggest you the right category,
            but feel free to change it
          </p>
        </div>
      </div>

      {/* Right column - Form content */}
      <div className="col-md-8">
        <div className={styles.formSection}>
          {error && (
            <div className={styles.errorAlert}>
              {error} <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="jobTitle">
              What is your job title?*
            </label>
            <TextField
              id="jobTitle"
              placeholder="e.g., Senior React Developer"
              multiline
              rows={4}
              fullWidth
              value={formData.jobTitle}
              onChange={(e) => {
                onChange("jobTitle", e.target.value);
                setErrors(prev => ({ ...prev, jobTitle: "" }));
              }}
              onBlur={() => handleBlur("jobTitle")}
              error={shouldShowError("jobTitle")}
              helperText={shouldShowError("jobTitle") ? errors.jobTitle : ""}
              className={styles.textField}
            />
            <p className={styles.hint}>Minimum 10 characters</p>
          </div>

          <div className={styles.formGroup}>
            <label>Job Category*</label>
            <RadioGroup
              name="category-type"
              value={categoryType}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Web Development"
                control={<Radio className={styles.radioButton} />}
                label="Web Development"
              />
              <FormControlLabel
                value="Mobile App Development"
                control={<Radio className={styles.radioButton} />}
                label="Mobile App Development"
              />
              <FormControlLabel
                value="UI/UX Design"
                control={<Radio className={styles.radioButton} />}
                label="UI/UX Design"
              />
            </RadioGroup>
            {shouldShowError("category") && (
              <p className={styles.errorText}>{errors.category}</p>
            )}
          </div>

          <div className={styles.showAllLink}>
            <Button
              variant="text"
              onClick={toggleDropdown}
              className={styles.showAllButton}
            >
              {showDropdown ? "Hide Categories" : "Show All Categories"}
            </Button>
          </div>

          {showDropdown && (
            <div className={styles.formGroup}>
              {loading ? (
                <p>Loading categories...</p>
              ) : (
                <Autocomplete
                  id="category-select"
                  options={categories}
                  value={formData.category}
                  onChange={handleCategoryChange}
                  onBlur={() => handleBlur("category")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select a category"
                      error={shouldShowError("category")}
                      helperText={shouldShowError("category") ? errors.category : ""}
                    />
                  )}
                />
              )}
            </div>
          )}

          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              onClick={handleNext}
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