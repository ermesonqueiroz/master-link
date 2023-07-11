import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { isEqual } from "lodash";
import { useAppearance } from "../contexts";

export function AppearanceSettings() {
    const {
        appearance,
        localAppearance,
        updateLocalAppearance,
        updateAppearance,
    } = useAppearance();
    const [preferences, setPreferences] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setPreferences(
            Object.entries(localAppearance).map(([key, value]) => ({
                id: key,
                title: key.split("_").join(" "),
                validColor: value,
                color: value,
                displayColorPicker: false,
            }))
        );
    }, []);

    useEffect(() => {
        setHasChanges(!isEqual(appearance, localAppearance));

        updateLocalAppearance(
            Object.fromEntries(
                preferences.map((item) => [item.id, item.validColor])
            )
        );
    }, [preferences]);

    function handleSavePreferences() {
        updateAppearance(localAppearance);
    }

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
                                className="text-sm text-gray-800 capitalize"
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
                                                aria-hidden
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

                <button
                    type="button"
                    className={`h-10 w-full mt-1 font-medium rounded-full text-zinc-200 transition-colors bg-zinc ${
                        !hasChanges ? "bg-gray-500" : "bg-zinc-800"
                    }`}
                    style={{
                        cursor: !hasChanges ? "not-allowed" : "pointer",
                    }}
                    onClick={handleSavePreferences}
                    disabled={!hasChanges}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
