import { useState } from 'react';
import { Input } from '@chakra-ui/react';
import { ToDoProps } from '../types/ToDoProps';

function SearchOrCreateInput(props: ToDoProps) {

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
        props.setTodos((currentState) => [todo, ...currentState]);
        setTodo("");
        props.setIsSearching(false);
    };

    return (
        <form onSubmit={handleToDoFormSubmit}>
            <Input variant='flushed' placeholder='Search or create a To-do' borderColor={'#2A2E3C'} value={todo} onChange={handleToDoInputChange} />
        </form>
    )
}

export default SearchOrCreateInput;