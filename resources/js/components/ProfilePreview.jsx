import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { Avatar } from "./Avatar";
import { useLink } from "../contexts/Link";

export function ProfilePreview() {
    const { user } = useAuth();
    const { links } = useLink();

    return (
        <div className="p-1.5 w-[280px] -mt-20 h-[560px] bg-zinc-800 rounded-3xl">
            <div className="h-full bg-zinc-100 flex flex-col items-center py-6 px-4 w-full rounded-3xl">
                <div className="h-20 w-20">
                    <Avatar />
                </div>
                <p className="text-zinc-800 text-2xl font-bold tracking-tight leading-tight mt-2">
                    {user?.displayName}
                </p>
                <h1 className="text-zinc-800 text-lg tracking-tight leading-tight">
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
                                    className="bg-white text-zinc-800 font-medium text-center text-sm border-zinc-400 border w-full rounded-lg py-3 px-6"
                                >
                                    {link?.title}
                                </a>
                            ))}
                </div>

                <footer>
                    <Link
                        to="/"
                        className="font-bold text-zinc-900 text-lg tracking-tight"
                    >
                        unilink
                    </Link>
                </footer>
            </div>
        </div>
    );
}
