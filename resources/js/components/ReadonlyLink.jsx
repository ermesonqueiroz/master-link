import React from "react";

export function ReadonlyLink({ link }) {
    return (
        <a
            key={link?.title}
            href={link?.url}
            target="blank"
            className="bg-white text-zinc-800 font-bold text-center text-lg border-zinc-400 border w-full rounded-xl py-4 px-6"
        >
            {link?.title}
        </a>
    );
}
