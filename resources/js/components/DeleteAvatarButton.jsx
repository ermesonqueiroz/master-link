import React from "react";
import { useAuth } from "../contexts/Auth";
import { api } from "../services/api";

export function DeleteAvatarButton() {
    const { user, setAvatar } = useAuth();

    function handleAvatarDelete() {
        api.delete("/user/avatar");
        setAvatar(
            `https://api.dicebear.com/6.x/initials/svg?seed=${user?.displayName}&scale=50&radius=50&backgroundColor=111111&chars=2`
        );
    }

    return (
        <button
            type="button"
            className="h-10 font-medium rounded-full text-zinc-800 border border-gray-400"
            onClick={handleAvatarDelete}
        >
            Remove Avatar
        </button>
    );
}
