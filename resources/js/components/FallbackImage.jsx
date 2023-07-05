import React from "react";

export function FallbackImage({ src, fallbackImage, alt, ...props }) {
    return (
        <img
            src={src}
            alt={alt}
            onError={(e) => {
                e.target.src = fallbackImage;
            }}
            {...props}
        />
    );
}
