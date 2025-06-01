"use client";
import { Form, Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Add as AddIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  Link as LinkIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import styles from "../styles/RegisterAdditional.module.css";

const ProfileStep = ({
  avatar,
  setAvatar,
  avatarPreview,
  setAvatarPreview,
  fullName,
  setFullName,
  city,
  setCity,
  birthday,
  setBirthday,
  phone,
  setPhone,
  socialLinks,
  setSocialLinks,
  socialPlatforms,
}) => {
  // Avatar handler
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Social links handlers
  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "GitHub", url: "" }]);
  };

  const handleRemoveSocialLink = (index) => {
    const updatedLinks = [...socialLinks];
    updatedLinks.splice(index, 1);
    setSocialLinks(updatedLinks);
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setSocialLinks(updatedLinks);
  };

  // Get social icon based on platform
  const getSocialIcon = (platform) => {
    switch (platform) {
      case "GitHub":
        return <GitHubIcon />;
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Twitter":
        return <TwitterIcon />;
      default:
        return <LinkIcon />;
    }
  };

  return (
    <div className={styles.stepContent}>
      <h4 className={styles.stepTitle}>
        <span className={styles.stepNumber}>05</span> Complete Your Profile
      </h4>
      <p className={styles.stepDescription}>
        Add the final details to make your profile stand out to potential
        clients.
      </p>

      <div className={styles.profileContainer}>
        <div className={styles.avatarUploadContainer}>
          <div
            className={styles.avatarPreview}
            style={{
              backgroundImage: avatarPreview ? `url(${avatarPreview})` : "none",
            }}
          >
            {!avatarPreview &&
              (fullName ? fullName.charAt(0).toUpperCase() : "U")}
          </div>
          <Button
            variant="outline-primary"
            className={`${styles.uploadAvatarButton} d-flex align-items-center gap-2 mt-3`}
            as="label"
          >
            <CloudUploadIcon fontSize="small" /> Upload Profile Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </Button>
          <p className={styles.avatarHelpText}>
            A professional photo helps clients recognize you and builds trust.
          </p>
        </div>

        <div className={styles.profileFormContainer}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                <PersonIcon fontSize="small" className="me-2" />
                Full Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. John Smith"
                className={styles.formControl}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                <LocationIcon fontSize="small" className="me-2" />
                City <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. New York"
                className={styles.formControl}
                required
              />
            </Form.Group>

            <div className="mb-3">
              <Form.Label className={styles.formLabel}>
                <CakeIcon fontSize="small" className="me-2" />
                Birthday (Optional)
              </Form.Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={birthday}
                  onChange={(date) => setBirthday(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      className={styles.dateInput}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                <PhoneIcon fontSize="small" className="me-2" />
                Phone (Optional)
              </Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (123) 456-7890"
                className={styles.formControl}
              />
            </Form.Group>

            <div className={styles.socialLinksSection}>
              <h5 className={styles.sectionTitle}>
                <LinkIcon className="me-2" />
                Social Links (Optional)
              </h5>
              <p className={styles.sectionDescription}>
                Add links to your professional profiles to showcase your work
                and build credibility.
              </p>

              {socialLinks.map((link, index) => (
                <div key={index} className={styles.socialLinkRow}>
                  <div className={styles.socialLinkIcon}>
                    {getSocialIcon(link.platform)}
                  </div>
                  <Form.Select
                    value={link.platform}
                    onChange={(e) =>
                      handleSocialLinkChange(index, "platform", e.target.value)
                    }
                    className={styles.socialPlatformSelect}
                  >
                    {socialPlatforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </Form.Select>

                  <Form.Control
                    type="url"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) =>
                      handleSocialLinkChange(index, "url", e.target.value)
                    }
                    className={styles.socialUrlInput}
                  />

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemoveSocialLink(index)}
                    disabled={socialLinks.length === 1}
                    className={styles.removeSocialButton}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </div>
              ))}

              <Button
                variant="outline-primary"
                className={`${styles.addSocialButton} d-flex align-items-center gap-2 mt-3`}
                onClick={handleAddSocialLink}
              >
                <AddIcon fontSize="small" /> Add Another Link
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
