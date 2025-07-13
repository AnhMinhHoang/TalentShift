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

  // Keywords mapping for smart suggestions
  const categoryKeywords = {
    "Software Development": ["software", "developer", "programming", "coding", "engineer", "backend", "frontend", "full stack", "java", "python", "c++", "javascript", "react", "angular", "vue", "node"],
    "Web Development": ["web", "website", "html", "css", "javascript", "react", "angular", "vue", "frontend", "backend", "full stack", "wordpress", "shopify"],
    "Mobile App Development": ["mobile", "app", "android", "ios", "swift", "kotlin", "react native", "flutter", "xamarin", "cordova"],
    "UI/UX Design": ["ui", "ux", "user interface", "user experience", "design", "figma", "sketch", "adobe", "wireframe", "prototype"],
    "Design": ["graphic", "visual", "creative", "designer", "photoshop", "illustrator", "brand", "logo", "marketing design"],
    "Marketing": ["marketing", "digital marketing", "seo", "sem", "social media", "content", "campaign", "advertising", "growth"],
    "Finance": ["finance", "accounting", "financial", "analyst", "bookkeeper", "cpa", "tax", "audit", "investment"],
    "HR": ["human resources", "hr", "recruitment", "hiring", "talent", "employee", "payroll", "benefits"],
    "Sales": ["sales", "business development", "account", "revenue", "client", "customer acquisition", "lead generation"],
    "Customer Service": ["customer service", "support", "help desk", "client relations", "customer success", "call center"],
    "Operations": ["operations", "logistics", "supply chain", "project management", "process", "coordinator", "manager"],
    "IT": ["it", "information technology", "system admin", "network", "security", "infrastructure", "devops", "cloud"],
    "Legal": ["legal", "lawyer", "attorney", "paralegal", "compliance", "contract", "law", "litigation"]
  };

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

  // Smart category suggestion based on job title
  const getSuggestedCategories = (jobTitle) => {
    if (!jobTitle || jobTitle.trim().length < 3) {
      return ["Web Development", "Mobile App Development", "UI/UX Design"];
    }

    const title = jobTitle.toLowerCase();
    const categoryScores = {};

    // Calculate scores for each category based on keyword matches
    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      let score = 0;
      keywords.forEach(keyword => {
        if (title.includes(keyword.toLowerCase())) {
          // Give higher score for exact matches and longer keywords
          score += keyword.length;
        }
      });
      categoryScores[category] = score;
    });

    // Sort categories by score and return top 3
    const sortedCategories = Object.entries(categoryScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);

    // If no matches found, return default categories
    if (sortedCategories.every(cat => categoryScores[cat] === 0)) {
      return ["Web Development", "Mobile App Development", "UI/UX Design"];
    }

    return sortedCategories;
  };

  // Get the categories to display based on selection logic
  const getDisplayCategories = () => {
    const top3 = getSuggestedCategories(formData.jobTitle);
    const selectedCategory = formData.category;

    // If no category is selected, show only top 3
    if (!selectedCategory) {
      return top3;
    }

    // If selected category is in top 3, show only top 3
    if (top3.includes(selectedCategory)) {
      return top3;
    }

    // If selected category is not in top 3, show top 3 + selected as 4th
    return [...top3, selectedCategory];
  };

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
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      // When switching to dropdown mode, clear the radio selection
      setCategoryType("");
    } else {
      // When switching back to suggested categories, set the radio state
      // to match the currently selected category if it's in the display list
      const displayCategories = getDisplayCategories();
      if (formData.category && displayCategories.includes(formData.category)) {
        setCategoryType(formData.category);
      }
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

  // Get categories to display with smart logic
  const displayCategories = getDisplayCategories();

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
              multiline
              rows={4}
              fullWidth
              value={formData.jobTitle}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  onChange("jobTitle", e.target.value);
                  setErrors(prev => ({ ...prev, jobTitle: "" }));
                }
              }}
              onBlur={() => handleBlur("jobTitle")}
              error={shouldShowError("jobTitle")}
              helperText={
                shouldShowError("jobTitle")
                  ? errors.jobTitle
                  : `${formData.jobTitle.length}/100 characters`
              }
            />
            <p className={styles.hint}>Minimum 10 characters and maximum 100 character</p>
          </div>

          <div className={styles.formGroup}>
            <label>Job Category*</label>

            {/* Show suggested categories when not showing all categories */}
            {!showDropdown && (
              <RadioGroup
                name="category-type"
                value={categoryType}
                onChange={handleRadioChange}
              >
                {displayCategories.map((category) => (
                  <FormControlLabel
                    key={category}
                    value={category}
                    control={<Radio className={styles.radioButton} />}
                    label={category}
                  />
                ))}
              </RadioGroup>
            )}

            {/* Show all categories dropdown when toggled */}
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
              {showDropdown ? "Show Suggested Categories" : "Show All Categories"}
            </Button>
          </div>

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