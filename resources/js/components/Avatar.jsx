import React from "react";
import { FallbackImage } from "./FallbackImage";
import { useAuth } from "../contexts/Auth";

export function Avatar() {
    const { user, avatar } = useAuth();

    return (
        <FallbackImage
            src={avatar}
            key={avatar}
            fallbackImage={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.displayName}&scale=50&radius=50&backgroundColor=111111&chars=2`}
            className="rounded-full aspect-square border-gray-200 border w-full object-cover object-center"
            alt={user?.displayName}
        />
    );
}
