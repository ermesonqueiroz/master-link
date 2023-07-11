import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { Avatar } from "./Avatar";
import { useLink } from "../contexts/Link";
import { useAppearance } from "../contexts";

export function ProfilePreview() {
    const { user } = useAuth();
    const { links } = useLink();
    const { localAppearance } = useAppearance();

    return (
        <div className="p-1.5 w-[280px] h-[560px] bg-zinc-800 rounded-3xl">
            <div
                className="h-full flex flex-col items-center py-6 px-4 w-full rounded-3xl"
                style={{ backgroundColor: localAppearance.background_color }}
            >
                <div className="h-20 w-20">
                    <Avatar />
                </div>
                <p
                    className="text-2xl font-bold tracking-tight leading-tight mt-2"
                    style={{ color: localAppearance.text_color }}
                >
                    {user?.displayName}
                </p>
                <h1
                    className="text-lg tracking-tight leading-tight"
                    style={{ color: localAppearance.text_color }}
                >
                    @{user.username}
                </h1>

                <div className="max-w-lg mx-auto mt-6 min-h-[62%] w-full flex items-center flex-col px-4 gap-4">
                    {links?.length > 0 &&
                        links
                            ?.sort(({ index: a }, { index: b }) => a - b)
                            ?.filter(({ active }) => active)
                            ?.map((link) => (
                                <a
                                    key={link?.title}
                                    href={link?.url}
                                    target="blank"
                                    className="font-medium text-center text-sm w-full rounded-lg py-3 px-6"
                                    style={{
                                        backgroundColor:
                                            localAppearance.button_color,
                                        color: localAppearance.button_text_color,
                                    }}
                                >
                                    {link?.title}
                                </a>
                            ))}
                </div>

                <footer>
                    <Link
                        to="/"
                        className="font-bold text-lg tracking-tight"
                        style={{ color: localAppearance.text_color }}
                    >
                        unilink
                    </Link>
                </footer>
            </div>
        </div>
    );
}
