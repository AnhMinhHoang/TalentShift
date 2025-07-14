// Utility functions for date validation

/**
 * Checks if a date is at least a certain number of years ago from today
 * @param {string|Date} date - The date to check
 * @param {number} minAge - The minimum age in years
 * @returns {boolean}
 */
export function isAtLeastAge(date, minAge = 18) {
    if (!date) return false;
    const dob = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        return age - 1 >= minAge;
    }
    return age >= minAge;
}

/**
 * Checks if a date is in the future
 * @param {string|Date} date
 * @returns {boolean}
 */
export function isFutureDate(date) {
    if (!date) return false;
    const d = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d > today;
}

/**
 * Checks if start date is before or equal to end date
 * @param {string|Date} start
 * @param {string|Date} end
 * @returns {boolean}
 */
export function isValidDateRange(start, end) {
    if (!start || !end) return true;
    return new Date(start) <= new Date(end);
}

/**
 * Returns a date string in yyyy-mm-dd format
 * @param {Date} date
 * @returns {string}
 */
export function toDateInputValue(date) {
    if (!date) return '';
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
} 