import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [updateTodoId, setUpdateTodoId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:4001/');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateOrUpdateTodo = async ({id}) => {
    try {
      if (updateTodoId) {
        await axios.put(`http://localhost:4001/${updateTodoId}`, newTodo);
      } else {
        await axios.post('http://localhost:4001/', newTodo);
      }
      fetchTodos();
      setNewTodo({ title: '', description: '' });
      setUpdateTodoId(null);
    } catch (error) {
      console.error('Error creating or updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:4001/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodoClick = (id) => {
    setUpdateTodoId(id);
  };

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title} - {todo.description}
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            <button onClick={() => handleUpdateTodoClick(todo._id)}>Update</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTodo.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTodo.description}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateOrUpdateTodo}>
          {updateTodoId ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
