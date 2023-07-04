import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { ShareButton, AddLinkCollapsible } from "../components";
import { DraggableLinksContainer } from "../components/DraggabeLinksContainer";

export function ApplicationPage() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/signin" />;
    return (
        <>
            <header className="flex px-8 py-4 justify-between items-center">
                <Link
                    to="/"
                    className="font-bold text-zinc-900 text-2xl tracking-tight"
                >
                    unilink
                </Link>

                <ShareButton />
            </header>
            <div className="max-w-lg mx-auto my-14 w-full flex items-center flex-col px-4 gap-4">
                <AddLinkCollapsible />
                <DraggableLinksContainer />
            </div>
        </>
    );
}
