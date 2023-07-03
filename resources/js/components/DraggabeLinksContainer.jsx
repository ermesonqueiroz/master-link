import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { EditableLink } from "./EditableLink";
import { StrictModeDroppable } from "./StrictModeDroppable";

export function DraggableLinksContainer({
    links,
    onDelete,
    onUpdate,
    onActiveChange,
    onOrderChange,
}) {
    return (
        <DragDropContext onDragEnd={onOrderChange}>
            <StrictModeDroppable droppableId="links">
                {(provided) => (
                    <ul
                        className="w-full flex flex-col gap-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {links.map((link, index) => (
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
                                        <EditableLink
                                            link={link}
                                            onDelete={() => onDelete(link)}
                                            onUpdate={(link) => onUpdate(link)}
                                            active={link?.active}
                                            onActiveChange={(active) =>
                                                onActiveChange(link, active)
                                            }
                                        />
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
