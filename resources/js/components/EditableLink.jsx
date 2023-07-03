import React from "react";
import PropTypes from "prop-types";
import { DeleteLinkButton } from "./DeleteLinkButton";
import { EditLinkButton } from "./EditLinkButton";
import { ToggleLinkVisibility } from "./ToggleLinkVisibility";

export function EditableLink({
    link,
    onUpdate,
    onDelete,
    active,
    onActiveChange,
}) {
    return (
        <div
            key={link.id}
            className="bg-white border-zinc-400 border w-full rounded-xl py-4 px-6 relative"
        >
            <div className="flex items-center justify-between">
                <h1 className="text-lg text-zinc-800 font-bold">
                    {link?.title}
                </h1>
            </div>

            <p className="text-zinc-800">{link?.url}</p>

            <div className="flex flex-col absolute top-4 right-6 gap-2 items-end">
                <div className="flex gap-2">
                    <EditLinkButton linkData={link} onUpdate={onUpdate} />
                    <DeleteLinkButton id={link.id} onDelete={onDelete} />
                </div>

                <ToggleLinkVisibility
                    checked={active}
                    onCheckedChange={onActiveChange}
                />
            </div>
        </div>
    );
}

EditableLink.propTypes = {
    link: {
        id: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
    },
    active: PropTypes.bool,
    onActiveChange: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
};

EditableLink.defaultProps = {
    link: null,
    active: true,
    onActiveChange: null,
    onUpdate: null,
    onDelete: null,
};
