import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Trash, X } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import { useAuth } from "../contexts/Auth";

export function DeleteLinkButton({ id, onDelete = () => {} }) {
    const [open, setOpen] = useState(false);
    const { accessToken } = useAuth();

    const deleteLinkMutation = useMutation({
        mutationFn: async () => {
            await api.delete(`/link/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        },
    });

    function handleDeleteLink() {
        deleteLinkMutation.mutate();
        setOpen(false);
        onDelete();
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button>
                    <Trash className="text-zinc-800" size={20} />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-neutral-900/40 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-zinc-800 font-medium text-lg">
                        Delete link?
                    </Dialog.Title>
                    <Dialog.Description className="text-zinc-600">
                        This will delete this link permanently. You cannot undo
                        this action.
                    </Dialog.Description>
                    <Dialog.Close className="absolute top-4 right-4">
                        <X size={16} className="text-zinc-600" weight="bold" />
                    </Dialog.Close>
                    <div className="mt-3 flex gap-6 justify-end">
                        <Dialog.Close asChild>
                            <button className="text-zinc-600 hover:text-zinc-800 transition-colors font-medium">
                                Cancel
                            </button>
                        </Dialog.Close>

                        <button
                            onClick={handleDeleteLink}
                            className="text-red-400 hover:bg-red-100 h-10 px-3 hover:text-red-600 rounded-md transition-colors font-medium"
                        >
                            Delete
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
