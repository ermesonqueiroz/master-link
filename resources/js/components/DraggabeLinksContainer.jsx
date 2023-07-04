import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { EditableLink } from "./EditableLink";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { useLink } from "../contexts/Link";

export function DraggableLinksContainer() {
    const { links, updateLink } = useLink();

    function onOrderChange(result) {
        if (!result.destination) return;

        const items = Array.from(links);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        items.forEach((item, index) => updateLink.mutate({ ...item, index }));
    }

    return (
        <DragDropContext onDragEnd={onOrderChange}>
            <StrictModeDroppable droppableId="links">
                {(provided) => (
                    <ul
                        className="w-full flex flex-col gap-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {links
                            .sort(({ index: a }, { index: b }) => a - b)
                            .map((link, index) => (
                                <Draggable
                                    key={link.id}
                                    draggableId={link.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <li
                                            key={link.id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <EditableLink link={link} />
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                        {provided.placeholder}
                    </ul>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
}
