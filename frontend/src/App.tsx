import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

interface Todo {
  id: number;
  text: string;
  completed: boolean | null;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const result = await backend.getTodos();
      setTodos(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  const onSubmit = async (data: { text: string }) => {
    try {
      setLoading(true);
      const result = await backend.addTodo(data.text);
      if ('ok' in result) {
        await fetchTodos();
        reset();
      } else {
        console.error('Error adding todo:', result.err);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      setLoading(true);
      const result = await backend.deleteTodo(id);
      if ('ok' in result) {
        await fetchTodos();
      } else {
        console.error('Error deleting todo:', result.err);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      setLoading(true);
      const result = await backend.toggleTodo(id);
      if ('ok' in result) {
        await fetchTodos();
      } else {
        console.error('Error toggling todo:', result.err);
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="text"
          control={control}
          defaultValue=""
          rules={{ required: 'Todo text is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="New Todo"
              variant="outlined"
              fullWidth
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
          Add Todo
        </Button>
      </form>
      {loading ? (
        <CircularProgress style={{ marginTop: '2rem' }} />
      ) : (
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} dense button onClick={() => toggleTodo(todo.id)}>
              <Checkbox
                edge="start"
                checked={todo.completed === true}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={todo.text} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default App;
