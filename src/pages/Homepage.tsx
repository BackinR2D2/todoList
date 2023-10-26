import { Box, Container } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import SearchOrCreateInput from '../components/SearchOrCreateInput';
import ToDoList from '../components/ToDoList';

function Homepage() {

    const [todos, setTodos] = useState<string[]>(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')!) : []);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const toDoProps = {
        todos,
        setTodos,
        isSearching,
        setIsSearching,
        searchResults,
        setSearchResults,
    };

    useEffect(() => {
        if(localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify([]));
        } else {
            console.log(todos);
            if(todos.length > 0 && !isSearching) {
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