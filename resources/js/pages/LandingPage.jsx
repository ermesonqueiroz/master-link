import React from "react";
import { CaretRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <>
            <header className="flex px-8 py-4 justify-between items-center">
                <Link
                    to="/"
                    className="font-bold text-zinc-900 text-2xl tracking-tight"
                >
                    unilink
                </Link>

                <div className="flex gap-2 items-center">
                    <Link
                        to="/signin"
                        className="text-zinc-700 font-medium tracking-tight text-lg h-10 px-4 rounded-full hover:bg-neutral-200 transition-colors flex items-center"
                    >
                        Sign in
                    </Link>

                    <Link
                        to="/signup"
                        className="text-zinc-200 font-medium tracking-tight text-lg h-10 px-4 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex gap-2 items-center justify-center"
                    >
                        Get started <CaretRight size={14} />
                    </Link>
                </div>
            </header>
            <h1 className="font-bold text-zinc-900 text-2xl tracking-tight absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Coming soon...
            </h1>
        </>
    );
}
