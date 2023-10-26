import { Box, IconButton, useToast } from '@chakra-ui/react';
import { ToDoProps } from '../types/ToDoProps';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CopyIcon } from '@chakra-ui/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function ToDoList(props: ToDoProps) {

    const toast = useToast();

    const handleDrop = (droppedItem: any) => {
        if (!droppedItem.destination) return;
        const updatedList = [...props.todos];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        props.setTodos(updatedList);
    };

    const handleCopyToClipboardCopy = (item: string) => {
        toast({
            title: 'Copied to Clipboard',
            description: `"${item}" has been copied successfully`,
            status: 'success',
            duration: 1500,
            isClosable: true,
            position: 'top-right',
        });
    };

    return (
        <Box as='div'>
            <div>
                {
                    props.isSearching ?
                        <div className='list-container'>
                            {
                                props.searchResults.length === 0 ?
                                    <div className='noElementsFoundText'>No elements found</div>
                                    :
                                    props.searchResults.map((item, index) => (
                                        <div className='item-container' key={index}>
                                            {item}
                                            <CopyToClipboard text={item} onCopy={() => handleCopyToClipboardCopy(item)}>
                                                <IconButton aria-label='Copy To Clipboard' icon={<CopyIcon />} />
                                            </CopyToClipboard>
                                        </div>
                                    ))
                            }
                        </div>
                        :
                        <DragDropContext onDragEnd={handleDrop}>
                            <Droppable droppableId="list-container">
                            {(provided) => (
                                    <>
                                        <div
                                            className="list-container"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {props.todos.map((item, index) => (
                                                <Draggable key={`${item}${index}`} draggableId={`${item}${index}`} index={index}>
                                                {(provided) => (
                                                    <>
                                                        <div
                                                            className="item-container"
                                                            ref={provided.innerRef}
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}
                                                            >
                                                            {item}
                                                            <CopyToClipboard text={item} onCopy={() => handleCopyToClipboardCopy(item)}>
                                                                <IconButton aria-label='Copy To Clipboard' icon={<CopyIcon />} />
                                                            </CopyToClipboard>
                                                        </div>
                                                    </>
                                                )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </>
                                )}
                            </Droppable>
                        </DragDropContext>
                }
            </div>
        </Box>
    )
}

export default ToDoList;