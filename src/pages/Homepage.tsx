import { Box, Container } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import SearchOrCreateInput from '../components/SearchOrCreateInput';
import ToDoList from '../components/ToDoList';

function Homepage() {

    const [todos, setTodos] = useState<string[]>(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')!) : []);

    const toDoProps = {
        todos,
        setTodos
    };

    useEffect(() => {
        if(localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify([]));
        } else {
            console.log(todos);
            if(todos.length > 0) {
                localStorage.setItem('todos', JSON.stringify(todos));
            }
        }
    }, [todos]);

    return (
        <Box>
          <Container className='main'>
            <SearchOrCreateInput {...toDoProps} />
            <ToDoList {...toDoProps} />
          </Container>
        </Box>
    );
}

export default Homepage;