import React from "react";
import { useAuth } from "../contexts/Auth";
import { api } from "../services/api";

export function DeleteAvatarButton() {
    const { refreshAvatar } = useAuth();

    function handleAvatarDelete() {
        api.delete("/user/avatar");

        refreshAvatar();
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
