import React from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import TodosList from "./components/Todoslist";
import { TodoProvider } from "./Context/TodoContext";
import Login from "./components/Login";
import { Routes, Route, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const logout = async () => {
  await fetch("http://127.0.0.1:8000/api/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return <Navigate to="/" />;
};
 
function App() {
  return (
    <div className="container">
      <div className="app-wrapper">
        <Link
          to="/"
          class="py-2 px-4 text-sm font-medium leading-6 text-gray-500 rounded-md hover:bg-gray-100 focus:outline-none"
          onClick={logout}
        >
          Logout
        </Link>
        <div>
          <Header />
        </div>
        <div>
          <TodoProvider>
            <Form />
            <TodosList />
          </TodoProvider>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/home" element={<App />} />
    </Routes>
  );
}

export default Router;
