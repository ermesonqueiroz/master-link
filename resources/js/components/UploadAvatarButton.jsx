import React, { useRef } from "react";
import { api } from "../services/api";
import { useAuth } from "../contexts/Auth";

export function UploadAvatarDialog() {
    const { user, setAvatar } = useAuth();

    const fileInput = useRef();

    function handleFileUpload() {
        const file = fileInput.current.files[0];

        const formData = new FormData();
        formData.append("avatar", file);

        api.post("/user/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        setAvatar(`/storage/avatars/${user?.id}?time=${Date.now()}`);
    }

    return (
        <>
            <input
                type="file"
                ref={fileInput}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*"
            />
            <button
                type="button"
                className="h-10 font-medium rounded-full text-zinc-200 bg-zinc-800"
                onClick={() => fileInput.current.click()}
            >
                Update Avatar
            </button>
        </>
    );
}
