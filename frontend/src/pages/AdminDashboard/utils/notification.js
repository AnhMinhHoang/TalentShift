import { notification } from "antd"

export const openNotification = (type, message, placement = "topRight", description) => {
    notification[type]({
        message,
        description,
        placement,
        duration: 3,
        showProgress: true,
        pauseOnHover: true,
    })
}

// Predefined notification types for common use cases
export const showSuccess = (message, description) => {
    openNotification("success", message, "topRight", description)
}

export const showError = (message, description) => {
    openNotification("error", message, "topRight", description)
}

export const showWarning = (message, description) => {
    openNotification("warning", message, "topRight", description)
}

export const showInfo = (message, description) => {
    openNotification("info", message, "topRight", description)
}
