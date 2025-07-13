import { Form, Button } from "react-bootstrap";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
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
import { useState } from "react";
import Cropper from 'react-easy-crop';
import { notification } from "antd";
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
  links,
  setLinks,
}) => {
  // Validate and format URL
  const validateAndFormatUrl = (url) => {
    if (!url || url.trim() === "") return { isValid: true, formattedUrl: "" };
    let formattedUrl = url.trim();
    if (!formattedUrl.match(/^https?:\/\//)) {
      formattedUrl = "https://" + formattedUrl;
    }
    try {
      new URL(formattedUrl);
      return { isValid: true, formattedUrl };
    } catch {
      return { isValid: false, formattedUrl };
    }
  };

  // Track validation errors for links
  const [linkErrors, setLinkErrors] = useState([false, false, false, false]);

  // Icon selection for links
  const getLinkIcon = (url) => {
    if (!url || url.trim() === "") return <LinkIcon fontSize="small" className="me-2" />;
    const lowerUrl = url.toLowerCase();
    const iconName = lowerUrl.includes("github.com")
      ? "GitHub"
      : lowerUrl.includes("linkedin.com")
        ? "LinkedIn"
        : lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")
          ? "Twitter"
          : "Generic";
    if (lowerUrl.includes("github.com")) return <GitHubIcon fontSize="small" className="me-2" />;
    if (lowerUrl.includes("linkedin.com")) return <LinkedInIcon fontSize="small" className="me-2" />;
    if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return <TwitterIcon fontSize="small" className="me-2" />;
    return <LinkIcon fontSize="small" className="me-2" />;
  };

  // State for image cropping
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Notification handler
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
      showProgress: true,
      pauseOnHover: true,
    });
  };

  // Avatar handler with validation
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        openNotification('warning', 'Invalid file type', 'Please select an image file (JPG, PNG, GIF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        openNotification('warning', 'File too large', 'Please select an image smaller than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate cropped image
  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = new Image();
    image.src = imageSrc;
    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        resolve(canvas.toDataURL('image/jpeg'));
      };
    });
  };

  // Set cropped image
  const handleSetCroppedImage = async () => {
    if (selectedImage && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
      setAvatarPreview(croppedImage);
      // Convert Base64 to File object for consistency with parent component
      const byteString = atob(croppedImage.split(',')[1]);
      const mimeString = croppedImage.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], 'avatar.jpg', { type: mimeString });
      setAvatar(file);
      setShowCropModal(false);
      setSelectedImage(null);
    }
  };

  // Link handler
  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);

    const updatedErrors = [...linkErrors];
    const { isValid } = validateAndFormatUrl(value);
    updatedErrors[index] = !isValid;
    setLinkErrors(updatedErrors);
  };

  return (
    <div className={styles.stepContent}>
      <h4 className={styles.stepTitle}>
        <span className={styles.stepNumber}>05</span> Complete Your Profile
      </h4>
      <p className={styles.stepDescription}>
        Add the final details to make your profile stand out to potential clients.
      </p>

      <div className={styles.profileContainer}>
        <div className={styles.avatarUploadContainer}>
          <div
            className={styles.avatarPreview}
            style={{
              backgroundImage: avatarPreview ? `url(${avatarPreview})` : "none",
            }}
          >
            {!avatarPreview && (fullName ? fullName.charAt(0).toUpperCase() : "U")}
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
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: "normal",
                      className: styles.dateInput,
                    },
                  }}
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
                Links (Optional, Max 4)
              </h5>
              <p className={styles.sectionDescription}>
                Add up to 4 links to your professional profiles to showcase your work and build credibility.
              </p>

              {[0, 1, 2, 3].map((index) => (
                <div key={index} className={styles.socialLinkRow}>
                  <div className="d-flex align-items-center">
                    {getLinkIcon(links[index] || "")}
                    <Form.Control
                      type="url"
                      placeholder={`Link ${index + 1} (optional)`}
                      value={links[index] || ""}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                      className={`${styles.socialUrlInput} ${linkErrors[index] ? "is-invalid" : ""}`}
                    />
                  </div>
                  {linkErrors[index] && (
                    <div className="invalid-feedback">Please enter a valid URL</div>
                  )}
                </div>
              ))}
            </div>
          </Form>
        </div>
      </div>

      {showCropModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1051 }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crop Image</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowCropModal(false);
                    setSelectedImage(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div style={{ position: 'relative', width: '100%', height: 400 }}>
                  <Cropper
                    image={selectedImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCropModal(false);
                    setSelectedImage(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSetCroppedImage}
                >
                  Set Cropped Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileStep;