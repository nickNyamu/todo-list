import React, { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import axios from "axios";
import Cookies from "js-cookie";

const Form = () => {
  const { input, setInput, addTodo, setTodos, getTodos } =
    useContext(TodoContext);

  const onChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const jwtToken = Cookies.get("jwt_token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    addTodo({
      title: input.title,
      completed: input.completed,
    });

    //Here i am calling the getTodos function to get the updated list of todos
    const getTodos = async () => {
      const apiTodo = await axios.get("http://127.0.0.1:8000/api/todos/todo", {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the request headers
        },
      });

      const todosData = apiTodo.data.data.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      }));
      setTodos(todosData);
    };
    // Clear the input field
    setInput({
      title: "",
      completed: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Enter task"
        className="task-input"
        value={input.title}
        required
        onChange={onChange}
      />
      <button className="button-add" type="submit">
        {/* {editTodo ? "Edit" : "Add"} */} Add
      </button>
    </form>
  );
};

export default Form;
