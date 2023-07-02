import React, { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Plus, X } from "@phosphor-icons/react";
import PropTypes from "prop-types";

export function AddLinkCollapsible({ onSubmit }) {
    const [open, setOpen] = useState(false);

    const [url, setURL] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit(url);

        setURL("");
        setOpen(false);
    }

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen} className="w-full">
            {!open && (
                <Collapsible.Trigger asChild>
                    <button
                        type="button"
                        className="bg-zinc-900 h-10 w-full flex items-center justify-center gap-1 leading-none font-medium rounded-full"
                    >
                        <Plus
                            className="text-zinc-400"
                            size={16}
                            weight="bold"
                        />{" "}
                        Add link
                    </button>
                </Collapsible.Trigger>
            )}

            <Collapsible.Content>
                <form
                    className="bg-white border-zinc-400 border w-full rounded-xl py-6 px-6"
                    onSubmit={handleSubmit}
                >
                    <div className="flex items-center justify-between pb-4">
                        <h1 className="text-zinc-800 text-lg font-bold">
                            Enter URL
                        </h1>

                        <Collapsible.Trigger>
                            <X
                                size={16}
                                className="text-zinc-600"
                                weight="bold"
                            />
                        </Collapsible.Trigger>
                    </div>

                    <div className="flex gap-3">
                        <input
                            className="px-4 w-full rounded-lg h-10 bg-zinc-100 text-zinc-800 placeholder:text-zinc-500"
                            type="url"
                            placeholder="URL"
                            onChange={(e) => setURL(e.target.value)}
                        />

                        <button
                            type="button"
                            className="text-zinc-200 font-medium tracking-tight h-10 px-5 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </Collapsible.Content>
        </Collapsible.Root>
    );
}

AddLinkCollapsible.propTypes = {
    onSubmit: PropTypes.func,
};

AddLinkCollapsible.defaultProps = {
    onSubmit: () => {},
};
