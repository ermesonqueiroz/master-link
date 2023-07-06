import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import {
    AddLinkCollapsible,
    ApplicationHeader,
    AppearanceSettings,
    ProfileSettings,
} from "../components";
import { DraggableLinksContainer } from "../components/DraggabeLinksContainer";

function Links() {
    return (
        <div className="max-w-lg mx-auto my-14 w-full flex items-center flex-col px-4 gap-4">
            <AddLinkCollapsible />
            <DraggableLinksContainer />
        </div>
    );
}

function Appearance() {
    return (
        <div className="max-w-lg mx-auto my-14 w-full flex items-center flex-col px-4 gap-4">
            <ProfileSettings />
            <AppearanceSettings />
        </div>
    );
}

export function ApplicationPage() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/signin" />;
    return (
        <>
            <ApplicationHeader />
            <Routes>
                <Route path="/" element={<Links />} />
                <Route path="/appearance" element={<Appearance />} />
                <Route path="*" element={<Navigate to="/app" />} />
            </Routes>
        </>
    );
}
