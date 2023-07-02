import React from "react";
import PropTypes from "prop-types";
import { DeleteLinkButton } from "./DeleteLinkButton";
import { EditLinkButton } from "./EditLinkButton";

export function EditableLink({ link, onUpdate, onDelete }) {
    return (
        <div
            key={link.id}
            className="bg-white border-zinc-400 border w-full rounded-xl py-4 px-6"
        >
            <div className="flex items-center justify-between">
                <h1 className="text-lg text-zinc-800 font-bold">
                    {link?.title}
                </h1>

                <div className="flex gap-2">
                    <EditLinkButton linkData={link} onUpdate={onUpdate} />
                    <DeleteLinkButton id={link.id} onDelete={onDelete} />
                </div>
            </div>

            <p className="text-zinc-800">{link?.url}</p>
        </div>
    );
}

EditableLink.propTypes = {
    link: {
        id: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
    },
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
};

EditableLink.defaultProps = {
    link: null,
    onUpdate: null,
    onDelete: null,
};
