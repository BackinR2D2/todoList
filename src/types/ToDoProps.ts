export type ToDoProps = {
    todos: string[];
    setTodos: React.Dispatch<React.SetStateAction<string[]>>;
    isSearching: boolean;
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
    searchResults: string[];
    setSearchResults: React.Dispatch<React.SetStateAction<string[]>>;
};