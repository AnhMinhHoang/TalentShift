import React from "react";
import { notification } from "antd"

/**
 * A utility hook for displaying notifications
 * @returns {Object} Notification methods
 */
const useNotify = () => {
    /**
     * Show a success notification
     * @param {string} message - The notification title
     * @param {string} description - The notification description
     */
    const success = (message, description) => {
        notification.success({
            message,
            description,
            placement: "topRight",
            duration: 5,
        })
    }

    /**
     * Show an error notification
     * @param {string} message - The notification title
     * @param {string} description - The notification description
     */
    const error = (message, description) => {
        notification.error({
            message,
            description,
            placement: "topRight",
            duration: 5,
        })
    }

    /**
     * Show a warning notification
     * @param {string} message - The notification title
     * @param {string} description - The notification description
     */
    const warning = (message, description) => {
        notification.warning({
            message,
            description,
            placement: "topRight",
            duration: 5,
        })
    }

    /**
     * Show an info notification
     * @param {string} message - The notification title
     * @param {string} description - The notification description
     */
    const info = (message, description) => {
        notification.info({
            message,
            description,
            placement: "topRight",
            duration: 5,
        })
    }

    return {
        success,
        error,
        warning,
        info,
    }
}

export default useNotify
