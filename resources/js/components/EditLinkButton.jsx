import { PencilSimple, X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/Auth";
import { api } from "../services/api";

export function EditLinkButton({ linkData, onUpdate }) {
    const [open, setOpen] = useState(false);
    const { accessToken } = useAuth();

    const [title, setTitle] = useState(linkData.title);
    const [url, setURL] = useState(linkData.url);

    const updateLinkMutation = useMutation({
        mutationFn: async () => {
            const data = {
                title,
                url,
            };

            await api.put(`/link/${linkData.id}`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        },
    });

    function handleUpdateLink() {
        updateLinkMutation.mutate();
        setOpen(false);
        onUpdate({
            id: linkData.id,
            title,
            url,
        });
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button type="button">
                    <PencilSimple className="text-zinc-800" size={20} />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-neutral-900/40 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-zinc-800 font-medium text-lg">
                        Edit link
                    </Dialog.Title>
                    <Dialog.Description className="text-zinc-600">
                        Make changes to your link here. Click save when
                        you&apos;re done.
                    </Dialog.Description>
                    <Dialog.Close className="absolute top-4 right-4">
                        <X size={16} className="text-zinc-600" weight="bold" />
                    </Dialog.Close>
                    <div className="py-5 gap-2 flex flex-col">
                        <fieldset className="flex items-center gap-5">
                            <label
                                htmlFor="title"
                                className="text-zinc-600 font-medium w-[60px] text-right"
                            >
                                Title
                            </label>
                            <input
                                className="text-zinc border text-zinc-800 border-zinc-400 h-10 w-full flex-1 items-center justify-center rounded-md px-3 leading-none outline-none"
                                id="title"
                                defaultValue={linkData?.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="flex items-center gap-5">
                            <label
                                className="text-zinc-600 font-medium w-[60px] text-right"
                                htmlFor="url"
                            >
                                URL
                            </label>
                            <input
                                className="text-zinc border text-zinc-800 border-zinc-400 h-10 w-full flex-1 items-center justify-center rounded-md px-3 leading-none outline-none"
                                id="url"
                                defaultValue={linkData?.url}
                                onChange={(e) => setURL(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <div className="mt-3 flex gap-6 justify-end">
                        <Dialog.Close asChild>
                            <button
                                type="button"
                                className="text-zinc-600 hover:text-zinc-800 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </Dialog.Close>

                        <button
                            type="submit"
                            onClick={handleUpdateLink}
                            className="text-green-600 bg-green-100 hover:bg-green-200 h-10 px-3 hover:text-green-800 rounded-md transition-colors font-medium"
                        >
                            Save Changes
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

EditLinkButton.propTypes = {
    linkData: {
        id: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
    },
    onUpdate: PropTypes.func,
};

EditLinkButton.defaultProps = {
    linkData: {},
    onUpdate: () => {},
};
