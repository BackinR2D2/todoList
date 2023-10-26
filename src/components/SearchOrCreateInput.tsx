import { useState } from 'react';
import { Input, useToast } from '@chakra-ui/react';
import { ToDoProps } from '../types/ToDoProps';

function SearchOrCreateInput(props: ToDoProps) {

    const toast = useToast();
    const [todo, setTodo] = useState<string>("");

    const handleToDoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const toDoInputValue = e.target.value;
        setTodo(toDoInputValue);
        const matchingResults = props.todos.filter((element) => element.includes(toDoInputValue.trim()));
        props.setIsSearching(true);
        props.setSearchResults(matchingResults);
        if(toDoInputValue === '') {
            props.setIsSearching(false);
        }
    }

    const handleToDoFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const existingElement = props.todos.find((element) => element === todo);
        if(existingElement) {
            toast({
                title: 'Duplicate To-do',
                description: `"${todo}" already exists in the list`,
                status: 'error',
                duration: 1500,
                isClosable: true,
                position: 'top-right',
            });
            return;
        }
        props.setTodos((currentState) => [todo, ...currentState]);
        setTodo("");
        props.setIsSearching(false);
    };

    return (
        <form onSubmit={handleToDoFormSubmit}>
            <Input variant='flushed' required placeholder='Search or create a To-do' borderColor={'#2A2E3C'} value={todo} onChange={handleToDoInputChange} />
        </form>
    )
}

export default SearchOrCreateInput;