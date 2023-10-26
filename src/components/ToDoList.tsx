import { Box } from '@chakra-ui/react';
import { ToDoProps } from '../types/ToDoProps';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ToDoList(props: ToDoProps) {

    // draggable list: https://www.npmjs.com/package/react-drag-reorder
    // https://contactmentor.com/react-drag-drop-list/

    const handleDrop = (droppedItem: any) => {
        if (!droppedItem.destination) return;
        const updatedList = [...props.todos];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        props.setTodos(updatedList);
    };

    return (
        <Box as='div'>
            <div>
                <DragDropContext onDragEnd={handleDrop}>
                        <Droppable droppableId="list-container">
                        {(provided) => (
                            <div
                            className="list-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            >
                                {props.todos.map((item, index) => (
                                    <Draggable key={`${item}${index}`} draggableId={`${item}${index}`} index={index}>
                                    {(provided) => (
                                        <div
                                        className="item-container"
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        >
                                        {item}
                                        </div>
                                    )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
            </div>
        </Box>
    )
}

export default ToDoList;