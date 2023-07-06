import React from "react";
import { Link } from "react-router-dom";
import { ShareButton } from "./ShareButton";

const sections = {
    links: "/app",
    appearance: "/app/appearance",
};

export function ApplicationHeader() {
    return (
        <header className="flex px-8 h-20 justify-between items-center">
            <Link
                to="/"
                className="font-bold text-zinc-900 text-2xl tracking-tight"
            >
                unilink
            </Link>

            <ul className="flex text-xl font-medium text-zinc-700 gap-4">
                {Object.entries(sections).map(([title, to]) => (
                    <Link
                        to={to}
                        key={title}
                        className="text-zinc-800 font-medium tracking-tight text-lg h-10 px-4 rounded-full hover:bg-neutral-200 flex items-center transition-colors"
                    >
                        {title}
                    </Link>
                ))}
            </ul>

            <ShareButton />
        </header>
    );
}
