import { Form } from "react-bootstrap";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import styles from "../styles/RegisterAdditional.module.css";

const HirerCompanyStep = ({
  companyName,
  setCompanyName,
  description,
  setDescription,
  contactLink,
  setContactLink,
  logoFile,
  setLogoFile,
  logoPreview,
  setLogoPreview,
  registrationFile,
  setRegistrationFile,
}) => {
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegistrationFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRegistrationFile(file);
    }
  };

  return (
    <div className={styles.stepContent}>
      <h4 className={styles.stepTitle}>
        <span className={styles.stepNumber}>01</span> Company Information
      </h4>
      <p className={styles.stepDescription}>
        Provide your company details to help us verify your business and connect you with the right talent.
      </p>

      <div className={styles.companyContainer}>
        <Form.Group className="mb-4">
          <Form.Label className={styles.formLabel}>
            Company Name <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className={styles.formControl}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className={styles.formLabel}>
            Company Description <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Describe your company, its mission, and the type of projects you work on..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.formControl}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className={styles.formLabel}>
            Contact Link <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="url"
            placeholder="https://your-company-website.com"
            value={contactLink}
            onChange={(e) => setContactLink(e.target.value)}
            required
            className={styles.formControl}
          />
          <Form.Text className="text-muted">
            This could be your company website, LinkedIn page, or other professional profile.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className={styles.formLabel}>
            Company Logo
          </Form.Label>
          <div className={styles.logoUploadContainer}>
            {logoPreview ? (
              <div className={styles.logoPreview}>
                <img src={logoPreview} alt="Company logo preview" />
                <button
                  type="button"
                  className={styles.removeLogoButton}
                  onClick={() => {
                    setLogoFile(null);
                    setLogoPreview(null);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className={styles.uploadLogoButton}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className={styles.fileInput}
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className={styles.uploadLabel}>
                  <CloudUploadIcon />
                  <span>Upload Company Logo</span>
                </label>
              </div>
            )}
          </div>
          <Form.Text className="text-muted">
            Recommended size: 200x200 pixels. Max file size: 10MB.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className={styles.formLabel}>
            Business Registration Document <span className="text-danger">*</span>
          </Form.Label>
          <div className={styles.registrationUploadContainer}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleRegistrationFileChange}
              className={styles.fileInput}
              id="registration-upload"
              required
            />
            <label htmlFor="registration-upload" className={styles.uploadLabel}>
              <CloudUploadIcon />
              <span>
                {registrationFile
                  ? registrationFile.name
                  : "Upload Business Registration Document"}
              </span>
            </label>
          </div>
          <Form.Text className="text-muted">
            Upload your business registration document (PDF, DOC, or DOCX). Max file size: 10MB.
          </Form.Text>
        </Form.Group>
      </div>
    </div>
  );
};

export default HirerCompanyStep; 