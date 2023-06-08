import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context
export const TodoContext = createContext();

// Create a provider component
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({
    title: '',
    completed: false,
  });

  useEffect(() => {
    const getTodos = async () => {
      const apiTodo = await axios.get('http://127.0.0.1:8000/api/todos/todo', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const todosData = apiTodo.data.data.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      }));
      setTodos(todosData);
    };
    getTodos();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/todos/todo',
        newTodo, {method: 'GET',
        credentials: 'include',}
      );

      const todosData = await fetchTodos();
      setTodos(todosData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTodos = async () => {
    const apiTodo = await axios.get('http://127.0.0.1:8000/api/todos/todo',
    {method: 'GET',
    credentials: 'include',});
    const todosData = apiTodo.data.data.map((todo) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }));
    return todosData;
  };

  const updateTodo = async (todoId, newTitle) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/todos/todo/${todoId}`, {
        title: newTitle
      },{method: 'GET',
      credentials: 'include',});

      const todosData = await fetchTodos();
      setTodos(todosData);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (todoId, newCompleted) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/todos/todo/${todoId}`, {
        completed: newCompleted,
      },{method: 'GET',
      credentials: 'include',
      'Access-Control-Allow-Credentials': 'true',});
      // setTodos((prevTodos) =>
      //   prevTodos.map((todo) =>
      //     todo.id === todoId ? { ...todo, completed: newCompleted } : todo
      //   )
      // );
      const todosData = await fetchTodos();
      setTodos(todosData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/todo/${todoId}`,{method: 'GET',
      credentials: 'include',});
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TodoContext.Provider value={{ todos, input, setInput, addTodo, updateTodo, toggleComplete, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
