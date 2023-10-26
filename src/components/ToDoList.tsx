import { Box } from '@chakra-ui/react';
import { ToDoProps } from '../types/ToDoProps';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ToDoList(props: ToDoProps) {

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
                {
                    props.isSearching ?
                        <div className='list-container'>
                            {
                                props.searchResults.map((item, index) => (
                                    <div className='item-container' key={index}>
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                        :
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
                }
            </div>
        </Box>
    )
}

export default ToDoList;