import React, { useContext, useState  } from "react";
import { TodoContext } from "../Context/TodoContext";

const TodosList = () => {
  const { todos , input, setInput, updateTodo, deleteTodo, toggleComplete } = useContext(TodoContext);
  const [editTodoId, setEditTodoId] = useState(null);

  const handleEdit = (todoId, todoTitle) => {
    setEditTodoId(todoId);
    // Set the todo title to the input field
    // You can modify this code as per your input field structure
    setInput({ ...input, title: todoTitle });
  };

  const handleSave = () => {
    // Find the todo with the edited todoId
    const editedTodo = todos.find((todo) => todo.id === editTodoId);
    if (editedTodo) {
      // Call the updateTodo function to update the API
       updateTodo(editTodoId, input.title);
    }
    setEditTodoId(null);
    setInput({ ...input, title: "" });
  };

  const handleDelete = async (todoId) => {
    await deleteTodo(todoId);
  };

  const handleToggleComplete = (todoId, completed) => {
     toggleComplete(todoId, completed);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li className="list-item" key={todo.id}>
          {editTodoId === todo.id ? (
            <div>
              <input
                type="text"
                value={input.title}
                className={`list ${todo.completed ? "complete" : ""}`}
                onChange={(event) => event.preventDefault()}
              />
              <div>
                <button
                  className="button-save task-button"
                  onClick={handleSave}
                >
                  <i className="fa fa-save"></i>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={todo.title}
                className={`list ${todo.completed ? "complete" : ""}`}
                onChange={(event) => event.preventDefault()}
              />
              <div>
                <button
                  className="button-complete task-button"
                  onClick={() => handleToggleComplete(todo.id, !todo.completed)}
                >
                  <i className="fa fa-check-circle"></i>
                </button>
                <button
                  className="button-edit task-button"
                  onClick={() => handleEdit(todo.id, todo.title)}
                >
                  <i className="fa fa-edit"></i>
                </button>
                <button
                  className="button-delete task-button"
                  onClick={() => handleDelete(todo.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodosList;
