import React, { useEffect, useState } from "react";
import { FallbackImage } from "./FallbackImage";
import { useAuth } from "../contexts/Auth";

export function Avatar() {
    const { user, avatar } = useAuth();
    const [src, setSrc] = useState(
        `/storage/avatars/${user?.id}?time=${Date.now()}`
    );

    useEffect(() => {
        // TODO: improve img re-render
        setSrc(avatar || src);
    }, [avatar]);

    return (
        <FallbackImage
            src={src}
            key={src}
            fallbackImage={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.displayName}&scale=50&radius=50&backgroundColor=111111&chars=2`}
            className="rounded-full aspect-square border-gray-200 border w-full object-cover object-center"
            alt={user?.displayName}
        />
    );
}
