import React from "react";
import { FallbackImage } from "./FallbackImage";

export function Avatar({ id, displayName, alt }) {
    return (
        <FallbackImage
            src={`/storage/avatars/${id}`}
            fallbackImage={`https://api.dicebear.com/6.x/initials/svg?seed=${displayName}&scale=50&radius=50&backgroundColor=111111&chars=2`}
            className="rounded-full aspect-square w-full object-cover object-center"
            alt={alt}
        />
    );
}
