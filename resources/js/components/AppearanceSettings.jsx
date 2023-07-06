import React, { useState } from "react";
import { ChromePicker } from "react-color";

export function AppearanceSettings() {
    const [preferences, setPreferences] = useState([
        {
            id: "text-color",
            title: "Text color",
            validColor: "#27262a",
            color: "#27262a",
            displayColorPicker: false,
        },
        {
            id: "background-color",
            title: "Background color",
            validColor: "#f4f4f5",
            color: "#f4f4f5",
            displayColorPicker: false,
        },
        {
            id: "button-background-color",
            title: "Button color",
            validColor: "#fff",
            color: "#fff",
            displayColorPicker: false,
        },
        {
            id: "button-text-color",
            title: "Button text color",
            validColor: "#27262a",
            color: "#27262a",
            displayColorPicker: false,
        },
        {
            id: "button-text-color",
            title: "Button text color",
            validColor: "#27262a",
            color: "#27262a",
            displayColorPicker: false,
        },
    ]);

    const colorIsValid = (color) =>
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

    function toggleDisplayBackgroundColorPicker(id) {
        setPreferences([
            ...preferences.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        displayColorPicker: !item.displayColorPicker,
                    };
                }

                return item;
            }),
        ]);
    }

    function handleBackgroundColorChange(id, hex) {
        setPreferences([
            ...preferences.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        validColor: colorIsValid(hex) ? hex : item.validColor,
                        color: hex,
                    };
                }

                return item;
            }),
        ]);
    }

    return (
        <div className="flex flex-col w-full gap-2">
            <h1 className="text-3xl text-zinc-800 font-bold">Appearance</h1>

            <div className="flex flex-col p-6 rounded-xl bg-white border border-zinc-400 gap-2">
                {preferences.map(
                    ({ id, title, validColor, color, displayColorPicker }) => (
                        <div key={id}>
                            <label
                                htmlFor="background-color"
                                className="text-sm text-gray-800"
                            >
                                {title}
                            </label>

                            <div className="flex gap-2">
                                <div className="relative">
                                    <button
                                        type="button"
                                        aria-label="background color"
                                        className="rounded-xl h-12 w-12 border border-gray-400"
                                        style={{
                                            backgroundColor: validColor,
                                        }}
                                        onClick={() =>
                                            toggleDisplayBackgroundColorPicker(
                                                id
                                            )
                                        }
                                    />
                                    {displayColorPicker && (
                                        <div className="absolute top-1/2 left-1/2 z-10">
                                            <div
                                                className="fixed top-0 left-0 right-0 bottom-0"
                                                onClick={() =>
                                                    toggleDisplayBackgroundColorPicker(
                                                        id
                                                    )
                                                }
                                            />
                                            <ChromePicker
                                                color={color}
                                                onChange={({ hex }) =>
                                                    handleBackgroundColorChange(
                                                        id,
                                                        hex
                                                    )
                                                }
                                                disableAlpha
                                            />
                                        </div>
                                    )}
                                </div>

                                <input
                                    className={`h-12 px-4 bg-zinc-50 rounded-xl text-zinc-700 border border-gray-400 focus:outline-none ${
                                        color !== validColor &&
                                        "border border-red-400"
                                    }`}
                                    id="background-color"
                                    value={color}
                                    onChange={(e) =>
                                        handleBackgroundColorChange(
                                            id,
                                            e.target.value
                                        )
                                    }
                                    maxLength={7}
                                />
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
