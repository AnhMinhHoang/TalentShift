import React, { useState } from "react";
import Cropper from 'react-easy-crop';
import { notification } from "antd";
import {
    Link as LinkIcon,
    GitHub as GitHubIcon,
    LinkedIn as LinkedInIcon,
    Twitter as TwitterIcon,
} from "@mui/icons-material";
import api from "../../services/api";
import { getImageUrl } from "../../utils/imageUtils";
import { isAtLeastAge, isFutureDate } from "../../utils/dateUtils";
import AvatarWithFallback from '../../components/AvatarWithFallback';

const ProfileSidebar = ({ userData, setUserData }) => {
    const [showModal, setShowModal] = useState(false);
    const [showCropModal, setShowCropModal] = useState(false);

    const formatDateArray = (arr) => {
        if (!Array.isArray(arr) || arr.length !== 3) return "";
        const [year, month, day] = arr;
        const paddedMonth = String(month).padStart(2, "0");
        const paddedDay = String(day).padStart(2, "0");
        return `${paddedDay}-${paddedMonth}-${year}`;
    };

    const [profile, setProfile] = useState({
        name: userData?.fullName,
        email: userData?.email,
        dob: formatDateArray(userData?.birthDate),
        location: userData?.location || "",
        phone: userData?.phone || "",
        avatar: "linear-gradient(to bottom right, #428A9B, #266987)",
        avatarImage: userData?.avatar || null,
        links: Array.isArray(userData?.links) ? userData.links.map(linkObj => String(linkObj?.url || '')) : []
    });

    const [editForm, setEditForm] = useState({});
    const [linkErrors, setLinkErrors] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [dobError, setDobError] = useState("");

    // Add a computed variable for save button disabled state
    const isSaveDisabled =
        !editForm.name ||
        !!dobError ||
        (linkErrors && linkErrors.some(Boolean));

    const openNotification = (type, message, placement, description) => {
        notification[type]({
            message,
            description,
            placement,
            duration: 3,
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const getLinkIcon = (url) => {
        if (!url || url.trim() === "") return <LinkIcon fontSize="small" className="me-2" style={{ color: "#428A9B" }} />;
        const lowerUrl = url.toLowerCase();
        if (lowerUrl.includes("github.com")) return <GitHubIcon fontSize="small" className="me-2" style={{ color: "#428A9B" }} />;
        if (lowerUrl.includes("linkedin.com")) return <LinkedInIcon fontSize="small" className="me-2" style={{ color: "#428A9B" }} />;
        if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return <TwitterIcon fontSize="small" className="me-2" style={{ color: "#428A9B" }} />;
        return <LinkIcon fontSize="small" className="me-2" style={{ color: "#428A9B" }} />;
    };

    function convertToDateInputFormat(dateStr) {
        const [day, month, year] = dateStr.split('-');
        return `${year}-${month}-${day}`;
    }

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                openNotification('warning', 'Invalid file type', 'topRight', 'Please select an image file (JPG, PNG, GIF)');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                openNotification('warning', 'File too large', 'topRight', 'Please select an image smaller than 5MB');
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

    const handleSetCroppedImage = async () => {
        if (selectedImage && croppedAreaPixels) {
            const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
            setPreviewImage(croppedImage);
            setEditForm(prev => ({
                ...prev,
                avatarImage: croppedImage
            }));
            setShowCropModal(false);
            setSelectedImage(null);
        }
    };

    const validateAndFormatUrl = (url) => {
        if (!url || url.trim() === '') return { isValid: true, formattedUrl: '' };
        let formattedUrl = url.trim();
        if (!formattedUrl.match(/^https?:\/\//)) {
            formattedUrl = 'https://' + formattedUrl;
        }
        try {
            new URL(formattedUrl);
            return { isValid: true, formattedUrl };
        } catch {
            return { isValid: false, formattedUrl };
        }
    };

    const openModal = () => {
        setEditForm({
            name: profile.name,
            dob: convertToDateInputFormat(profile.dob),
            location: profile.location,
            phone: profile.phone,
            avatar: profile.avatar,
            avatarImage: profile.avatarImage,
            links: [...profile.links]
        });
        setPreviewImage(profile.avatarImage);
        setLinkErrors([]);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditForm({});
        setLinkErrors([]);
        setPreviewImage(null);
        setShowCropModal(false);
        setSelectedImage(null);
    };

    const handleInputChange = (field, value) => {
        if (field === 'dob') {
            if (value) {
                if (!isAtLeastAge(value, 18)) {
                    setDobError("You must be at least 18 years old.");
                } else if (isFutureDate(value)) {
                    setDobError("Date of birth cannot be in the future.");
                } else {
                    setDobError("");
                }
            } else {
                setDobError("");
            }
        }
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleLinkChange = (index, value) => {
        const updatedLinks = [...editForm.links];
        updatedLinks[index] = value;
        setEditForm(prev => ({
            ...prev,
            links: updatedLinks
        }));
        const updatedErrors = [...linkErrors];
        const { isValid } = validateAndFormatUrl(value);
        updatedErrors[index] = !isValid;
        setLinkErrors(updatedErrors);
    };

    const handleSave = async () => {
        if (!editForm.name.trim()) {
            openNotification('warning', 'Name is required', 'topRight', 'Please enter your name');
            return;
        }

        const formattedLinks = [];
        let hasInvalidLinks = false;

        for (let i = 0; i < 4; i++) {
            const link = editForm.links[i] || '';
            const { isValid, formattedUrl } = validateAndFormatUrl(link);
            if (link.trim() !== '' && !isValid) {
                hasInvalidLinks = true;
            }
            if (link.trim() !== '') {
                formattedLinks.push(isValid ? formattedUrl : link);
            }
        }
        if (hasInvalidLinks) {
            openNotification('warning', 'Invalid links', 'topRight', 'Please ensure all links are valid URLs');
            return;
        }

        try {
            const formData = new FormData();
            formData.append("fullName", editForm.name);
            formData.append("location", editForm.location);
            formData.append("phone", editForm.phone);
            formData.append("birthDate", editForm.dob);

            if (editForm.avatarImage && editForm.avatarImage.startsWith('data:')) {
                const blob = dataURLtoBlob(editForm.avatarImage);
                formData.append("avatarFile", blob, "avatar.jpg");
            }

            const links = editForm.links.filter((link) => link.trim() !== "");
            links.forEach((link, index) => {
                formData.append(`links[${index}].url`, link);
            });

            const response = await api.put(
                `/freelancers/sidebar/${userData.userId}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            const updatedUser = response.data;

            setProfile({
                ...profile,
                fullName: updatedUser.fullName,
                avatarImage: updatedUser.avatar,
                location: updatedUser.location,
                phone: updatedUser.phone,
                dob: formatDateArray(updatedUser.birthDate),
                links: updatedUser.links.map((link) => link.url),
            });

            setUserData({
                ...userData,
                fullName: updatedUser.fullName,
                avatar: updatedUser.avatar,
                location: updatedUser.location,
                phone: updatedUser.phone,
                birthDate: updatedUser.birthDate,
                links: updatedUser.links,
            });

            openNotification("success", "Profile updated", "topRight", "Your profile has been updated successfully.");
            closeModal();
        } catch (error) {
            console.error("Error updating profile:", error);
            openNotification("error", "Update failed", "topRight", "There was an error updating your profile.");
        }
    };

    const dataURLtoBlob = (dataURL) => {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    return (
        <>
            <div className="p-4 text-center">
                <div className="mx-auto rounded-circle position-relative overflow-hidden" style={{ width: "128px", height: "128px" }}>
                    <AvatarWithFallback
                        src={profile.avatarImage ? getImageUrl(profile.avatarImage) : null}
                        alt={profile.name}
                        name={profile.name}
                        size={128}
                    />
                </div>
                <h5 className="mt-3 mb-0">{profile.name}</h5>
                <p className="text-muted small">{profile.email}</p>
                <div className="text-start mt-3 small">
                    <button
                        className="btn w-100 mt-2"
                        style={{ backgroundColor: "#428A9B", color: "white" }}
                        onClick={openModal}
                    >
                        <i className="bi bi-pencil me-1"></i> Edit Profile
                    </button>
                    <div className="mt-3">
                        {profile.dob && profile.dob.trim() !== "" && (
                            <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-calendar me-2" style={{ color: "#428A9B" }}></i>
                                <span>{profile.dob}</span>
                            </div>
                        )}

                        {profile.location && profile.location.trim() !== "" && (
                            <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-geo-alt me-2" style={{ color: "#428A9B" }}></i>
                                <span>{profile.location}</span>
                            </div>
                        )}

                        {profile.phone && profile.phone.trim() !== "" && (
                            <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-telephone me-2" style={{ color: "#428A9B" }}></i>
                                <span>{profile.phone}</span>
                            </div>
                        )}
                        {profile.links.filter(link => typeof link === 'string' && link.trim() !== '').map((link, index) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                                {getLinkIcon(link)}
                                <span>{link}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Profile</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 mb-4">
                                        <label className="form-label fw-bold">Avatar</label>
                                        <div className="d-flex flex-column align-items-center gap-3">
                                            <div
                                                className="rounded-circle position-relative overflow-hidden"
                                                style={{
                                                    width: "120px",
                                                    height: "120px",
                                                    ...(previewImage ? {
                                                        backgroundImage: `url(${previewImage})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    } : {
                                                        background: profile.avatar
                                                    }),
                                                    border: '3px solid #dee2e6'
                                                }}
                                            >
                                                <AvatarWithFallback
                                                    src={previewImage}
                                                    alt={editForm.name}
                                                    name={editForm.name}
                                                    size={120}
                                                />
                                            </div>
                                            <div className="d-flex gap-2">
                                                <label className="btn btn-outline-primary btn-sm">
                                                    <i className="bi bi-upload me-1"></i>
                                                    Choose Image
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleAvatarChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                </label>
                                            </div>
                                            <small className="text-muted text-center">
                                                Supported formats: JPG, PNG, GIF (Max 5MB)
                                            </small>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Name *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editForm.name || ''}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            value={editForm.phone || ''}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Date of Birth</label>
                                        <input
                                            type="date"
                                            className={`form-control${dobError ? ' is-invalid' : ''}`}
                                            value={editForm.dob || ''}
                                            onChange={(e) => handleInputChange('dob', e.target.value)}
                                        />
                                        {dobError && <div className="invalid-feedback">{dobError}</div>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editForm.location || ''}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label fw-bold">Links (Max 4)</label>
                                        {[0, 1, 2, 3].map((index) => (
                                            <div key={index} className="mb-2">
                                                <input
                                                    type="text"
                                                    className={`form-control ${linkErrors[index] ? 'is-invalid' : ''}`}
                                                    placeholder={`Link ${index + 1} (optional)`}
                                                    value={editForm.links ? editForm.links[index] || '' : ''}
                                                    onChange={(e) => handleLinkChange(index, e.target.value)}
                                                />
                                                {linkErrors[index] && (
                                                    <div className="invalid-feedback">
                                                        Please enter a valid URL
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <small className="text-muted">
                                            URLs will automatically get https:// prefix if not provided
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    style={{ backgroundColor: "#428A9B", color: "white" }}
                                    onClick={handleSave}
                                    disabled={isSaveDisabled}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showCropModal && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1051 }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Crop Image</h5>
                                <button type="button" className="btn-close" onClick={() => { setShowCropModal(false); setSelectedImage(null); }}></button>
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
                                <button type="button" className="btn btn-secondary" onClick={() => { setShowCropModal(false); setSelectedImage(null); }}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSetCroppedImage}>
                                    Set Cropped Image
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileSidebar;