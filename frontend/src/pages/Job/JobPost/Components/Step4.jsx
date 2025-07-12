import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  Card,
  CardContent,
  Typography,
  FormHelperText,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import styles from "../styles/Step4.module.css";

// Validation constants
const MIN_BUDGET = 10000; // 10,000 VND
const MAX_BUDGET = 100000000; // 100,000,000 VND
const BUDGET_REGEX = /^[1-9]\d*$/; // Positive integers only

export default function Step4({ formData, onChange, onNext, onBack }) {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    paymentType: "",
    minBudget: "",
    maxBudget: "",
    budgetRange: ""
  });

  // Track touched state for each field
  const [touched, setTouched] = useState({
    paymentType: false,
    minBudget: false,
    maxBudget: false
  });

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = { paymentType: "", minBudget: "", maxBudget: "", budgetRange: "" };
    let valid = true;

    // Payment type validation
    if (!formData.paymentType) {
      newErrors.paymentType = "Please select a payment type";
      valid = false;
    }

    // Min budget validation (only if not fixed pricing)
    if (formData.paymentType !== "fixed") {
      if (!formData.minBudget.trim()) {
        newErrors.minBudget = "Minimum budget is required";
        valid = false;
      } else if (!BUDGET_REGEX.test(formData.minBudget)) {
        newErrors.minBudget = "Must be a positive number";
        valid = false;
      } else {
        const minValue = parseInt(formData.minBudget);
        if (minValue < MIN_BUDGET) {
          newErrors.minBudget = `Minimum budget must be at least ${MIN_BUDGET.toLocaleString()} VND`;
          valid = false;
        } else if (minValue > MAX_BUDGET) {
          newErrors.minBudget = `Maximum budget cannot exceed ${MAX_BUDGET.toLocaleString()} VND`;
          valid = false;
        }
      }
    }

    // Max budget validation
    if (!formData.maxBudget.trim()) {
      newErrors.maxBudget = "Maximum budget is required";
      valid = false;
    } else if (!BUDGET_REGEX.test(formData.maxBudget)) {
      newErrors.maxBudget = "Must be a positive number";
      valid = false;
    } else {
      const maxValue = parseInt(formData.maxBudget);
      if (maxValue < MIN_BUDGET) {
        newErrors.maxBudget = `Minimum budget must be at least ${MIN_BUDGET.toLocaleString()} VND`;
        valid = false;
      } else if (maxValue > MAX_BUDGET) {
        newErrors.maxBudget = `Maximum budget cannot exceed ${MAX_BUDGET.toLocaleString()} VND`;
        valid = false;
      }
    }

    // Budget range validation
    if (formData.minBudget.trim() && formData.maxBudget.trim()) {
      const minValue = parseInt(formData.minBudget);
      const maxValue = parseInt(formData.maxBudget);

      if (minValue > maxValue) {
        newErrors.budgetRange = "Minimum budget must be less than maximum budget";
        valid = false;
      } else if (maxValue - minValue < MIN_BUDGET) {
        newErrors.budgetRange = "Budget range should be at least 10,000 VND";
        valid = false;
      }
    }

    setErrors(newErrors);
    setIsValid(valid);
    return valid;
  };

  const handlePaymentTypeChange = (type) => {
    onChange("paymentType", type);
    setTouched({ ...touched, paymentType: true });
  };

  const handleBudgetChange = (field, value) => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 9) {
      onChange(field, numericValue); // Store raw number (unformatted)
      setTouched({ ...touched, [field]: true });
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleNext = () => {
    // Mark all fields as touched when attempting to proceed
    const allTouched = {
      paymentType: true,
      minBudget: true,
      maxBudget: true
    };
    setTouched(allTouched);

    if (validateForm()) {
      onNext();
    }
  };

  const formatBudget = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("vi-VN").format(parseInt(value));
  };

  // Helper to determine if an error should be shown
  const shouldShowError = (field) => {
    return touched[field] && errors[field];
  };

  // For budget range error - show if either min or max has been touched
  const shouldShowRangeError = () => {
    return (touched.minBudget || touched.maxBudget) && errors.budgetRange;
  };

  return (
    <div className="row g-0">
      {/* Left column - Step description */}
      <div className="col-md-4">
        <div className={styles.stepInfo}>
          <h5>Step 4</h5>
          <h2>Tell us about your budget</h2>
          <p>
            Set your budget for this job so candidates know what to expect. You
            can choose a fixed price or an hourly rate.
          </p>
          <div className={styles.budgetTips}>
            <h6>Budget Guidelines:</h6>
            <ul>
              <li>Minimum: {MIN_BUDGET.toLocaleString()} VND</li>
              <li>Maximum: {MAX_BUDGET.toLocaleString()} VND</li>
              <li>Budget range should be at least 10,000 VND</li>
              <li>Typical hourly rates: 100,000 - 500,000 VND/hr</li>
              <li>Typical fixed prices: 500,000 - 20,000,000 VND</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right column - Form content */}
      <div className="col-md-8">
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label>How do you want to pay?*</label>
            {shouldShowError("paymentType") && (
              <FormHelperText error className={styles.errorText}>
                {errors.paymentType}
              </FormHelperText>
            )}
            <div className={styles.paymentOptions}>
              <Card
                  className={`${styles.paymentCard} ${
                      formData.paymentType === "fixed" ? styles.selectedCard : ""
                  } ${shouldShowError("paymentType") ? styles.errorBorder : ""}`}
                  onClick={() => handlePaymentTypeChange("fixed")}
              >
                <CardContent>
                  <div className={styles.paymentCardContent}>
                    <div className={styles.paymentIcon}>
                      <AttachMoneyIcon />
                    </div>
                    <div className={styles.paymentInfo}>
                      <Typography variant="h6">Pay fixed price</Typography>
                      <Typography variant="body2">
                        Pay for completed work, best for defined-scope projects
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                  className={`${styles.paymentCard} ${styles.disabledCard}`}
                  // Remove onClick to prevent interaction
              >
                <CardContent>
                  <div className={styles.paymentCardContent}>
                    <div className={styles.paymentIcon}>
                      <AccessTimeIcon />
                    </div>
                    <div className={styles.paymentInfo}>
                      <Typography variant="h6">Pay by the hour</Typography>
                      <Typography variant="body2">
                        Pay for hours worked, best for ongoing projects
                      </Typography>
                      <Typography variant="body2" className={styles.comingSoon}>
                        Coming soon
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>
              {formData.paymentType === "fixed"
                  ? "What is your project budget?*"
                  : "What is your estimated budget?*"}
            </label>

            {formData.paymentType === "fixed" ? (
                <div className={styles.budgetInputs}>
                  <div className={styles.budgetField}>
                    <label>Project Budget</label>
                    <TextField
                        fullWidth
                        error={shouldShowError("maxBudget")}
                        helperText={shouldShowError("maxBudget") ? errors.maxBudget : ""}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "#80d0c7",
                            },
                          },
                        }}
                        value={formatBudget(formData.maxBudget)}
                        onChange={(e) => handleBudgetChange("maxBudget", e.target.value)}
                        onBlur={() => handleBlur("maxBudget")}
                        slotProps={{
                          input: {
                            startAdornment: (
                                <InputAdornment position="start">VND</InputAdornment>
                            ),
                          },
                        }}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          min: MIN_BUDGET,
                          max: MAX_BUDGET
                        }}
                    />
                    <div className={styles.budgetPreview}>
                      {formData.maxBudget ? (
                          <>
                            <span>Amount: </span>
                            {formatBudget(formData.maxBudget)} VND
                          </>
                      ) : (
                          "Enter project budget"
                      )}
                    </div>
                  </div>
                </div>
            ) : (
                <>
                  {shouldShowRangeError() && (
                      <FormHelperText error className={styles.errorText}>
                        {errors.budgetRange}
                      </FormHelperText>
                  )}
                  <div className={styles.budgetInputs}>
                    <div className={styles.budgetField}>
                      <label>Minimum Budget</label>
                      <TextField
                          fullWidth
                          error={shouldShowError("minBudget")}
                          helperText={shouldShowError("minBudget") ? errors.minBudget : ""}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "#80d0c7",
                              },
                            },
                          }}
                          value={formatBudget(formData.minBudget)}
                          onChange={(e) => handleBudgetChange("minBudget", e.target.value)}
                          onBlur={() => handleBlur("minBudget")}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            min: MIN_BUDGET,
                            max: MAX_BUDGET,
                          }}
                          slotProps={{
                            input: {
                              startAdornment: (
                                  <InputAdornment position="start">VND</InputAdornment>
                              ),
                            },
                          }}
                      />
                      <div className={styles.budgetPreview}>
                        {formData.minBudget ? (
                            <>
                              <span>Amount: </span>
                              {formatBudget(formData.minBudget)} VND
                            </>
                        ) : (
                            "Enter minimum budget"
                        )}
                      </div>
                    </div>

                    <div className={styles.budgetField}>
                      <label>Maximum Budget</label>
                      <TextField
                          fullWidth
                          error={shouldShowError("maxBudget")}
                          helperText={shouldShowError("maxBudget") ? errors.maxBudget : ""}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "#80d0c7",
                              },
                            },
                          }}
                          value={formatBudget(formData.maxBudget)}
                          onChange={(e) => handleBudgetChange("maxBudget", e.target.value)}
                          onBlur={() => handleBlur("maxBudget")}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            min: MIN_BUDGET,
                            max: MAX_BUDGET,
                          }}
                          slotProps={{
                            input: {
                              startAdornment: (
                                  <InputAdornment position="start">VND</InputAdornment>
                              ),
                            },
                          }}
                      />
                      <div className={styles.budgetPreview}>
                        {formData.maxBudget ? (
                            <>
                              <span>Amount: </span>
                              {formatBudget(formData.maxBudget)} VND
                            </>
                        ) : (
                            "Enter maximum budget"
                        )}
                      </div>
                    </div>
                  </div>
                </>
            )}
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
