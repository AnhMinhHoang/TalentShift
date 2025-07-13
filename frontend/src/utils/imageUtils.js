/**
 * Utility function to get the full image URL with backend prefix
 * @param {string} imagePath - The relative image path from backend
 * @returns {string|null} - The full image URL or null if no path provided
 */
export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // If it's already a full URL (starts with http/https), return as is
    if (imagePath.startsWith('http')) {
        return imagePath;
    }

    // If it's a data URL (for preview images), return as is
    if (imagePath.startsWith('data:')) {
        return imagePath;
    }

    // If it's a relative path, prepend backend URL
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    return `${backendUrl}${imagePath}`;
};

/**
 * Utility function to check if an image path is a custom uploaded image
 * @param {string} imagePath - The image path to check
 * @returns {boolean} - True if it's a custom uploaded image
 */
export const isCustomImage = (imagePath) => {
    if (!imagePath) return false;

    // Check if it's not a default placeholder image
    const defaultImages = [
        '/asset/images/default-profile.jpg',
        '/asset/images/default-company-logo.png',
        '/placeholder.svg'
    ];

    return !defaultImages.some(defaultImg => imagePath.includes(defaultImg));
}; 