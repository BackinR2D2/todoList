import { useState } from 'react';
import { Input } from '@chakra-ui/react';
import { ToDoProps } from '../types/ToDoProps';

function SearchOrCreateInput(props: ToDoProps) {

    const [todo, setTodo] = useState<string>("");

    const handleToDoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    }

    const handleToDoFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.setTodos((currentState) => [todo, ...currentState]);
        setTodo("");
    };

    return (
        <form onSubmit={handleToDoFormSubmit}>
            <Input variant='flushed' placeholder='Search or create a To-do' borderColor={'#2A2E3C'} value={todo} onChange={handleToDoInputChange} />
        </form>
    )
}

export default SearchOrCreateInput;