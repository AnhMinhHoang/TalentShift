import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import styles from "../styles/Step4.module.css";

export default function Step4({ formData, onChange, onNext, onBack }) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate form - payment type and budget required
    setIsValid(
      formData.paymentType !== "" &&
        formData.minBudget.trim() !== "" &&
        formData.maxBudget.trim() !== ""
    );
  }, [formData]);

  const handlePaymentTypeChange = (type) => {
    onChange("paymentType", type);
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
        </div>
      </div>

      {/* Right column - Form content */}
      <div className="col-md-8">
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label>How do you want to pay?</label>
            <div className={styles.paymentOptions}>
              <Card
                className={`${styles.paymentCard} ${
                  formData.paymentType === "hourly" ? styles.selectedCard : ""
                }`}
                onClick={() => handlePaymentTypeChange("hourly")}
              >
                <CardContent>
                  <div className={styles.paymentCardContent}>
                    <div className={styles.paymentIcon}>
                      <AccessTimeIcon />
                    </div>
                    <div className={styles.paymentInfo}>
                      <Typography variant="h6">Pay by the hour</Typography>
                      <Typography variant="body2">
                        Pay for hours worked, best for on-going project
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`${styles.paymentCard} ${
                  formData.paymentType === "fixed" ? styles.selectedCard : ""
                }`}
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
                        Pay for completed work, best for on-going project
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>What is your estimate budget?</label>
            <div className={styles.budgetInputs}>
              <div className={styles.budgetField}>
                <label>Minimum Budget</label>
                <TextField
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#80d0c7",
                      },
                    },
                  }}
                  value={formData.minBudget}
                  onChange={(e) => onChange("minBudget", e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment:
                        formData.paymentType === "hourly" ? (
                          <InputAdornment position="end">/hr</InputAdornment>
                        ) : null,
                      startAdornment: (
                        <InputAdornment position="start">VND</InputAdornment>
                      ),
                    },
                  }}
                  type="number"
                />
              </div>

              <div className={styles.budgetField}>
                <label>Maximum Budget</label>
                <TextField
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#80d0c7",
                      },
                    },
                  }}
                  value={formData.maxBudget}
                  onChange={(e) => onChange("maxBudget", e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment:
                        formData.paymentType === "hourly" ? (
                          <InputAdornment position="end">/hr</InputAdornment>
                        ) : null,
                      startAdornment: (
                        <InputAdornment position="start">VND</InputAdornment>
                      ),
                    },
                  }}
                  type="number"
                />
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
