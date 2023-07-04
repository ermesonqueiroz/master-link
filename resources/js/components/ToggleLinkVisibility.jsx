import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { useLink } from "../contexts/Link";

export function ToggleLinkVisibility({ link }) {
    const { updateLink } = useLink();

    function onCheckedChange(active) {
        updateLink({
            ...link,
            active,
        });
    }

    return (
        <Switch.Root
            checked={link?.active}
            onCheckedChange={onCheckedChange}
            className="w-[42px] h-[25px] bg-gray-500 rounded-full relative data-[state=checked]:bg-green-700 outline-none"
            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
        >
            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
    );
}
