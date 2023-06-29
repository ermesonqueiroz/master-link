import React, { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import {
    ArrowSquareOut,
    Check,
    Clipboard,
    Globe,
    ShareNetwork,
    X,
} from "@phosphor-icons/react";
import { useAuth } from "../contexts/Auth";

export function ShareButton() {
    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (copied) setCopied(false);
        }, 1800);

        return () => clearTimeout(timeout);
    }, [copied]);

    return (
        <Popover.Root
            open={isOpen}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
        >
            <Popover.Trigger asChild>
                <button
                    className={`text-zinc-800 font-medium tracking-tight text-lg h-10 px-4 rounded-full hover:bg-neutral-200 transition-colors flex gap-2 items-center justify-center ${
                        isOpen && "bg-neutral-200"
                    }`}
                >
                    <ShareNetwork size={18} /> share
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content align="end" sideOffset={10} className="will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade">
                    <div className="bg-white w-96 rounded-xl px-8 py-5 shadow-md">
                        <div className="flex items-center justify-center relative pb-4">
                            <h1 className="text-zinc-800 font-bold text-xl">
                                Share your unilink
                            </h1>

                            <Popover.Close className="absolute right-5">
                                <X
                                    size={16}
                                    className="text-zinc-600"
                                    weight="bold"
                                />
                            </Popover.Close>
                        </div>

                        <a
                            href={user?.username}
                            target="blank"
                            className="text-zinc-800 border border-zinc-400 flex items-center justify-between font-bold text-lg hover:bg-neutral-200 rounded-lg py-3 px-4 transition-colors mb-3"
                        >
                            <div className="flex items-center gap-2">
                                <span className="bg-neutral-800 p-2 text-zinc-200 rounded-lg">
                                    <Globe size={26} weight="regular" />
                                </span>
                                Open my unilink
                            </div>

                            <ArrowSquareOut />
                        </a>

                        <button
                            onClick={() => {
                                setCopied(true);
                                navigator.clipboard.writeText(
                                    `${window.location.origin}/${user?.username}`
                                );
                            }}
                            className="flex items-center transition-all justify-between text-lg bg-zinc-800 hover:bg-zinc-700 rounded-lg py-3 px-4 transition-colors w-full"
                        >
                            <p>
                                <b>unilink</b>/{user?.username}
                            </p>

                            {copied ? (
                                <Check className="text-green-400" />
                            ) : (
                                <Clipboard />
                            )}
                        </button>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
