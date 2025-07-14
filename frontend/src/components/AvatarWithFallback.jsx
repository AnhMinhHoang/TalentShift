import React, { useState } from "react";

const AvatarWithFallback = ({ src, alt, name, size = 36, style = {}, className = "" }) => {
    const [imageError, setImageError] = useState(false);
    const firstLetter = name ? name.charAt(0).toUpperCase() : "U";
    const fallbackStyle = {
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(to bottom right, #428A9B, #266987)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: size / 2,
        textTransform: "uppercase",
        ...style,
    };

    if (!src || imageError) {
        return <div style={fallbackStyle} className={className}>{firstLetter}</div>;
    }

    return (
        <img
            src={src}
            alt={alt}
            style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", ...style }}
            className={className}
            onError={() => setImageError(true)}
        />
    );
};

export default AvatarWithFallback; 