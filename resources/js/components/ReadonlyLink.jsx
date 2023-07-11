import React from "react";

export function ReadonlyLink({ link, appearance }) {
    return (
        <a
            key={link?.title}
            href={link?.url}
            target="blank"
            className="bg-white text-zinc-800 font-bold text-center text-lg border-zinc-400 border w-full rounded-xl py-4 px-6"
            style={{
                backgroundColor: appearance.button_color,
                color: appearance.button_text_color,
            }}
        >
            {link?.title}
        </a>
    );
}
