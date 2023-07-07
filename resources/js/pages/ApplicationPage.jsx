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
import { ProfilePreview } from "../components/ProfilePreview";

function Links() {
    return (
        <div className="max-w-lg w-full flex items-center flex-col px-4 gap-4">
            <AddLinkCollapsible />
            <DraggableLinksContainer />
        </div>
    );
}

function Appearance() {
    return (
        <div className="max-w-lg w-full flex items-center flex-col px-4 gap-4">
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
            <div className="flex gap-20 relative my-14">
                <div className="flex w-[60%] justify-end">
                    <Routes>
                        <Route path="/" element={<Links />} />
                        <Route path="/appearance" element={<Appearance />} />
                        <Route path="*" element={<Navigate to="/app" />} />
                    </Routes>
                </div>

                <div className="w-[40%] flex flex-col fixed right-0 justify-center items-center">
                    <ProfilePreview />
                </div>
            </div>
        </>
    );
}
