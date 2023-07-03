import React from "react";
import * as Switch from "@radix-ui/react-switch";
import PropTypes from "prop-types";

export function ToggleLinkVisibility({ checked, onCheckedChange }) {
    return (
        <Switch.Root
            checked={checked}
            onCheckedChange={onCheckedChange}
            className="w-[42px] h-[25px] bg-gray-500 rounded-full relative data-[state=checked]:bg-green-700 outline-none"
            style={{ "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)" }}
        >
            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
    );
}

ToggleLinkVisibility.propTypes = {
    checked: PropTypes.bool,
    onCheckedChange: PropTypes.func,
};

ToggleLinkVisibility.defaultProps = {
    checked: true,
    onCheckedChange: null,
};
